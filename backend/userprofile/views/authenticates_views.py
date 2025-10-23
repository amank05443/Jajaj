import json
from django.db.models import F , Q
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

from ..models import (Users, Trades, Quals, UserQuals,ChangeOfServiceabilityLogs, ChangeOfServiceabilityLogLines)

#-------- For checking passkey w.r.t. selected  user >> Applicable for all users and ATO's Authentication  -------------#
@csrf_exempt
@require_POST
# def check_passkey_authentication(request):
#     data = json.loads(request.body)
#     ids= data.get('byWhom')
#     pin= data.get('passkey')
#     try:
#         user= get_object_or_404(Users, userQualsTrade__id=ids)
#         if check_password(pin, user.pin):
#             return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})
#         else:
#             return JsonResponse({"status": "ERROR", "message": "Incorrect password"})
#     except ObjectDoesNotExist:
#         return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

def check_passkey_authentication(request):
    data = json.loads(request.body)
    ids= data.get('byWhom')
    pin= data.get('passkey')
    actionFor= data.get('actionFor')
    try:
        user= Users.objects.get(userQualsTrade__id=ids, pin=pin)
        if user and actionFor == 'forwardToAto':
            snow_id= data.get('snowId')
            cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
            cosl_instance.supervisor = UserQuals.objects.get(id=ids)
            cosl_instance.status = "2"
            cosl_instance.save()
            return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})
        else:
            return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)



# -------- For checking passkey w.r.t. selected  user >> Then inserting data of that user in COSL_line table  ----------#
def check_passkey_authentication_right_side(request):
    data = json.loads(request.body)
    snow_id= data.get('snowId')
    trade_id = data.get('trade')
    ids= data.get('byWhom')
    pin= data.get('passkey')
    qualification= data.get('qualification')
    cleared= data.get('cleared')

    #-------- checking passkey of selected  user  if passkey is valid then ---------------------------------------------#
    #-------- if entry is inserted by supervisor Then cleared will be 'I' (initiated but not authenticated)-------------#
    #-------- if cleared === 'I' >> Only cleared_yn will updated to 'Y' ------------------------------------------------#
    #-------- if cleared === 'N' and qualification in ['TDS', 'SUP'] >> Then new insert in COSL-line_table -------------#
    #-------- if cleared === 'N' and qualification is 'ATO' >> Then entry of that snow will be updated in COSL_table ---#
    try:
        if pin:
            user = Users.objects.get(userQualsTrade__id=ids, pin=pin)
            if user and cleared == "I":
                cosl_lines_id = data.get('coslLinesId')
                cosl_lines_instance= ChangeOfServiceabilityLogLines.objects.get(id=cosl_lines_id)
                cosl_lines_instance.cleared_yn="Y"
                cosl_lines_instance.save()
                return JsonResponse({"status": "OK","action": "AUTHENTICATED" , "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})

            elif user and cleared=="N":
                # -------- qualification in ['TDS', 'SUP'] >> Then new insert in COSL-line_table w.r.to that snow (cosl_id) ----#
                # -------- after successful entry the cosl_line_id will be returned and saved in formData for further action ---#
                if qualification == 'TDS' or qualification == 'SUP':
                    snow = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
                    user_qual = UserQuals.objects.get(id=ids)
                    trade = Trades.objects.get(id=trade_id)
                    new_entry=ChangeOfServiceabilityLogLines(
                        change_of_serviceability_log=snow,
                        trade=trade,
                        user_qual=user_qual,
                        tradesman_sup=qualification,
                        date_cleared=timezone.now(),
                        cleared_yn="Y"
                    )
                    new_entry.save()
                    new_entry= ChangeOfServiceabilityLogLines.objects.last()
                    new_id=new_entry.id
                    return JsonResponse({"status": "OK","action": "AUTHENTICATED" , "cosl_line_id": new_id, "user": {"name": user.user_name, "rank": user.rank.abbreviation}})
                # -------- if qualification is 'ATO' >> Then entry of that snow will be updated in COSL_table --------------#
                # -------- authorised_by_id, status, and date will be captured in cosl table w.r.to that snow id -----------#
                elif qualification in ['ATO']:
                    cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
                    cosl_instance.authorised_by=UserQuals.objects.get(id=ids)
                    cosl_instance.status="3"
                    cosl_instance.save()
                    return JsonResponse({"status": "OK", "action": "AUTHENTICATED" , "user": { "name": user.user_name, "rank": user.rank.abbreviation}})
            return JsonResponse({"status": "OK"})
        else:
            user_initiated = Users.objects.get(userQualsTrade__id=ids)
            if user_initiated:
                # -------- qualification in ['TDS', 'SUP'] >> Then new insert in COSL-line_table w.r.to that snow (cosl_id) ----#
                # -------- after successful entry the cosl_line_id will be returned and saved in formData for further action ---#
                snow = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
                user_qual = UserQuals.objects.get(id=ids)
                trade = Trades.objects.get(id=trade_id)
                new_entry=ChangeOfServiceabilityLogLines(
                    change_of_serviceability_log=snow,
                    trade=trade,
                    user_qual=user_qual,
                    tradesman_sup=qualification,
                    date_cleared=timezone.now(),
                    cleared_yn="I"
                )
                new_entry.save()
                new_entry= ChangeOfServiceabilityLogLines.objects.last()
                new_id=new_entry.id
            return JsonResponse({"status": "OK", "action": "INITIATED" , "cosl_line_id": new_id, "user": {"name": user_initiated.user_name, "rank": user_initiated.rank.abbreviation}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

def check_passkey_authentication_right_side_limitation(request):
    data = json.loads(request.body)
    snow_id= data.get('snowId')
    trade_id = data.get('trade')
    ids= data.get('byWhom')
    pin= data.get('passkey')
    qualification= data.get('qualification')
    cleared= data.get('cleared')

    #-------- checking passkey of selected  user  if passkey is valid then ---------------------------------------------#
    #-------- if entry is inserted by supervisor Then cleared will be 'I' (initiated but not authenticated)-------------#
    #-------- if cleared === 'I' >> Only cleared_yn will updated to 'Y' ------------------------------------------------#
    #-------- if cleared === 'I' >> if changing or resetting user >> Then new user will update in COSL-line_table w.r.to that snow (cosl_line_id) ----#
    #-------- if cleared === 'N' and qualification in ['TDS', 'SUP'] >> Then new insert in COSL-line_table -------------#
    #-------- if cleared === 'N' and qualification is 'ATO' >> Then entry of that snow will be updated in COSL_table ---#
    try:
        user= Users.objects.get(userQualsTrade__id=ids, pin=pin)
        # -------- qualification in ['TDS', 'SUP'] >> Then new insert in COSL-line_table w.r.to that snow (cosl_id) ----#
        # -------- qualification in ['SUP'] >> Then an update in supervisor_id in COSL_table w.r.to that cosl_id -------#
        # -------- after successful entry the cosl_line_id will be returned and saved in formData for further action ---#
        # if user and cleared == "N" and (qualification == 'SUP' or qualification == 'TDS'):
        if user and cleared == "N" and qualification == 'SUP':
            cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
            user_qual = UserQuals.objects.get(id=ids)
            trade = Trades.objects.get(id=trade_id)
            cosl_instance.supervisor = qualification
            cosl_instance.save()
            new_entry = ChangeOfServiceabilityLogLines(
                change_of_serviceability_log=cosl_instance,
                trade=trade,
                user_qual=user_qual,
                tradesman_sup=qualification,
                date_cleared=timezone.now(),
                cleared_yn="Y"
            )
            new_entry.save()
            new_entry = ChangeOfServiceabilityLogLines.objects.last()
            new_id = new_entry.id
            return JsonResponse({"status": "OK", "cosl_line_id": new_id, "user": {"name": user.user_name, "rank": user.rank.abbreviation}})

        elif user and cleared == "R" and qualification == 'SUP':
            cosl_lines_id = data.get('coslLinesId')
            user_qual = UserQuals.objects.get(id=ids)
            trade = Trades.objects.get(id=trade_id)
            cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
            # cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=cosl_lines_id.change_of_serviceability_log)
            cosl_instance.supervisor = qualification
            cosl_instance.status = "2"
            cosl_instance.save()
            cosl_lines_instance = ChangeOfServiceabilityLogLines.objects.get(id=cosl_lines_id)
            cosl_lines_instance.trade = trade
            cosl_lines_instance.user_qual = user_qual
            cosl_lines_instance.date_cleared = timezone.now()
            cosl_lines_instance.cleared_yn = "Y"
            cosl_lines_instance.save()
            return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})

        # -------- if qualification is 'ATO' >> Then entry of that snow will be updated in COSL_table --------------#
        # -------- authorised_by_id, status, and date will be captured in cosl table w.r.to that snow id -----------#
        elif user and cleared == "N" and qualification == 'ATO':
            cosl_instance = ChangeOfServiceabilityLogs.objects.get(id=snow_id)
            cosl_instance.authorised_by = UserQuals.objects.get(id=ids)
            cosl_instance.status = "3"
            cosl_instance.save()
            return JsonResponse({"status": "OK", "user": {"name": user.user_name, "rank": user.rank.abbreviation}})

        else:
            return JsonResponse({"status": "Fail", "message": "Invalid Credentials"}, status=400)
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

# --------- For removing of the selected user >> Then updating cleared_Yn to N of that user in COSL_line table ---------#
@require_POST
def remove_user(request):
    data = json.loads(request.body)
    snow_id= data.get('snowId')
    trade_id = data.get('trade')
    ids= data.get('byWhom')
    qualification= data.get('qualification')
    cosl_lines_id = data.get('coslLinesId')
    try:
        if cosl_lines_id:
            cosl_lines_instance= ChangeOfServiceabilityLogLines.objects.get(id=cosl_lines_id)
            cosl_lines_instance.cleared_yn = "N"
            cosl_lines_instance.save()
        else:
            cosl_lines_instance= ChangeOfServiceabilityLogLines.objects.filter(user_qual_id=ids, trade=trade_id, tradesman_sup=qualification, change_of_serviceability_log_id=snow_id)
            cosl_lines_instance[0].cleared_yn = "N"
            cosl_lines_instance[0].save()
        return JsonResponse({"status": "OK", "user": {"id": ids}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

def forward_to_ato_for_authorisation(request):
    data = json.loads(request.body)
    snow_id= data.get('snowId')
    try:
        if snow_id:
            cosl_instance= ChangeOfServiceabilityLogs.objects.get(id=snow_id)
            cosl_instance.status = 104
            cosl_instance.save()
        return JsonResponse({"status": "OK"})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Oops Error"}, status=400)


#--------------------------------- For all user name of related  store type >> template one ----------------------------#
def user_details_for_authentication_one(request, id ):
    users_from_user_quals = UserQuals.objects.filter(active_yn='Y', aircraft_type_id=id).distinct('user_id')
    data = list(users_from_user_quals.values("id", pno=F("user__pno"), user_name=F("user__user_name"),  abbreviation=F("user__rank__abbreviation")))
    return JsonResponse(data, safe=False)

# --------------------------------- For all trades  >> template two ----------------------------------------------------#
def user_authentication_for_trade(request):
    trades = Trades.objects.all().distinct()
    data = list(trades.values("id", "trade"))
    return JsonResponse(data, safe=False)

# --------------------------------- Fetch users of selected trade & qualification  >> template two ---------------------#
@require_GET
def fetch_authenticated_data(request):
    snow_id= request.GET.get("snowId")
    tdsSupEntries = ChangeOfServiceabilityLogLines.objects.filter(change_of_serviceability_log_id=snow_id, cleared_yn__in= ['Y', 'I']).select_related('trade', 'user_qual').order_by('-tradesman_sup')
    supEntries = ChangeOfServiceabilityLogs.objects.filter(id=snow_id, supervisor__isnull=False).select_related('supervisor')
    atoEntries = ChangeOfServiceabilityLogs.objects.filter(id=snow_id, authorised_by__isnull=False).select_related('authorised_by')
    data = []
    data1 = []
    for entry in tdsSupEntries:
        data.append({
            'id': entry.id,
            'trade_id': entry.trade.id if getattr(entry, 'trade', None) else None,
            'trade_name': entry.trade.trade,
            'user_qual_id': entry.user_qual.id,
            'user_qual_name': entry.user_qual.user.user_name,
            'pno': entry.user_qual.user.pno,
            'rank': entry.user_qual.user.rank.abbreviation,
            'tradesman_sup': entry.tradesman_sup,
            'cleared_yn': entry.cleared_yn,
            'status': None
        })
    for entry in supEntries:
        data1.append({
            'id': None,
            'user_qual_id': entry.supervisor.id if getattr(entry, 'supervisor', None) else None,
            'user_qual_name': entry.supervisor.user.user_name if getattr(entry, 'supervisor', None) else None,
            'pno': entry.supervisor.user.pno,
            'rank': entry.supervisor.user.rank.abbreviation,
            'status': entry.status
        })
    for entry in atoEntries:
        data.append({
            'id': None,
            'trade_id': entry.trade.id if getattr(entry, 'trade', None) else None,
            'trade_name': entry.trade.trade if getattr(entry, 'trade', None) else None,
            'user_qual_id': entry.authorised_by.id if getattr(entry, 'authorised_by', None) else None,
            'user_qual_name': entry.authorised_by.user.user_name if getattr(entry, 'authorised_by', None) else None,
            'pno': entry.authorised_by.user.pno,
            'rank': entry.authorised_by.user.rank.abbreviation,
            'tradesman_sup': 'ATO',
            'cleared_yn': 'Y',
            'status': entry.status
        })
    return JsonResponse({'data': data, 'data1': data1})
    # return JsonResponse(data , safe=False)

def user_details_for_authentication_two(request):
    aircraft_type_id= request.GET.get("aircraft_type_id")
    qualification= request.GET.get("qualification")
    trade= request.GET.get("trade")
    if not (qualification and trade and aircraft_type_id):
        return JsonResponse([], safe=False)
    try:
        trade= int(trade)
    except ValueError:
        return JsonResponse([], safe=False)
    if qualification == "TDS": qual_code_range= range(1, 8)
    elif qualification == "SUP": qual_code_range= range(4, 8)
    elif qualification == "FSI": qual_code_range= range(5, 6)
    elif qualification == "SSS": qual_code_range= range(6, 7)
    elif qualification == "ACC": qual_code_range= range(6, 7)
    elif qualification == "FCC": qual_code_range= range(6, 7)
    elif qualification == "ATZ": qual_code_range= range(6, 8)
    elif qualification == "ATO": qual_code_range= range(7, 8)
    else: qual_code_range=Quals.objects.values_list("qual_code", flat=True)
    qual_code_range_id= Quals.objects.filter(qual_code__in=qual_code_range).values_list("id", flat=True)
    if qualification in ["TDS"]:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id__in=[trade, 202500012] , aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    elif qualification in ["SUP"]:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id__in=[trade, 202500012] , aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    elif qualification in ["SSS"]:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id__in=[trade] , aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    elif qualification in ["FCC" , "ACC" ]:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id__in=[trade]  , aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    elif qualification in ["ATZ","ATO"]:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id=trade ,aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    else:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id=trade, aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct('user_id')
    data = list(users_from_user_quals.values("id", pno=F("user__pno"), user_name=F("user__user_name"), abbreviation=F("user__rank__abbreviation")))
    return JsonResponse(data, safe=False)


# --------------------------------------Code Dump-----------------------------------------
# def user_details_for_authentication(request):
#     try:
#         users= {u.id: u for u in Users.objects.all()}
#         ranks= {r.id: r.abbreviation for r in Ranks.objects.all()}
#         user_quals_data = UserQuals.objects.all()
#         data = []
#         for record in user_quals_data:
#             user_data_id = users.get(record.user_id)
#             if user_data_id:
#                 pno= user_data_id.pno
#                 user_name= user_data_id.user_name
#                 rank =ranks.get(user_data_id.rank_id, "No Rank"),
#             data.append({
#                 'user_id': record.id ,
#                 'date_awarded': record.date_awarded ,
#                 'pno': pno,
#                 'user_name': user_name,
#                 'rank': rank,
#             })
#         # print(data)
#         return JsonResponse(data, safe=False)
#     except ObjectDoesNotExist:
#         return JsonResponse({"error": "<UNK>"})
#
#

# def check_passkey_authentication(request):
#     data = json.loads(request.body)
#     id= data.get('byWhom')
#     pin= data.get('passkey')
#     try:
#         user= Users.objects.get(id=id, pin=pin)
#         return JsonResponse({"status": "OK", "user": {"id": user.id, "name": user.user_name}})
#     except ObjectDoesNotExist:
#         return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)


# def user_qualification_for_authentication(request):
#     try:
#         users= {u.id: u for u in Users.objects.all()}
#         quals= {q.id: q.qual_name for q in Quals.objects.all()}
#         user_quals_data = UserQuals.objects.all()
#         data = []
#         for record in user_quals_data:
#             qual_name =quals.get(record.qual_id, "No Quals"),
#             data.append({
#                 'qual_id': record.id ,
#                 'qual_name': qual_name ,
#             })
#         return JsonResponse(data, safe=False)
#     except ObjectDoesNotExist:
#         return JsonResponse({"error": "<UNK>"})
#
# def user_details_for_authentication(request, id):
#     users = Users.objects.filter(userQualsTrade__trade_id=id).distinct()
#     data = list(users.values("id", "pno", "user_name", abbreviation= F("rank__abbreviation")))
#     return JsonResponse(data, safe=False)



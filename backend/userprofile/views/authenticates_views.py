import json
from django.db.models import F
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

from ..models import (Users, Trades, Quals, UserQuals, AircraftMasters)

#------------------------ For checking passkey w.r.t. selected  user >> Applicable for all templates -------------------#
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

# def check_passkey_authentication(request):
#     data = json.loads(request.body)
#     ids= data.get('byWhom')
#     pin= data.get('passkey')
#     try:
#         user= Users.objects.get(userQualsTrade__id=ids, pin=pin)
#         return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})
#     except ObjectDoesNotExist:
#         return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

def check_passkey_authentication(request):
    data = json.loads(request.body)
    snow_id= data.get('snowId')
    trade = data.get('trade')
    ids= data.get('byWhom')
    pin= data.get('passkey')
    qualification= data.get('qualification')
    try:
        user= Users.objects.get(userQualsTrade__id=ids, pin=pin)
        # if user:

        return JsonResponse({"status": "OK", "user": {"id": ids, "name": user.user_name, "rank": user.rank.abbreviation}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)


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

# --------------------------------- Fetch users of selected trade & qualification  >> template two ----------------------------------------------------#
@require_GET
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
    if qualification == "TDS":
        qual_code_range= range(1, 8)
    elif qualification == "SUP":
        qual_code_range= range(4, 8)
    elif qualification == "ATZ":
        qual_code_range= range(6, 8)
    else:
        qual_code_range=Quals.objects.values_list("qual_code", flat=True)
    qual_code_range_id= Quals.objects.filter(qual_code__in=qual_code_range).values_list("id", flat=True)
    if qualification == "ATZ":
        users_from_user_quals = UserQuals.objects.all().filter(aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct()
    else:
        users_from_user_quals = UserQuals.objects.all().filter(trade_id=trade, aircraft_type_id=aircraft_type_id, qual_id__in=qual_code_range_id).distinct()
    data = list(users_from_user_quals.values("id", pno=F("user__pno"), user_name=F("user__user_name"), abbreviation=F("user__rank__abbreviation")))
    return JsonResponse(data, safe=False)




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
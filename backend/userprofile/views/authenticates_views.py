import json
from django.db.models import F
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from ..models import ( Users, Trades, Quals, UserQuals)
#--------------------------------- For all user name of related  store type >> template one ----------------------------#
def user_details_for_authentication_one(request):
    users = Users.objects.filter(userQualsTrade__isnull=False).distinct()
    data = list(users.values("id", "pno", "user_name", abbreviation= F("rank__abbreviation")))
    return JsonResponse(data, safe=False)

#--------------------------------- For checking passkey w.r.t. selected  user >> All templates -------------------------#
@csrf_exempt
@require_POST
def check_passkey_authentication(request):
    data = json.loads(request.body)
    id= data.get('byWhom')
    pin= data.get('passkey')
    try:
        user= Users.objects.get(id=id, pin=pin)
        return JsonResponse({"status": "OK", "user": {"id": user.id, "name": user.user_name+", "+user.rank.abbreviation,}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)

# --------------------------------- For all trades  >> template two ----------------------------------------------------#
def user_authentication_for_trade(request):
    trades = Trades.objects.all().distinct()
    data = list(trades.values("id", "trade"))
    return JsonResponse(data, safe=False)

def user_qualification_for_authentication(request):
    try:
        users= {u.id: u for u in Users.objects.all()}
        quals= {q.id: q.qual_name for q in Quals.objects.all()}
        user_quals_data = UserQuals.objects.all()
        data = []
        for record in user_quals_data:
            qual_name =quals.get(record.qual_id, "No Quals"),
            data.append({
                'qual_id': record.id ,
                'qual_name': qual_name ,
            })
        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "<UNK>"})

def user_details_for_authentication(request, id):
    users = Users.objects.filter(userQualsTrade__trade_id=id).distinct()
    data = list(users.values("id", "pno", "user_name", abbreviation= F("rank__abbreviation")))
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
from django.http import JsonResponse
from django.db.models import F
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
import json
from django.views.decorators.csrf import csrf_protect
from userprofile.models.ranks import Ranks
from userprofile.models.quals import Quals
from userprofile.models.user_quals import UserQuals
from userprofile.models.entry_types import EntryTypes
from userprofile.models.users import Users
from userprofile.models.aircraft_masters import AircraftMasters
from userprofile.models.fuel_tanks import FuelTanks
from userprofile.models.customers import Customers
from userprofile.models.change_of_serviceability_logs import ChangeOfServiceabilityLogs
from userprofile.serializers import  (RanksSerializer,AircraftMastersSerializer,UsersSerializer,QualsSerializer, UserQualsSerializer,
                                      get_dynamic_serializer, ChangeOfServiceabilityLogsSerializer,AircraftMastersSerializer,CustomersSerializer, AircraftTypesSerializer,)
from django.contrib.auth.decorators import login_required

#---Added by Abhishek Singh on 13jun25 for Dynamic views and urls
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import ViewSet




#------------------------------------------------- Import All Models Here -------------------------------------------

from .models import (AircraftMasters,AircraftRoles,AircraftTypes,Customers,FuelTanks,ChangeOfServiceabilityLogs,Trades,
                     UserQuals, Users, EcuMasters,TyrePressures,Pols,Systems)


# --------------------------- To fetch Data for Leading Particulars ---------------------------------------------

def aircraft_all_detail_view(request, id ):
    try:
        aircraft1= AircraftMasters.objects.get(id=id)
        data = model_to_dict(aircraft1)
        ecu_details = list(EcuMasters.objects.filter(aircraft_master_id=id).values())
        data['ecu_details'] = ecu_details
        fuel_tanks = list(FuelTanks.objects.filter(aircraft_type_id=aircraft1.aircraft_type_id).values('tank_group', 'capacity'))
        data['fuel_tanks'] = fuel_tanks
        ac_type = AircraftTypes.objects.get(id=aircraft1.aircraft_type_id)
        data['ac_type'] = ac_type.aircraft_name
        lg_tyre_pressure = list(TyrePressures.objects.filter(aircraft_type_id=aircraft1.aircraft_type_id).values())
        data['lg_tyre_pressure'] = lg_tyre_pressure
        ac_roles_qs = AircraftRoles.objects.filter(aircraft_type_id=aircraft1.aircraft_type_id)
        ac_roles = ', '.join(r.role for r in ac_roles_qs)
        data['roles'] = ac_roles

        olg_gases= list(Pols.objects.filter(aircraft_type_id=aircraft1.aircraft_type_id).values('id','system', 'type_of_pol', 'description', 'substitute_id', 'nato_code'))
        system_ids_o = [item['system'] for item in olg_gases]
        system_lookup = {s.id: s.system for s in Systems.objects.filter(id__in=system_ids_o)}
        for item in olg_gases:
            item['system_name'] = system_lookup.get(item['system'], '')
        olg_gases_fuel=[item for item in olg_gases if item['type_of_pol'] == 'F']
        olg_gases_oil = [item for item in olg_gases if item['type_of_pol'] != 'F']
        data['olg_gases_fuel'] = olg_gases_fuel
        data['olg_gases'] = olg_gases_oil
        return JsonResponse(data)
    except AircraftMasters.DoesNotExist:
        return JsonResponse({"error": "<UNK>"})

def user_user_authentication_for_trade(request):
    trades = Trades.objects.filter(userQualsTrade__isnull=False).distinct()
    data = list(trades.values("id", "trade"))
    return JsonResponse(data, safe=False)

def user_user_qualification_for_authentication(request):
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

def user_details_for_authentication_one(request):
    users = Users.objects.filter(userQualsTrade__isnull=False).distinct()
    data = list(users.values("id", "pno", "user_name", abbreviation= F("rank__abbreviation")))
    return JsonResponse(data, safe=False)

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
@csrf_exempt
@require_POST
def check_passkey_authentication(request):
    data = json.loads(request.body)
    id= data.get('byWhom')
    pin= data.get('passkey')
    try:
        user= Users.objects.get(id=id, pin=pin)
        return JsonResponse({"status": "OK", "user": {"id": user.id, "name": user.user_name}})
    except ObjectDoesNotExist:
        return JsonResponse({"status": "Fail", "message": "Invalid Passkey"}, status=400)
@login_required
class AircraftDetailView(APIView):
    def get(self,request,side_no,format=None):
        try:
            aircraft = AircraftMasters.objects.get(side_no=side_no)
            serializer = AircraftMastersSerializer(aircraft)
            return Response(serializer.data)
        except AircraftMasters.DoesNotExist:
            return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)


class AircraftTypeDetailsView(ListAPIView):
    queryset = AircraftTypes.objects.all()
    serializer_class = AircraftTypesSerializer


def AircraftDetailsView(request,aircraft_type_id):
    try:
        data = list(AircraftMasters.objects.filter(aircraft_type_id=aircraft_type_id).values())
        return JsonResponse(data,safe=False)
    except AircraftMasters.DoesNotExist:
        return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_customers(request):
    customers = Customers.objects.all()
    serializer = CustomersSerializer(customers,many=True)
    return Response(serializer.data)




    # DYNAMIC VIEWS..for useTableApi...@Abhishek_singh #13jun25
class DynamicModelView(ViewSet):
    def get_model_class(self,table ):
        try:
            model_name = ''.join(part.capitalize() for part in table.split('_'))
            return apps.get_model('userprofile',model_name)
        except LookupError:
            return None

    def get(self,request,table,pk=None):
        Model = self.get_model_class(table)
        if not Model:
            return Response({'error':'Model not found'}, status=404)

        include = request.query_params.getlist("include")
        serializer_class = get_dynamic_serializer(Model)

        if pk:
            try:
                obj = Model.objects.get(pk=pk)
            except ObjectDoesNotExist:
                return Response({'error':'Object not found'}, status=404)
            serializer = serializer_class(obj, context={'include':include})
            return Response(serializer.data)

        #Filtering based on query params
        filters ={}
        for key,value in request.query_params.items():
            if key != 'include':
                filters[key] = value
        queryset = Model.objects.filter(**filters)

        serializer = serializer_class(queryset,many=True,context={'include':include})
        return Response(serializer.data)

    def post(self,request,table):
        Model = self.get_model_class(table)
        if not Model:
            return Response({'error':'Model not found'}, status=404)

        serializer_class = get_dynamic_serializer(Model)
        serializer = serializer_class(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(serializer_class(instance).data, status=201)
        return Response(serializer.errors, status=400)

    def put(self,request,table,pk):
        Model = self.get_model_class(table)
        if not Model:
            return Response({'error':'Model not found'}, status=404)

        try:
            instance = Model.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response({'error':'Object not found'}, status=404)

        serializer_class = get_dynamic_serializer(Model)
        partial = request.method == 'PATCH'
        serializer = serializer_class(instance,data=request.data,partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def list(self,request,table):
        Model = self.get_model_class(table)
        queryset = Model.objects.all()

        #filter using query params
        for key,value in request.query_params.items():
            if key != "include":
                queryset = queryset.filter(**{key:value})

        #Handle "include" param
        include = request.query_params.get('include')
        serializer_class = get_dynamic_serializer(Model)
        serializer = serializer_class(queryset,many=True,context={'include':include})
        return Response(serializer.data)

    def delete(self,request,table,pk=None):
        model_class = self.get_model_class(table)
        if pk:
            try:
                obj = model_class.objects.get(pk=pk)
                obj.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except model_class.DoesNotExist:
                return Response({"detail":"Not found"},status=status.HTTP_404_NOT_FOUND)
        else:
            model_class.objects.all().delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


#.....get&set method for useParams().....:-Abhishek Singh
@csrf_protect
@require_GET
def get_params(request):
    params = request.session.get('params',{})
    return JsonResponse({'params': params})

@csrf_protect
@require_POST
def set_params(request):
    try:
        data = json.loads(request.body)
        params = request.session.get('params',{})
        params.update(data)
        request.session['params'] = params
        return JsonResponse({'status':'saved', 'params': data})
    except Exception as e:
        return JsonResponse({'error':str(e)}, status=400)

class Quals_view(ListAPIView):
    # queryset = AircraftMasters.objects.all()
    queryset = Quals.objects.all()
    serializer_class = QualsSerializer


class ChangeOfServiceabilityLogsCreateView(generics.CreateAPIView):
    queryset = ChangeOfServiceabilityLogs.objects.all()
    serializer_class = ChangeOfServiceabilityLogsSerializer


    #------------------------code Dump --------------------------------------------------#

    # user_quals_data = list(UserQuals.objects.filter(id=id).values('id','user', 'qual', 'date_awarded'))
    # user_quals_data = list(UserQuals.objects.all().values('id','user_id', 'qual', 'date_awarded'))
    # user_quals_id = [item['user_id'] for item in user_quals_data]
    # user_lookup = {u.id: u.user_id for u in Users.objects.filter(id__in=user_quals_id)}
    # for item in user_quals_data:
    #     # item['id'] = user_lookup.get(item['id '], '')
    #     item['user_name'] = user_lookup.get(item['user_name'], '')
    #     # item['pno'] = user_lookup.get(item['pno'], '')

    # return JsonResponse({'data': list(user_quals_data), 'data0': data})
    # try:
    # user_quals_data = UserQuals.objects.all().values('id','user_id', 'qual_id', 'date_awarded')
    # data=[]
    # for userQuals in user_quals_data:
    #     user_data = Users.objects.filter(id=userQuals['id']).values()
    #     data.append({
    #         'user_id': user_data['user_id'],
    #         'pno': user_data['pno'],
    #         'user_name': user_data['user_name'],
    #     })
    # return JsonResponse(data)
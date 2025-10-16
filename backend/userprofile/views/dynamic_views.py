from gc import is_finalized
from django.db.models import F
from http.cookiejar import MISSING_FILENAME_TEXT
from importlib.metadata import pass_none
from pydoc import stripid

from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.hashers import check_password
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
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
from userprofile.serializers import  (RanksSerializer,AircraftMastersSerializer,UsersSerializer,QualsSerializer,
                                      get_dynamic_serializer, ChangeOfServiceabilityLogsSerializer,CustomersSerializer,AircraftMastersSerializer, AircraftTypesSerializer,HowFoundDefectsSerializer)
from userprofile.models.ranks import Ranks
from userprofile.models.quals import Quals
from userprofile.models.entry_types import EntryTypes
from userprofile.models.users import Users
from userprofile.models.aircraft_masters import AircraftMasters
from userprofile.models.fuel_tanks import FuelTanks
from userprofile.models.customers import Customers
from userprofile.models.security_questions import SecurityQuestions
from userprofile.models.change_of_serviceability_logs import ChangeOfServiceabilityLogs
from userprofile.serializers import  (RanksSerializer,AircraftMastersSerializer,UsersSerializer,QualsSerializer,SecurityQuestionsSerializer,
                                      get_dynamic_serializer, ChangeOfServiceabilityLogsSerializer,AircraftMastersSerializer,CustomersSerializer, AircraftTypesSerializer,)
from django.contrib.auth.decorators import login_required

#---Added by Abhishek Singh on 13jun25 for Dynamic views and urls
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import ViewSet




#------------------------------------------------- Import All Models Here -------------------------------------------

from userprofile.models import (Ranks,Quals,EntryTypes,AircraftMasters,AircraftRoles,AircraftTypes,Customers,FuelTanks,ChangeOfServiceabilityLogs,
                     Users,EcuMasters,TyrePressures,Pols,Systems)


# --------------------------- To fetch Data for Leading Particulars ---------------------------------------------
class AircraftSideNoView(ListAPIView):
    # side_no= data.get('side_no')
    queryset = AircraftMasters.objects.all()
    serializer_class = AircraftMastersSerializer
# --------------- Code added for aircraft details fetching for Headers for all page ------------------------------------#
def data_for_headers(request, id ):
    data= (AircraftMasters.objects.filter(id=id).annotate(aircraft_name=F("aircraft_type__aircraft_name")).values('id','side_no','aircraft_name').first())
    print(data)
    if data:
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({"error": "<UNK>"})

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

def get_user_details(request, pno):
    try:
        user = Users.objects.get(pno=pno)
        rank = Ranks.objects.get(id=user.rank_id)
        return JsonResponse({"success": True, "user_name": user.user_name, "rank": rank.abbreviation})
    except Users.DoesNotExist:
        return JsonResponse({'error':'User not found'}, status=404)
    except Ranks.DoesNotExist:
        return JsonResponse({'error':'Ranks not found'}, status=404)

@api_view(['GET'])
def get_security_questions(request):
    """ Return all security questions as a list"""
    questions = list(SecurityQuestions.objects.all().values( "sec_questions"))
    if not questions:
        return JsonResponse({'error':'No security questions found'}, status=404)
    return JsonResponse({'questions': questions}, safe=False)

def validate_password(request):
    if request.method != 'POST':
        return JsonResponse({'error':'Invalid request'}, status=400)
    try:
        data = json.loads(request.body)
    except Exception as e:
        print("validate_password:failed to parse JSON:",e)
        return JsonResponse({'error':'Bad Json'}, status=400)
    print ("validate_password payload:",data)
    pno= data.get("pno")
    incoming = data.get("password") if data.get("password") is not None else data.get("login_pwd")

    print("pno",pno,"password present?:",bool(incoming))

    print("incoming password repr:",repr(incoming))

    if not pno or incoming is None:
        print("missing pno or incoming password in payload")
        return JsonResponse({"valid":False})

    try:
        user = Users.objects.get(pno=pno)
        print("found user:",user)
        stored_hashed_pwd = user.login_pwd

        print("stored_hashed_pwd preview",(stored_hashed_pwd[:60] + "...") if stored_hashed_pwd else None)

        incoming_clean = incoming.strip() if isinstance(incoming,str) else incoming
        print ("incoming_clean repr:",repr(incoming_clean))

        ok = False

        try :
            ok = check_password(incoming_clean,stored_hashed_pwd )
        except Exception as e:
            print("check_password threw exception:",e)
        print ("check_password result:",ok)

        return JsonResponse({"valid":bool(ok)})
    except Users.DoesNotExist:
        print("user does not exist for pno:",pno)
        return JsonResponse({"valid":False})

def validate_security_answer(request):
    if request.method != "POST":
        return JsonResponse({"error":"Invalid request"}, status=400)
    try:
        data = json.loads(request.body)
    except Exception:
        return JsonResponse({"error":"Invalid Json"}, status=400)
    pno = data.get("pno")
    id  = data.get("security_question_id")
    ans = data.get("security_question_ans")
    if not pno or not id or not ans:
        return JsonResponse({"valid":False, "error": "Missing fields"}, status=400)
    try:
        user = Users.objects.get(pno=pno)
    except Users.DoesNotExist:
        return JsonResponse({"valid":False, "error": "User not found"}, status=404)
    if (
        str(user.security_question_id) == str(id)
        and user.security_question_ans.strip().lower() == ans.strip().lower()
    ):
        return JsonResponse({"valid":True})
    else:
        return JsonResponse({"valid":False, "error": "Incorrect answer"})



@csrf_protect
def reset_passcode(request):
    if request.method != 'POST':
        return JsonResponse({'error':'Invalid request'}, status=400)
    try:
        data = json.loads(request.body)
    except Exception as e:
        return JsonResponse({'error':'Bad Json'}, status=400)
    pno = data.get("pno")
    new_pass = data.get("new_passcode")
    confirm = data.get("confirm_passcode")

    if not pno or not new_pass or  new_pass != confirm:
        return JsonResponse({"success":False,"error":"Invalid Input"})
    try:
        user = Users.objects.get(pno=pno)
    except Users.DoesNotExist:
        return JsonResponse({"success":False,"error":"User not found"})

    user.pin = make_password(new_pass)
    user.save()
    return JsonResponse({"success":True})


class Quals_view(ListAPIView):
    # queryset = AircraftMasters.objects.all()
    queryset = Quals.objects.all()
    serializer_class = QualsSerializer

#
class ChangeOfServiceabilityLogsCreateView(generics.ListCreateAPIView):
    serializer_class = ChangeOfServiceabilityLogsSerializer
    def get_queryset(self):
        aircraft_master_id = self.kwargs.get('id')
        return (ChangeOfServiceabilityLogs.objects.select_related("how_found_defect").prefetch_related("change_of_serviceability_log_lines").filter(aircraft_master_id=aircraft_master_id).order_by('snow'))

# def ChangeOfServiceabilityLogsCreateView(request, id):
#     try:
#         # aircraft1= AircraftMasters.objects.get(id=id)
#         # data = model_to_dict(aircraft1)
#         data=ChangeOfServiceabilityLogs.filter(aircraft_master_id=id)
#         print(data)
#         return JsonResponse(data)
#     except AircraftMasters.DoesNotExist:
#         return JsonResponse({"error": "<UNK>"})
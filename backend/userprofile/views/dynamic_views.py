from django.http import JsonResponse
import json
from django.shortcuts import render
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
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

#---Added by Abhishek Singh on 13jun25 for Dynamic views and urls
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.viewsets import ViewSet

from ..serializers import  (get_dynamic_serializer, CustomersSerializer)


from ..models import ( Customers, EcuMasters, FuelTanks, AircraftTypes, TyrePressures, AircraftRoles, Pols, Systems)

#-------------------get&set method for useParams()----------------:-Abhishek Singh------------------------------#
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

@api_view(['GET'])
def get_customers(request):
    customers = Customers.objects.all()
    serializer = CustomersSerializer(customers,many=True)
    return Response(serializer.data)

# --------------------------DYNAMIC VIEWS..for useTableApi------------------------------@Abhishek_singh #13jun25
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
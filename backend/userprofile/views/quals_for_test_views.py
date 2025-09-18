from rest_framework.generics import ListAPIView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status

from ..serializers import  (QualsSerializer, AircraftTypesSerializer)

from ..models import ( Quals, AircraftMasters, AircraftTypes, TyrePressures, AircraftRoles, Pols, Systems)

class Quals_view(ListAPIView):
    queryset = Quals.objects.all()
    serializer_class = QualsSerializer

class AircraftTypeDetailsView(ListAPIView):
    queryset = AircraftTypes.objects.all()
    serializer_class = AircraftTypesSerializer

def AircraftDetailsView(request,aircraft_type_id):
    try:
        data = list(AircraftMasters.objects.filter(aircraft_type_id=aircraft_type_id).values())
        return JsonResponse(data,safe=False)
    except AircraftMasters.DoesNotExist:
        return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)
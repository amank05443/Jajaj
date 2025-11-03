from rest_framework import status, generics
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import transaction
from datetime import datetime
from rest_framework.decorators import api_view
from ..serializers import  (ChangeOfServiceabilityLogsSerializer, SystemsSerializer, AircraftRolesSerializer, ItemsSerializer,LimDefrDefLogsSerializer)
from ..models import (AircraftMasters, HowFoundDefects, EntryTypes, Systems, AircraftRoles, Items, Users,
                      ChangeOfServiceabilityLogs, LimDefrDefHusLogs, Softwares, UserQuals, WeightBalance)
from django.db.models import Max

@api_view(['GET'])
def roleChangeLogData(request):
    aircraft_master_id = request.GET["aircraft_master_id"]
    weight_qs = WeightBalance.objects.filter(aircraft_master_id=aircraft_master_id)
    print(weight_qs)
    data = list(weight_qs.values('id', 'corrected_weight','corrected_moment_long','corrected_moment_lat'))
    print(data)
    return JsonResponse(data, safe=False)
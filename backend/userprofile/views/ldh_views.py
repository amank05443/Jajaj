from rest_framework import status,generics
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import transaction
from datetime import datetime
from rest_framework.decorators import api_view
from ..serializers import  (ChangeOfServiceabilityLogsSerializer,LimDefrDefLogsSerializer)
from ..models import (ChangeOfServiceabilityLogs, LimDefrDefHusLogs)

class LimGridData(generics.ListCreateAPIView):
    serializer_class = LimDefrDefLogsSerializer
    def get_queryset(self):
        aircraft_master_id = self.kwargs.get('id')
        return (LimDefrDefHusLogs.objects.select_related("change_of_serviceability_log","main_system","item").filter(change_of_serviceability_log__aircraft_master=aircraft_master_id,limitations_yn="Y"))


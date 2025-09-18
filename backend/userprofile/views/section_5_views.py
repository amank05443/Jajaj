from rest_framework import status,generics
from ..serializers import  (ChangeOfServiceabilityLogsSerializer)
from ..models import ( ChangeOfServiceabilityLogs)

class ChangeOfServiceabilityLogsCreateView(generics.CreateAPIView):
    queryset = ChangeOfServiceabilityLogs.objects.all()
    serializer_class = ChangeOfServiceabilityLogsSerializer
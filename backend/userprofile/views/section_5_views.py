from rest_framework import status,generics
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from ..serializers import  (ChangeOfServiceabilityLogsSerializer, SystemsSerializer, AircraftRolesSerializer, ItemsSerializer)
from ..models import ( AircraftMasters, HowFoundDefects,EntryTypes,Systems , AircraftRoles, Items,ChangeOfServiceabilityLogs)

class ChangeOfServiceabilityLogsCreateView(generics.CreateAPIView):
    queryset = ChangeOfServiceabilityLogs.objects.all()
    serializer_class = ChangeOfServiceabilityLogsSerializer


def usLogDropDowns(request):
    data = {
        "aircraftMasters": AircraftMasters.objects.filter(id=request.GET["aircraft_master_id"]).values().first(),
        "howFoundDefects": list(HowFoundDefects.objects.values("id","occasion")),
        "entryTypes": list(EntryTypes.objects.values("id","occasion")),
    }
    print(data)
    return JsonResponse(data,safe=False)

# def limLogData(request):
#     data = {
#         "systemsData": list(Systems.objects.filter(aircraft_type_id=request.GET["aircraft_type_id"])),
#         "acRoleData": list(AircraftRoles.objects.filter(aircraft_type_id=request.GET["aircraft_type_id"])),
#         "itemsData": list(Items.objects.filter(store_type_id=request.GET["aircraft_type_id"])),
#     }
#     print(data)
#     return JsonResponse(data,safe=False)

@api_view(['GET'])
def limLogData(request):
    aircraft_type_id = request.GET["aircraft_type_id"]
    systems_qs = Systems.objects.filter(aircraft_type=aircraft_type_id)
    acRole_qs = AircraftRoles.objects.filter(aircraft_type=aircraft_type_id)
    items_qs = Items.objects.filter(store_type=aircraft_type_id)

    return Response ({
        "systemsData" : SystemsSerializer(systems_qs,many=True).data,
        "acRoleData" : AircraftRolesSerializer(acRole_qs,many=True).data,
        "itemsData" : ItemsSerializer(items_qs,many=True).data,
    })

class ChangeOfServiceabilityLogsCreateView(generics.ListCreateAPIView):
    serializer_class = ChangeOfServiceabilityLogsSerializer
    def get_queryset(self):
        aircraft_master_id = self.kwargs.get('id')
        return (ChangeOfServiceabilityLogs.objects.select_related("how_found_defect","by_whom__user").filter(aircraft_master_id=aircraft_master_id).order_by('snow'))

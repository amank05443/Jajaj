from rest_framework import status, generics
from rest_framework.response import Response
from django.http import JsonResponse
from django.db import transaction
from datetime import datetime
from rest_framework.decorators import api_view
from ..serializers import (ChangeOfServiceabilityLogsSerializer, SystemsSerializer, AircraftRolesSerializer,
                           ItemsSerializer, LimDefrDefLogsSerializer)
from ..models import (AircraftMasters, HowFoundDefects, EntryTypes, Systems, AircraftRoles, Items, Users,
                      ChangeOfServiceabilityLogs, LimDefrDefHusLogs, UserQuals)


# class ChangeOfServiceabilityLogsCreateView(generics.ListCreateAPIView):
#     serializer_class = ChangeOfServiceabilityLogsSerializer
#     def get_queryset(self):
#         aircraft_master_id = self.kwargs.get('id')
#         return (ChangeOfServiceabilityLogs.objects.select_related("how_found_defect","by_whom").prefetch_related("change_of_serviceability_log_lines").filter(aircraft_master_id=aircraft_master_id).order_by('snow'))


def usLogDropDowns(request):
    data = {
        "aircraftMasters": AircraftMasters.objects.filter(id=request.GET["aircraft_master_id"]).values().first(),
        "howFoundDefects": list(HowFoundDefects.objects.values("id", "occasion")),
        "entryTypes": list(EntryTypes.objects.values("id", "occasion")),
    }
    return JsonResponse(data, safe=False)


@api_view(['GET'])
def limLogData(request):
    aircraft_type_id = request.GET["aircraft_type_id"]
    systems_qs = Systems.objects.filter(aircraft_type=aircraft_type_id)
    # acRole_qs = AircraftRoles.objects.filter(aircraft_type=aircraft_type_id)
    items_qs = Items.objects.filter(store_type=aircraft_type_id)

    return Response({
        "systemsData": SystemsSerializer(systems_qs, many=True).data,
        # "acRoleData" : AircraftRolesSerializer(acRole_qs,many=True).data,
        "itemsData": ItemsSerializer(items_qs, many=True).data,
    })


@api_view(['POST'])
@transaction.atomic
def saveUsLogData(request):
    try:
        data = request.data  # fetching of data coming from frontend
        formData = data["formData"]
        activeCheckboxes = data['activeCheckboxes']
        limLogData = data['limLogData']
        user_id = formData.get('user_id')
        if not user_id:
            return JsonResponse({
                "success": False,
                "error": "Missing key 'user_id' in request data.",
            })
        try:
            user_instance = UserQuals.objects.get(id=user_id)
        except UserQuals.DoesNotExist:
            return JsonResponse({
                "success": False,
                "error": f"No UserQuals found for user_id: {user_id}"
            })

        return_res = {"success": True, "message": "Saved successfully"}

        # Validations for ensuring data
        if not formData or not activeCheckboxes:
            return Response({
                "success": False,
                "error": "Missing Required Fields",
            }, status=status.HTTP_400_BAD_REQUEST)

        if not formData['authenticated'] == "Yes":
            return Response({
                "success": False,
                "error": "Authentication Required",
            }, status=status.HTTP_400_BAD_REQUEST)

        # for getting last_snow_no from aircraft_masters table
        aircraft_master_serial = AircraftMasters.objects.select_for_update().get(id=formData['aircraft_master_id'])
        new_snow_no = aircraft_master_serial.last_snow_no + 1

        # Saving data in Change_Of_Serviceability_Logs table
        cosLog = ChangeOfServiceabilityLogs.objects.create(
            aircraft_master_id=formData['aircraft_master_id'],
            airframe_hrs=formData['airframeHrs'],
            by_whom=user_instance,
            reason_for_placing_unserviceable=formData['reason_for_placing_unserviceable'],
            snow=new_snow_no,
            how_found_defect_id=formData['howFound'],
            status=2,
            entry_type_id=formData['entryType'],
            system_time_date=datetime.now(),
            user_time_date=datetime.strptime(formData['dateAndTime'], "%Y-%m-%dT%H:%M"),
        )
        return_res["cosLog"] = {
            "snow": cosLog.snow,
            "userTimeDate": cosLog.user_time_date,
            "reason": cosLog.reason_for_placing_unserviceable,
        }

        # Separate entry with new snow in case of Independent Check
        if activeCheckboxes['indCheck'] == True:
            indCheckEntry = ChangeOfServiceabilityLogs.objects.create(
                aircraft_master_id=formData['aircraft_master_id'],
                airframe_hrs=formData['airframeHrs'],
                by_whom=formData['user_id'],
                reason_for_placing_unserviceable='Independent Check to be carried out i.a.w. NAMM Art-20/22',
                snow=new_snow_no + 1,
                status=2,
                system_time_date=datetime.now(),
                user_time_date=datetime.strptime(formData['dateAndTime'], "%Y-%m-%dT%H:%M"),
            )
            new_snow_no = new_snow_no + 1
            return_res["indCheck"] = {
                "snow": indCheckEntry.snow,
                "userTimeDate": indCheckEntry.user_time_date,
                "reason": indCheckEntry.reason_for_placing_unserviceable,
            }

        # Separate entry with new snow in case of Loose Articles Check
        if activeCheckboxes['lartCheck'] == True:
            lartCheckEntry = ChangeOfServiceabilityLogs.objects.create(
                aircraft_master_id=formData['aircraft_master_id'],
                airframe_hrs=formData['airframeHrs'],
                by_whom=formData['user_id'],
                reason_for_placing_unserviceable='Loose Articles Check to be carried out i.a.w. NAMM Art-21/25',
                snow=new_snow_no + 1,
                status=2,
                system_time_date=datetime.now(),
                user_time_date=datetime.strptime(formData['dateAndTime'], "%Y-%m-%dT%H:%M"),
            )
            new_snow_no = new_snow_no + 1
            return_res["lartCheck"] = {
                "snow": lartCheckEntry.snow,
                "userTimeDate": lartCheckEntry.user_time_date,
                "reason": lartCheckEntry.reason_for_placing_unserviceable,
            }

        # Updation of last_snow_no in aircraft_masters table
        aircraft_master_serial.last_snow_no = new_snow_no
        aircraft_master_serial.save(update_fields=["last_snow_no"])

        # Saving data in lim_defr_def_logs table

        if activeCheckboxes['lim'] == True:
            limLog = LimDefrDefLogs.objects.create(
                item_id=limLogData['item'],
                limitations_yn='Y',
                deferred_until=limLogData['deferred_until'],
                main_system_id=limLogData['main_system'],
                demand_no=limLogData['demand_id'],
                aircraft_role_id=limLogData['aircraft_role'],
                change_of_serviceability_log_id=cosLog.id,
            )
            return_res["lim"] = {
                "snow": lim.snow,
                "userTimeDate": lim.user_time_date,
                "reason": lim.reason_for_placing_unserviceable,
            }

        return Response({
            "success": True,
            "result": return_res,
            "message": "Entry successfully SAVED.",
        })
    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@transaction.atomic
def clearUsLog(request):
    try:
        data = request.data  # fetching of data coming from frontend
        formData = data["formData"]
        gridData = data["gridData"]

        return Response({
            "success": True,
            "result": return_res,
            "message": "Entry successfully SAVED.",
        })
    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_400_BAD_REQUEST)


class ChangeOfServiceabilityLogsCreateView(generics.ListCreateAPIView):
    serializer_class = ChangeOfServiceabilityLogsSerializer

    def get_queryset(self):
        aircraft_master_id = self.kwargs.get('id')
        return (ChangeOfServiceabilityLogs.objects.select_related("how_found_defect", "by_whom__user").filter(
            aircraft_master_id=aircraft_master_id).order_by('snow'))

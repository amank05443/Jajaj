from django.http import JsonResponse
from django.forms.models import model_to_dict

from ..models import ( AircraftMasters, EcuMasters, FuelTanks, AircraftTypes, TyrePressures, AircraftRoles, Pols, Systems)

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
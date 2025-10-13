import tempfile
from http.client import responses

from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.shortcuts import render

from weasyprint import HTML, CSS
from django.template.loader import render_to_string
from django.http import HttpResponse
from datetime import datetime

from userprofile.models import (AircraftMasters,AircraftRoles,AircraftTypes,Customers,FuelTanks,ChangeOfServiceabilityLogs,
                                      EcuMasters,TyrePressures,Pols,Systems, Users, HowFoundDefects, Ranks, UserQuals)

def booklet_pdf(request):
    # Example data (normally from DB)
    entries = [
        {"open": {"id":1, "description": "Open task for Project A"},
         "closed": {"id":101, "description": "Closed task for Project A"}},
        {"open": {"id": 2, "description": "Open task for Project B"},
         "closed": {"id": 102, "description": "Closed task for Project B"}}
    ]
    # Render HTML with context
    html_string = render_to_string("part5.html", {"entries": entries})

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:594mm 210mm; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="part5.pdf"'
    return response


def aircraft_pdf(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    data = model_to_dict(aircraft1)
    aircraft_roles = AircraftRoles.objects.filter(aircraft_type_id=data["aircraft_type"]).values("role")
    # aircraft_roles_lookup = {a[aircraft_type_id]: a["role"] for a in aircraft_roles}
    # for row in data : row["role"] = aircraft_roles.role
    # print(aircraft_roles)
    engine_rows = EcuMasters.objects.filter(aircraft_master_id=data["id"]).values(
        "location", "type", "mark", "serial_no", "date_of_fitment")
    fuels_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"], type_of_pol = "F").values(
        "description", "sect_ref", "nato_code")
    olg_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"]).exclude(type_of_pol= "F").values(
        "system_id", "description", "nato_code","substitute_id", "nato_code")
    system_ids = [d ["system_id"] for d in olg_rows]
    systems = Systems.objects.filter(id__in=system_ids).values("id","system")
    system_lookup = {s["id"]: s["system"] for s in systems}
    for row in olg_rows: row["system"] = system_lookup.get(row["system_id"])


    for row in olg_rows:
        for key, value in row.items():
            if value is None:
                row[key] = "-"
    tyre_presure = TyrePressures.objects.filter(aircraft_type_id=data["aircraft_type"]).values(
        "ac_condition", "max_main", "min_main", "max_nose_tail", "min_nose_tail")

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),
            "frame_serial": data.get('airframe_serial_no'),
            "roles": "MR & IW",
        },

        "engines": engine_rows,

        "fuels": fuels_rows,
        "systems": [
            {"name": "Ext. power supply", "value": "28VDC (GPU/RED BOX)"},
        ],
        "olg": olg_rows,
        # "system": system_row,
        "basic_info": {
            "A/C Registration/ Serial No.": data.get('airframe_serial_no'),
            "Date of Acceptance": data.get('date_of_acceptance'),
            "Date of Manufacture": data.get('date_of_manufacture'),
            "Date of Expiry of TTL": data.get('expiry_of_ttl_cal'),
            "Date of Expiry of Warranty": data.get('date_of_expiry_of_warranty'),
            "Basic Weight": data.get('basic_weight'),
            "Max AUW": data.get('max_auw'),
            "Max Landing Weight": data.get('max_landing_weight'),
            "Max Combat Load": data.get('max_combat_load'),
            "Max Operating 'G' Load": data.get('max_operating_g_load'),
            "Max Fuel Capacity": data.get('max_fuel_capacity'),
            "Max Take Off Speed": data.get('max_takeoff_speed'),
            "Max Landing Speed": data.get('max_landing_speed'),
            "Max Speed": data.get('max_speed'),
        },
        "landing_gear": tyre_presure,
    }

    # Render HTML with context
    html_string = render_to_string("aircraft_form.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="aircraft_form.pdf"'
    return response

def change_of_serviceability_logs_pdf(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    data = model_to_dict(aircraft1)
    change_of_serviceability_logs_rows = ChangeOfServiceabilityLogs.objects.filter(aircraft_master_id=data["id"]).order_by("snow").values(
        "user_time_date", "airframe_hrs",
        "by_whom", "snow", "defect_code_id",
        "reason_for_placing_unserviceable",
        "work_carried_out", "how_found_defect_id"
    )
    for item in change_of_serviceability_logs_rows:
        dt_val= item['user_time_date']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['date'] = dt.date().strftime("%d-%b-%Y")
            item['time'] = dt.time().strftime("%H:%M")
        else:
            item['date'] = None
            item['time'] = None
        how_found_defect_id = item['how_found_defect_id']
        if how_found_defect_id:
            how_found_defect = HowFoundDefects.objects.get(id=how_found_defect_id).occasion
            item['how_found_defect'] = how_found_defect
        else:
            item['how_found_defect'] = None
        user_qual_id = item['by_whom']
        if user_qual_id:
            user_name_id = UserQuals.objects.get(id=user_qual_id).user_id
            if user_name_id:
                user_name = Users.objects.get(id=user_name_id).user_name
                user_pno = Users.objects.get(id=user_name_id).pno
                user_rank_id = Users.objects.get(id=user_name_id).rank_id
                user_rank = Ranks.objects.get(id=user_rank_id).abbreviation
                user_rank_of = Ranks.objects.get(id=user_rank_id).rank_of
                if user_rank_of == "O":
                    item['user_name'] = f"{user_rank} {user_name},{user_pno}"
                else:
                    item['user_name'] = f"{user_name}, {user_rank}, {user_pno}"
            else:
                item['user_name'] = None
        else:
            item['user_name'] = None

            # print(user_qual_id)
            # user_id= UserQuals.objects.get(id=user_qual_id).user_id
            # if user_id:
            #     print(user_id)
        #     if user_id:
        #         # user_rank_id = Users.objects.get(id=user_id).rank_id
        #         user_name = Users.objects.get(id=user_id).user_name
        #         user_pno = Users.objects.get(id=user_id).pno
        #         # user_rank = Ranks.objects.get(id=user_rank_id).abbreviation
        #         item['user_name'] = user_name
        #         item['user_pno'] = user_pno
        #     else:
        #         item['user_name'] = None
        #         item['user_pno'] = None
        #         # item['user_rank'] = user_rank
        # else:
        #     item['user_name'] = None
        #     item['user_pno'] = None

    # print(change_of_serviceability_logs_rows)
    # aircraft_roles = AircraftRoles.objects.filter(aircraft_type_id=data["aircraft_type"]).values(
    #     "role")
    # # aircraft_roles_lookup = {a[aircraft_type_id]: a["role"] for a in aircraft_roles}
    # # for row in data : row["role"] = aircraft_roles.role
    # print(aircraft_roles)
    # engine_rows = EcuMasters.objects.filter(aircraft_master_id=data["id"]).values(
    #     "location", "type", "mark", "serial_no", "date_of_fitment")
    # fuels_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"], type_of_pol = "F").values(
    #     "description", "sect_ref", "nato_code")
    # olg_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"]).exclude(type_of_pol= "F").values(
    #     "system_id", "description", "nato_code","substitute_id", "nato_code")
    # system_ids = [d ["system_id"] for d in olg_rows]
    # systems = Systems.objects.filter(id__in=system_ids).values("id","system")
    # system_lookup = {s["id"]: s["system"] for s in systems}
    # for row in olg_rows: row["system"] = system_lookup.get(row["system_id"])
    #
    # # print(aircraft_roles)
    # # print(fuels_rows)
    # # print(olg_rows)
    # for row in olg_rows:
    #     for key, value in row.items():
    #         if value is None:
    #             row[key] = "-"
    # tyre_presure = TyrePressures.objects.filter(aircraft_type_id=data["aircraft_type"]).values(
    #     "ac_condition", "max_main", "min_main", "max_nose_tail", "min_nose_tail")
    # print(tyre_presure)
    # print(system_row)

    # aircraft1 = AircraftMasters.objects.get(id=aircraft_master_id)
    # ------------------------------
    # Mock data (replace with DB later)
    # ------------------------------
    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),
            # "frame_serial": data.get('airframe_serial_no'),
            # "roles": "MR & IW",
        },

        "unsl": change_of_serviceability_logs_rows,
        # "engines": {
        #
        #     "location": EcuMasters.objects.get(aircraft_master_id=data["id"]).location,
        #     "type": EcuMasters.objects.get(aircraft_master_id=data["id"]).type,
        #     "mark": EcuMasters.objects.get(aircraft_master_id=data["id"]).mark,
        #     "ser_no": EcuMasters.objects.get(aircraft_master_id=data["id"]).serial_no,
        #     "stbd": {"type": "GARRETT", "mark": "TPE333-5B-252D", "ser_no": "458259", "date": "24/01/2023"},
        # },
        # "props": {
        #     "port": {"type": "HARTELL", "mark": "HCB4TN-5ML", "ser_no": "CDA 4631", "date": "24/11/2023"},
        #     "stbd": {"type": "HARTELL", "mark": "HCB4TN-5ML", "ser_no": "CDA 5071", "date": "25/11/2024"},
        # },
        # "fuels": fuels_rows,
        # "systems": [
        #     {"name": "Ext. power supply", "value": "28VDC (GPU/RED BOX)"},
        # ],
        # "olg": olg_rows,
        # # "system": system_row,
        # "basic_info": {
        #     "A/C Registration/ Serial No.": data.get('airframe_serial_no'),
        #     "Date of Acceptance": data.get('date_of_acceptance'),
        #     "Date of Manufacture": data.get('date_of_manufacture'),
        #     "Date of Expiry of TTL": data.get('expiry_of_ttl_cal'),
        #     "Date of Expiry of Warranty": data.get('date_of_expiry_of_warranty'),
        #     "Basic Weight": data.get('basic_weight'),
        #     "Max AUW": data.get('max_auw'),
        #     "Max Landing Weight": data.get('max_landing_weight'),
        #     "Max Combat Load": data.get('max_combat_load'),
        #     "Max Operating 'G' Load": data.get('max_operating_g_load'),
        #     "Max Fuel Capacity": data.get('max_fuel_capacity'),
        #     "Max Take Off Speed": data.get('max_takeoff_speed'),
        #     "Max Landing Speed": data.get('max_landing_speed'),
        #     "Max Speed": data.get('max_speed'),
        # },
        # "landing_gear": tyre_presure,
    }

    # Render HTML with context
    html_string = render_to_string("part5.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:594mm 210mm; landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MOD FORM 707.pdf"'
    return response
import io
from datetime import datetime
# from typing import io
from io import BytesIO

from django.forms.models import model_to_dict
from django.http import HttpResponse
# from weasyprint import HTML, CSS
# from pypdf import PdfReader, PdfWriter
from django.template.loader import render_to_string
from userprofile.models import (AircraftMasters, AircraftRoles, AircraftTypes, Customers, FuelTanks,
                                ChangeOfServiceabilityLogs, ChangeOfServiceabilityLogLines, Trades,
                                EcuMasters, TyrePressures, Pols, Systems, Users, HowFoundDefects, Ranks, UserQuals,
                                LimDefrDefHusLogs,
                                CompassCalibrationLogs, WeightBalance)


# def intentionally_blank_page(intentionally_blank_page):
#     if intentionally_blank_page.endswith(".html"):
#         html = HTML(filename=intentionally_blank_page)
#     else:
#         html = HTML(string=intentionally_blank_page)
#     pdf_bytes = html.write_pdf()
#     reader = PdfReader(io.BytesIO(pdf_bytes))
#     return reader.pages[0]
def get_intentionally_blank_page(width, height):
    """Generate a single-page PDF with 'Intentionally Blank Page' text using WeasyPrint"""
    html_string = f"""
    <html>
    <head>
    <style>
        @page {{size: 297mm 210mm; margin: 30mm;  }}
        body {{ display:flex; justify-content:center; align-items:center; height:{height}px; width:{width}px; font-size:50pt; font-weight:bold;}}
    </style>
    </head>
    <body >Intentionally Left Blank</body>
    </html>
    """
    pdf_bytes = HTML(string=html_string).write_pdf()
    # return PdfReader(bytes(pdf_bytes)).pages[0]
    return PdfReader(BytesIO(pdf_bytes)).pages[0]


def booklet_pdf(request):
    # Example data (normally from DB)
    entries = [
        {"open": {"id": 1, "description": "Open task for Project A"},
         "closed": {"id": 101, "description": "Closed task for Project A"}},
        {"open": {"id": 2, "description": "Open task for Project B"},
         "closed": {"id": 102, "description": "Closed task for Project B"}}
    ]
    # Render HTML with context
    html_string = render_to_string("MOD FORM 707.html", {"entries": entries})

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:594mm 210mm; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MOD FORM 707.pdf"'
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
    fuels_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"], type_of_pol="F").values(
        "description", "sect_ref", "nato_code")
    olg_rows = Pols.objects.filter(aircraft_type_id=data["aircraft_type"]).exclude(type_of_pol="F").values(
        "system_id", "description", "nato_code", "substitute_id", "nato_code")
    system_ids = [d["system_id"] for d in olg_rows]
    systems = Systems.objects.filter(id__in=system_ids).values("id", "system")
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
    html_string = render_to_string("MOD FORM 701.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MOD FORM 701.pdf"'
    return response


def change_of_serviceability_logs_pdf(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    data = model_to_dict(aircraft1)
    change_of_serviceability_logs_rows = ChangeOfServiceabilityLogs.objects.filter(aircraft_master_id=data["id"],
                                                                                   snow__isnull=False,
                                                                                   user_time_date__isnull=False,
                                                                                   # id ='202520326'
                                                                                   ).order_by("snow").values(
        "id", "user_time_date", "airframe_hrs",
        "by_whom", "snow", "defect_code_id",
        "reason_for_placing_unserviceable",
        "work_carried_out", "how_found_defect_id",
        "man_hrs", "user_completion_date", "authorised_by_id", "status"
    )
    change_of_serviceability_log_id = [d["id"] for d in change_of_serviceability_logs_rows]
    addresses = ChangeOfServiceabilityLogLines.objects.filter(
        change_of_serviceability_log_id__in=change_of_serviceability_log_id, cleared_yn="Y",
        tradesman_sup='TDS').values("change_of_serviceability_log_id", "trade_id", "user_qual_id", "tradesman_sup")
    # print(addresses)
    for cust in change_of_serviceability_logs_rows.values():
        cust["tradesman"] = []
    for addr in addresses:
        cid = addr["change_of_serviceability_log_id"]
        if cid in change_of_serviceability_logs_rows:
            change_of_serviceability_logs_rows[cid]["addresses"].append(addr)
    # print(change_of_serviceability_logs_rows)
    for item in change_of_serviceability_logs_rows:
        # change_of_serviceability_log_id = [d["id"] for d in change_of_serviceability_logs_rows]
        # # systems = Systems.objects.filter(id__in=system_ids).values("id", "system")
        # tradesman = ChangeOfServiceabilityLogLines.objects.filter(change_of_serviceability_log_id__in=change_of_serviceability_log_id, cleared_yn = "Y", tradesman_sup = 'TDS').values("change_of_serviceability_log_id", "trade_id", "user_qual_id", "tradesman_sup")
        # print(tradesman)
        # # system_lookup = {s["id"]: s["system"] for s in systems}
        # system_lookup = {s["change_of_serviceability_log_id"]: s["tradesman_sup"] for s in tradesman}
        # for row in change_of_serviceability_logs_rows: row["tradesman_sup"] = system_lookup.get(row["id"])
        # system_lookup = {s["change_of_serviceability_log_id"]: s["trade_id"] for s in tradesman}
        # for row in change_of_serviceability_logs_rows: row["trade_id"] = system_lookup.get(row["id"])
        # # change_of_serviceability_log_id = item["id"]
        # # tradesman = ChangeOfServiceabilityLogLines.objects.filter(change_of_serviceability_log_id=change_of_serviceability_log_id, cleared_yn = "Y", tradesman_sup = 'TDS').values(
        # #     "change_of_serviceability_log_id", "trade_id", "user_qual_id", "tradesman_sup"
        # # )
        # # if len(tradesman) > 0:

        status = item["status"]
        if status == "0":
            item["eie"] = "  E.I.E"
        else:
            item["eie"] = ""

        man_hrs = item['man_hrs']
        if man_hrs is None:
            man_hrs = ""
            item['man_hrs'] = man_hrs

        defect_code_id = item['defect_code_id']
        if defect_code_id is None:
            defect_code_id = ""
            item['defect_code_id'] = defect_code_id

        work_carried_out = item['work_carried_out']
        if work_carried_out is None:
            work_carried_out = ""
            item['work_carried_out'] = work_carried_out

        dt_val = item['user_time_date']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['date'] = f"{dt.time().strftime("%H:%M")} {dt.date().strftime("%d-%m-%Y")}"
        else:
            item['date'] = ""

        user_completion_date = item['user_completion_date']
        if user_completion_date:
            dt = datetime.fromisoformat(str(user_completion_date))
            item['user_completion_date'] = f"{dt.time().strftime("%H:%M")} /  {dt.date().strftime("%d-%m-%Y")}"
        else:
            item['user_completion_date'] = ""

        how_found_defect_id = item['how_found_defect_id']
        if how_found_defect_id:
            how_found_defect = HowFoundDefects.objects.get(id=how_found_defect_id).occasion
            item['how_found_defect'] = how_found_defect
        else:
            item['how_found_defect'] = ""
        user_qual_id = item['by_whom']
        if user_qual_id:
            user_name_id = UserQuals.objects.get(id=user_qual_id).user_id
            if user_name_id:
                user_name = Users.objects.get(id=user_name_id).user_name
                user_pno = Users.objects.get(id=user_name_id).pno
                item['user_name'] = f"{user_name} , {user_pno}"
            else:
                item['user_name'] = ""
        else:
            item['user_name'] = ""

        authorised_by_id = item['authorised_by_id']
        if authorised_by_id:
            authorised_by_name_id = UserQuals.objects.get(id=authorised_by_id).user_id
            if authorised_by_name_id:
                authorised_by_name = Users.objects.get(id=authorised_by_name_id).user_name
                authorised_by_pno = Users.objects.get(id=authorised_by_name_id).pno
                item['authorised_by'] = f"{authorised_by_name} , {authorised_by_pno}"
            else:
                item['authorised_by'] = ""
        else:
            item['authorised_by'] = ""

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),
        },

        "unsl": change_of_serviceability_logs_rows,

    }

    # Render HTML with context
    html_string = render_to_string("MOD FORM 707.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_bytes = html.write_pdf(
        stylesheets=[CSS(string='@page{size:594mm 210mm; landscape; margin:5mm;}')]
    )
    # Split wide pages
    reader = PdfReader(io.BytesIO(pdf_bytes))
    writer = PdfWriter()
    first_page = reader.pages[0]
    width = float(first_page.mediabox.width)
    height = float(first_page.mediabox.height)
    blank_page = get_intentionally_blank_page(width / 2, height)
    writer.add_page(blank_page)
    # writer.add_blank_page(width=width / 2, height=height)
    # writer (width=width / 2, height=height) == intentionally_blank_page("intentionally_blank_page.html")
    for page in reader.pages:
        width = float(page.mediabox.width if hasattr(page.mediabox, 'width') else page.mediabox[2])
        height = float(page.mediabox.height if hasattr(page.mediabox, 'height') else page.mediabox[3])
        left_page = page
        left_page.mediabox.lower_left = (0, 0)
        left_page.mediabox.upper_right = (width / 2, height)
        writer.add_page(left_page)

        right_page = page
        right_page.mediabox.lower_left = (width / 2, 0)
        right_page.mediabox.upper_right = (width, height)
        writer.add_page(right_page)

    output_pdf = io.BytesIO()
    writer.write(output_pdf)
    output_pdf.seek(0)

    # Return as downloadable PDF
    response = HttpResponse(output_pdf, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MOD FORM 707.pdf"'
    return response


def Mod703B(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    data = model_to_dict(aircraft1)

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 703B.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="Mod703B.pdf"'
    return response


def MODForm712A(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    data = model_to_dict(aircraft1)
    compass_calibration_logs_row = CompassCalibrationLogs.objects.filter(aircraft_master_id=data["id"]).order_by(
        "id").values(
        "id", "ap_reference", "compass_swing_date", "due_date", "ref_snow", "compass_type", "compass_ser_no", "place",
        "method",
        "actual_north", "actual_south", "actual_east", "actual_west", "a_c_north", "a_c_south", "a_c_east", "a_c_west",
        "a_c_north_east", "a_c_north_west", "a_c_south_east", "a_c_south_west", "coeff_a", "coeff_b", "coeff_c")
    heading_compass_row = CompassCalibrationLogs.objects.filter(aircraft_master_id=data["id"]).order_by("-id").values(
        "id", "ap_reference", "compass_swing_date", "due_date", "ref_snow", "place", "method", )
    latest_compass_row = heading_compass_row[0]
    print(compass_calibration_logs_row)
    print(latest_compass_row)

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        "compass_calibration_logs": compass_calibration_logs_row,
        "latest_compass_row": latest_compass_row,

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 712A.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm712A.pdf"'
    return response


def MODForm702(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    print(id)
    data = model_to_dict(aircraft1)
    weight_balance_rows = WeightBalance.objects.filter(aircraft_master_id=data["id"]).order_by("snow").values(
        "date_authenticated", "snow", "weighing_change_mod", "weight_increased", "weight_decreased", "long_increased",
        "long_decreased", "lat_vert_increased", "lat_vert_decreased",
        "corrected_weight", "corrected_cg_long", "corrected_cg_lat", "corrected_moment_long", "corrected_moment_lat",
        "authenticated_by_id"
    )
    for item in weight_balance_rows:
        dt_val = item['date_authenticated']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['date_authenticated'] = f"{dt.date().strftime("%d-%m-%Y")}"
        else:
            item['date_authenticated'] = ""
        inc_weight = item['weight_increased']
        if inc_weight:
            item['weight_increased'] = f"{inc_weight}"
            inc_weight_symbol = "+"
            item['inc_weight_symbol'] = inc_weight_symbol
        else:
            inc_weight = item['weight_decreased']
            if inc_weight:
                inc_weight_symbol = "-"
                item['weight_increased'] = f"{inc_weight}"
                item['inc_weight_symbol'] = inc_weight_symbol
            else:
                item['weight_increased'] = ""
                item['inc_weight_symbol'] = ""
        inc_long = item['long_increased']
        if inc_long:
            item['long_increased'] = f"{inc_long}"
            inc_long_symbol = "+"
            item['inc_long_symbol'] = inc_long_symbol
        else:
            inc_long = item['long_decreased']
            if inc_long:
                inc_long_symbol = "-"
                item['long_increased'] = f"{inc_long}"
                item['inc_long_symbol'] = inc_long_symbol
            else:
                item['long_increased'] = ""
                item['inc_long_symbol'] = ""
        inc_lat = item['lat_vert_increased']
        if inc_lat:
            item['lat_vert_increased'] = f"{inc_lat}"
            inc_lat_symbol = "+"
            item['inc_lat_symbol'] = inc_lat_symbol
        else:
            inc_lat = item['lat_vert_decreased']
            if inc_lat:
                inc_lat_symbol = "-"
                item['inc_lat_symbol'] = inc_lat_symbol
                item['lat_vert_increased'] = f"{inc_lat}"
            else:
                item['inc_lat_symbol'] = ""
                item['lat_vert_increased'] = ""
        authenticated_by_id = item['authenticated_by_id']
        if authenticated_by_id:
            authorised_by_name_id = UserQuals.objects.get(id=authenticated_by_id).user_id
            if authorised_by_name_id:
                authorised_by_name = Users.objects.get(id=authorised_by_name_id).user_name
                authorised_by_pno = Users.objects.get(id=authorised_by_name_id).pno
                item['authenticated_by'] = f"{authorised_by_name} , {authorised_by_pno}"
            else:
                item['authenticated_by'] = ""
        else:
            item['authenticated_by'] = ""

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        "weight_balance_rows": weight_balance_rows,
        # "compass_calibration_logs": compass_calibration_logs_row,
        # "latest_compass_row": latest_compass_row,

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 702.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm702.pdf"'
    return response


def MODForm710(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    print(id)
    data = model_to_dict(aircraft1)
    # weight_balance_rows = WeightBalance.objects.filter(aircraft_master_id=data["id"]).order_by("snow").values(
    #     "date_authenticated", "snow","weighing_change_mod","weight_increased", "weight_decreased","long_increased", "long_decreased","lat_vert_increased", "lat_vert_decreased",
    #     "corrected_weight", "corrected_cg_long","corrected_cg_lat","corrected_moment_long","corrected_moment_lat","authenticated_by_id"
    # )
    # for item in weight_balance_rows:
    #     dt_val = item['date_authenticated']
    #     if dt_val:
    #         dt = datetime.fromisoformat(str(dt_val))
    #         item['date_authenticated'] = f"{dt.date().strftime("%d-%m-%Y")}"
    #         # item['date'] = dt.date().strftime("%d-%b-%Y")
    #         # item['time'] = dt.time().strftime("%H:%M")
    #     else:
    #         item['date_authenticated'] = ""
    #     inc_weight= item['weight_increased']
    #     if inc_weight:
    #         item['weight_increased'] = f"{inc_weight}"
    #         inc_weight_symbol = "+"
    #         item['inc_weight_symbol'] = inc_weight_symbol
    #     else:
    #         inc_weight = item['weight_decreased']
    #         if inc_weight:
    #             inc_weight_symbol = "-"
    #             item['weight_increased'] = f"{inc_weight}"
    #             item['inc_weight_symbol'] = inc_weight_symbol
    #         else:
    #             item['weight_increased'] = ""
    #             item['inc_weight_symbol'] = ""
    #     inc_long = item['long_increased']
    #     if inc_long:
    #         item['long_increased'] = f"{inc_long}"
    #         inc_long_symbol = "+"
    #         item['inc_long_symbol'] = inc_long_symbol
    #     else:
    #         inc_long = item['long_decreased']
    #         if inc_long:
    #             inc_long_symbol = "-"
    #             item['long_increased'] = f"{inc_long}"
    #             item['inc_long_symbol'] = inc_long_symbol
    #         else:
    #             item['long_increased'] = ""
    #             item['inc_long_symbol'] = ""
    #     inc_lat = item['lat_vert_increased']
    #     if inc_lat:
    #         item['lat_vert_increased'] = f"{inc_lat}"
    #         inc_lat_symbol = "+"
    #         item['inc_lat_symbol'] = inc_lat_symbol
    #     else:
    #         inc_lat = item['lat_vert_decreased']
    #         if inc_lat:
    #             inc_lat_symbol = "-"
    #             item['inc_lat_symbol'] = inc_lat_symbol
    #             item['lat_vert_increased'] = f"{inc_lat}"
    #         else:
    #             item['inc_lat_symbol'] = ""
    #             item['lat_vert_increased'] = ""

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        # "weight_balance_rows": weight_balance_rows,

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 710.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm710.pdf"'
    return response


def MODForm703(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    print(id)
    data = model_to_dict(aircraft1)
    limitation_logs = LimDefrDefHusLogs.objects.filter(aircraft_master_id=data["id"], limitations_yn='Y').order_by(
        "change_of_serviceability_log_id").values(
        "id", "deferred_until", "main_system_id", "change_of_serviceability_log_id", "demand_id", "ldh_no",
    )
    for item in limitation_logs:
        change_of_serviceability_log_id = item['change_of_serviceability_log_id']
        if change_of_serviceability_log_id:
            snow = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).snow
            airframe_hrs = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).airframe_hrs
            reason_for_placing_unserviceable = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).reason_for_placing_unserviceable
            user_time_date = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).user_time_date
            user_completion_date = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).user_completion_date
            authorised_by_id = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).authorised_by_id
            item['snow'] = snow
            item['airframe_hrs'] = airframe_hrs
            item['reason_for_placing_unserviceable'] = reason_for_placing_unserviceable
            item['user_time_date'] = user_time_date
            item['user_completion_date'] = user_completion_date
            item['authorised_by_id'] = authorised_by_id
        else:
            item['snow'] = ""
            item['airframe_hrs'] = ""
            item['reason_for_placing_unserviceable'] = ""
            item['user_time_date'] = ""
            item['user_completion_date'] = ""
            item['authorised_by_id'] = ""
        dt_val = item['user_time_date']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['user_date'] = f" {dt.date().strftime("%d-%m-%Y")}"
            item['user_time_date'] = f"{dt.time().strftime("%H:%M")} {dt.date().strftime("%d-%m-%Y")}"
        else:
            item['user_date'] = ""
            item['user_time_date'] = ""

        authorised_by_id = item['authorised_by_id']
        if authorised_by_id:
            authorised_by_name_id = UserQuals.objects.get(id=authorised_by_id).user_id
            if authorised_by_name_id:
                authorised_by_name = Users.objects.get(id=authorised_by_name_id).user_name
                authorised_by_pno = Users.objects.get(id=authorised_by_name_id).pno
                item['authorised_by_name'] = f"{authorised_by_name} "
                item['authorised_by_pno'] = f"{authorised_by_pno}"
                user_rank_id = Users.objects.get(id=authorised_by_name_id).rank_id
                user_rank = Ranks.objects.get(id=user_rank_id).abbreviation
                user_rank_of = Ranks.objects.get(id=user_rank_id).rank_of
                if user_rank_of == "O":
                    item['authorised_by_rank'] = f"{user_rank}"
                else:
                    item['authorised_by_rank'] = ""
            else:
                item['authorised_by_name'] = ""
                item['authorised_by_pno'] = ""
                item['authorised_by_rank'] = ""
        else:
            item['authorised_by_name'] = ""
            item['authorised_by_pno'] = ""
            item['authorised_by_rank'] = ""
        deferred_until = item['deferred_until']
        if deferred_until:
            item['deferred_until'] = f"{deferred_until}"
        else:
            item['deferred_until'] = ""

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        # "weight_balance_rows": weight_balance_rows,
        "limitation_logs": limitation_logs,

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 703.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm703.pdf"'
    return response


def MODForm704(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    print(id)
    data = model_to_dict(aircraft1)
    deferred_defect_logs = LimDefrDefHusLogs.objects.filter(aircraft_master_id=data["id"],
                                                            deferred_defects_yn='Y').order_by(
        "change_of_serviceability_log_id").values(
        "id", "deferred_until", "main_system_id", "change_of_serviceability_log_id", "demand_id", "ldh_no",
    )
    for item in deferred_defect_logs:
        change_of_serviceability_log_id = item['change_of_serviceability_log_id']
        if change_of_serviceability_log_id:
            snow = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).snow
            airframe_hrs = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).airframe_hrs
            reason_for_placing_unserviceable = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).reason_for_placing_unserviceable
            user_time_date = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).user_time_date
            user_completion_date = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).user_completion_date
            authorised_by_id = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).authorised_by_id
            item['snow'] = snow
            item['airframe_hrs'] = airframe_hrs
            item['reason_for_placing_unserviceable'] = reason_for_placing_unserviceable
            item['user_time_date'] = user_time_date
            item['user_completion_date'] = user_completion_date
            item['authorised_by_id'] = authorised_by_id
        else:
            item['snow'] = ""
            item['airframe_hrs'] = ""
            item['reason_for_placing_unserviceable'] = ""
            item['user_time_date'] = ""
            item['user_completion_date'] = ""
            item['authorised_by_id'] = ""
        dt_val = item['user_time_date']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['user_date'] = f" {dt.date().strftime("%d-%m-%Y")}"
            item['user_time_date'] = f"{dt.time().strftime("%H:%M")} {dt.date().strftime("%d-%m-%Y")}"
        else:
            item['user_date'] = ""
            item['user_time_date'] = ""

        authorised_by_id = item['authorised_by_id']
        if authorised_by_id:
            authorised_by_name_id = UserQuals.objects.get(id=authorised_by_id).user_id
            if authorised_by_name_id:
                authorised_by_name = Users.objects.get(id=authorised_by_name_id).user_name
                authorised_by_pno = Users.objects.get(id=authorised_by_name_id).pno
                item['authorised_by_name'] = f"{authorised_by_name} "
                item['authorised_by_pno'] = f"{authorised_by_pno}"
                user_rank_id = Users.objects.get(id=authorised_by_name_id).rank_id
                user_rank = Ranks.objects.get(id=user_rank_id).abbreviation
                user_rank_of = Ranks.objects.get(id=user_rank_id).rank_of
                if user_rank_of == "O":
                    item['authorised_by_rank'] = f"{user_rank}"
                else:
                    item['authorised_by_rank'] = ""
            else:
                item['authorised_by_name'] = ""
                item['authorised_by_pno'] = ""
                item['authorised_by_rank'] = ""
        else:
            item['authorised_by_name'] = ""
            item['authorised_by_pno'] = ""
            item['authorised_by_rank'] = ""
        deferred_until = item['deferred_until']
        if deferred_until:
            item['deferred_until'] = f"{deferred_until}"
        else:
            item['deferred_until'] = ""

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        # "weight_balance_rows": weight_balance_rows,
        "deferred_defect_logs": deferred_defect_logs,

    }

    # Render HTML with context
    html_string = render_to_string("MOD Form 704.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm704.pdf"'
    return response


def MODForm704A(request, id):
    aircraft1 = AircraftMasters.objects.get(id=id)
    print(id)
    data = model_to_dict(aircraft1)
    husbandry_defect_logs = LimDefrDefHusLogs.objects.filter(aircraft_master_id=data["id"],
                                                             husbandry_yn='Y').order_by(
        "change_of_serviceability_log_id").values(
        "id", "deferred_until", "main_system_id", "change_of_serviceability_log_id", "demand_id", "ldh_no",
    )
    for item in husbandry_defect_logs:
        change_of_serviceability_log_id = item['change_of_serviceability_log_id']
        if change_of_serviceability_log_id:
            snow = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).snow
            by_whom = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).by_whom_id
            # by_whom = by_whom.
            airframe_hrs = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).airframe_hrs
            reason_for_placing_unserviceable = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).reason_for_placing_unserviceable
            user_time_date = ChangeOfServiceabilityLogs.objects.get(id=change_of_serviceability_log_id).user_time_date
            user_completion_date = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).user_completion_date
            authorised_by_id = ChangeOfServiceabilityLogs.objects.get(
                id=change_of_serviceability_log_id).authorised_by_id
            item['snow'] = snow
            item['by_whom'] = by_whom
            item['airframe_hrs'] = airframe_hrs
            item['reason_for_placing_unserviceable'] = reason_for_placing_unserviceable
            item['user_time_date'] = user_time_date
            item['user_completion_date'] = user_completion_date
            item['authorised_by_id'] = authorised_by_id
        else:
            item['snow'] = ""
            item['by_whom'] = ""
            item['airframe_hrs'] = ""
            item['reason_for_placing_unserviceable'] = ""
            item['user_time_date'] = ""
            item['user_completion_date'] = ""
            item['authorised_by_id'] = ""
        user_qual_id = item['by_whom']
        if user_qual_id:
            user_name_id = UserQuals.objects.get(id=user_qual_id).user_id
            if user_name_id:
                user_name = Users.objects.get(id=user_name_id).user_name
                user_pno = Users.objects.get(id=user_name_id).pno
                item['by_whom'] = f"{user_name} , {user_pno}"
            else:
                item['by_whom'] = ""
        else:
            item['by_whom'] = ""

        dt_val = item['user_time_date']
        if dt_val:
            dt = datetime.fromisoformat(str(dt_val))
            item['user_date'] = f" {dt.date().strftime("%d-%m-%Y")}"
            item['user_time_date'] = f"{dt.time().strftime("%H:%M")} {dt.date().strftime("%d-%m-%Y")}"
        else:
            item['user_date'] = ""
            item['user_time_date'] = ""

        authorised_by_id = item['authorised_by_id']
        if authorised_by_id:
            authorised_by_name_id = UserQuals.objects.get(id=authorised_by_id).user_id
            if authorised_by_name_id:
                authorised_by_name = Users.objects.get(id=authorised_by_name_id).user_name
                authorised_by_pno = Users.objects.get(id=authorised_by_name_id).pno
                item['authorised_by_name'] = f"{authorised_by_name} "
                item['authorised_by_pno'] = f"{authorised_by_pno}"
                user_rank_id = Users.objects.get(id=authorised_by_name_id).rank_id
                user_rank = Ranks.objects.get(id=user_rank_id).abbreviation
                user_rank_of = Ranks.objects.get(id=user_rank_id).rank_of
                if user_rank_of == "O":
                    item['authorised_by_rank'] = f"{user_rank}"
                else:
                    item['authorised_by_rank'] = ""
            else:
                item['authorised_by_name'] = ""
                item['authorised_by_pno'] = ""
                item['authorised_by_rank'] = ""
        else:
            item['authorised_by_name'] = ""
            item['authorised_by_pno'] = ""
            item['authorised_by_rank'] = ""
        deferred_until = item['deferred_until']
        if deferred_until:
            item['deferred_until'] = f"{deferred_until}"
        else:
            item['deferred_until'] = ""

        for idx, item in enumerate(husbandry_defect_logs, start=1):
            item['serial_no'] = idx
        print(husbandry_defect_logs)

    context = {
        "aircraft": {
            "type": AircraftTypes.objects.get(id=data["aircraft_type"]).aircraft_name,
            "mark": data.get('aircraft_mark'),
            "serial_no": data.get('airframe_serial_no'),

        },
        # "weight_balance_rows": weight_balance_rows,
        "husbandry_defect_logs": husbandry_defect_logs,

    }
    # Render HTML with context
    html_string = render_to_string("MOD Form 704A.html", context)

    # Convert HTML → PDF
    html = HTML(string=html_string)
    pdf_file = html.write_pdf(
        stylesheets=[CSS(string='@page{size:a4 landscape; margin:5mm;}')]
    )

    # Return as downloadable PDF
    response = HttpResponse(pdf_file, content_type="application/pdf")
    response['Content-Disposition'] = 'inline; filename="MODForm704A.pdf"'
    return response

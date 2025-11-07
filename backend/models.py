# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AircraftMasters(models.Model):
    id = models.BigIntegerField(primary_key=True)
    side_no = models.CharField()
    aircraft_mark = models.CharField(blank=True, null=True)
    customer = models.ForeignKey('Customers', models.DO_NOTHING, blank=True, null=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    airframe_serial_no = models.CharField(blank=True, null=True)
    date_of_acceptance = models.DateField(blank=True, null=True)
    date_of_manufacture = models.DateField(blank=True, null=True)
    expiry_of_ttl_cal = models.DateField(blank=True, null=True)
    date_of_expiry_of_warranty = models.DateField(blank=True, null=True)
    basic_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_auw = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_landing_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_combat_load = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_operating_g_load = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_fuel_capacity = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_takeoff_speed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    max_landing_speed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)
    max_speed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    expiry_of_ttl_hrs = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    empty_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    total_airframe_hrs = models.BigIntegerField(blank=True, null=True)
    last_snow_no = models.BigIntegerField(blank=True, null=True)
    airframe_hrs = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aircraft_masters'


class AircraftRoles(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    role = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aircraft_roles'


class AircraftStations(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    description = models.CharField(blank=True, null=True)
    position = models.CharField(blank=True, null=True)
    station_number = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aircraft_stations'


class AircraftTypes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    ac_type = models.CharField(max_length=6, blank=True, null=True)
    aircraft_name = models.CharField(max_length=30, blank=True, null=True)
    no_of_ecu = models.CharField(max_length=6, blank=True, null=True)
    ac_sketch = models.BinaryField(blank=True, null=True)
    fuel_denomination = models.CharField(blank=True, null=True)
    speed_denomination = models.CharField(blank=True, null=True)
    pressure_denomination = models.CharField(blank=True, null=True)
    weight_denomination = models.CharField(blank=True, null=True)
    oleo_pressure_main = models.CharField(blank=True, null=True)
    oleo_pressure_nose = models.CharField(blank=True, null=True)
    total_stations = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aircraft_types'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class ChangeOfServiceabilityLogLines(models.Model):
    id = models.BigIntegerField(primary_key=True)
    change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING)
    trade = models.ForeignKey('Trades', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    date_cleared = models.TimeField(blank=True, null=True)
    tradesman_sup = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'change_of_serviceability_log_lines'


class ChangeOfServiceabilityLogs(models.Model):
    id = models.BigAutoField(primary_key=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    airframe_hrs = models.CharField(blank=True, null=True)
    by_whom = models.BigIntegerField(blank=True, null=True)
    reason_for_placing_unserviceable = models.CharField(blank=True, null=True)
    work_carried_out = models.CharField(blank=True, null=True)
    authenticated_by_id = models.BigIntegerField(blank=True, null=True)
    man_hrs = models.CharField(blank=True, null=True)
    system_time_date = models.DateTimeField(blank=True, null=True)
    user_time_date = models.CharField(blank=True, null=True)
    snow = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    defect_code_id = models.BigIntegerField(blank=True, null=True)
    how_found_defect = models.ForeignKey('HowFoundDefects', models.DO_NOTHING, blank=True, null=True)
    system_completion_date = models.DateTimeField(blank=True, null=True)
    user_completion_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)
    supervisor_id = models.BigIntegerField(blank=True, null=True)
    entry_type = models.ForeignKey('EntryTypes', models.DO_NOTHING, blank=True, null=True)
    pull = models.ForeignKey('Pulls', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'change_of_serviceability_logs'


class CompassCalibrationLogs(models.Model):
    id = models.BigIntegerField(primary_key=True)
    ap_reference = models.CharField(blank=True, null=True)
    aircraft_master = models.ForeignKey(AircraftMasters, models.DO_NOTHING, blank=True, null=True)
    compass_swing_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    ref_snow = models.BigIntegerField(blank=True, null=True)
    compass_type = models.ForeignKey('Items', models.DO_NOTHING, db_column='compass_type', blank=True, null=True)
    compass_ser_no = models.ForeignKey('ItemSerials', models.DO_NOTHING, db_column='compass_ser_no', blank=True,
                                       null=True)
    place = models.ForeignKey('Customers', models.DO_NOTHING, db_column='place', blank=True, null=True)
    method = models.ForeignKey('HowFoundDefects', models.DO_NOTHING, db_column='method', blank=True, null=True)
    actual_north = models.BigIntegerField(blank=True, null=True)
    actual_south = models.BigIntegerField(blank=True, null=True)
    actual_east = models.BigIntegerField(blank=True, null=True)
    actual_west = models.BigIntegerField(blank=True, null=True)
    a_c_north = models.CharField(blank=True, null=True)
    a_c_north_east = models.CharField(blank=True, null=True)
    a_c_north_west = models.CharField(blank=True, null=True)
    a_c_south = models.CharField(blank=True, null=True)
    a_c_south_east = models.CharField(blank=True, null=True)
    a_c_south_west = models.CharField(blank=True, null=True)
    a_c_east = models.CharField(blank=True, null=True)
    a_c_west = models.CharField(blank=True, null=True)
    coeff_a = models.BigIntegerField(blank=True, null=True)
    coeff_b = models.BigIntegerField(blank=True, null=True)
    coeff_c = models.BigIntegerField(blank=True, null=True)
    change_of_serviceability_log = models.ForeignKey(ChangeOfServiceabilityLogs, models.DO_NOTHING, blank=True,
                                                     null=True)
    remarks = models.CharField(blank=True, null=True)
    pull = models.ForeignKey('Pulls', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'compass_calibration_logs'


class CurrentOperatingDataWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    basic_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    basic_long_moment = models.CharField(blank=True, null=True)
    basic_lat_vert_moment = models.CharField(blank=True, null=True)
    weight_item_removed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_moment_item_removed = models.CharField(blank=True, null=True)
    lat_vert_item_removed = models.CharField(blank=True, null=True)
    weight_item_fitted = models.DecimalField(db_column='weight_item-fitted', max_digits=65535, decimal_places=65535,
                                             blank=True, null=True)  # Field renamed to remove unsuitable characters.
    long_moment_item_fitted = models.CharField(blank=True, null=True)
    lat_vert_item_fitted = models.CharField(blank=True, null=True)
    current_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    current_long_moment = models.CharField(blank=True, null=True)
    current_lat_vert = models.CharField(blank=True, null=True)
    current_cg_long = models.CharField(blank=True, null=True)
    current_cg_lat_vert = models.CharField(blank=True, null=True)
    percentange_mac = models.CharField(blank=True, null=True)
    authenticated_by = models.BigIntegerField(blank=True, null=True)
    date_authenticated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'current_operating_data_wb'


class Customers(models.Model):
    id = models.BigIntegerField(primary_key=True)
    customer_name = models.CharField(max_length=40)
    sub_customer_name = models.CharField(max_length=40)
    customer_type = models.CharField(max_length=3)
    cust_prefix = models.CharField(max_length=6, blank=True, null=True)
    addressee = models.CharField(max_length=30, blank=True, null=True)
    address_line1 = models.CharField(max_length=30, blank=True, null=True)
    address_line2 = models.CharField(max_length=30, blank=True, null=True)
    address_line3 = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=20, blank=True, null=True)
    pin = models.CharField(max_length=6, blank=True, null=True)
    parent_unit_id = models.BigIntegerField(blank=True, null=True)
    remarks = models.CharField(max_length=100, blank=True, null=True)
    active_yn = models.CharField(max_length=1)
    repair_agency = models.CharField(max_length=1, blank=True, null=True)
    dba_remarks = models.CharField(max_length=250, blank=True, null=True)
    date_dba_remarks = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customers'


class DefectTypes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    defect_details = models.CharField(blank=True, null=True)
    defer_defect_yn = models.CharField(blank=True, null=True)
    limitation_defect_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'defect_types'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class EcuMasters(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    type = models.CharField(blank=True, null=True)
    mark = models.CharField(blank=True, null=True)
    serial_no = models.CharField(blank=True, null=True)
    date_of_fitment = models.DateField(blank=True, null=True)
    date_of_removal = models.DateField(blank=True, null=True)
    customer_id = models.BigIntegerField(blank=True, null=True)
    fitted_by_id = models.BigIntegerField(blank=True, null=True)
    removed_by_id = models.BigIntegerField(blank=True, null=True)
    location = models.CharField(blank=True, null=True)
    identifier = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ecu_masters'


class EntryTypes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    occasion = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'entry_types'


class FuelTanks(models.Model):
    id = models.BigIntegerField(primary_key=True)
    tank_group = models.CharField(blank=True, null=True)
    capacity = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    expansion_2_field = models.CharField(db_column='EXPANSION_2%', blank=True,
                                         null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    expansion_3_field = models.CharField(db_column='EXPANSION_3%', blank=True,
                                         null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.

    class Meta:
        managed = False
        db_table = 'fuel_tanks'


class HowFoundDefects(models.Model):
    id = models.BigIntegerField(primary_key=True)
    occasion = models.CharField(max_length=50, blank=True, null=True)
    user_type = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'how_found_defects'


class InapReferences(models.Model):
    id = models.BigIntegerField(primary_key=True)
    inap_serial_no = models.CharField(max_length=30, blank=True, null=True)
    inap_reference = models.CharField(max_length=30, blank=True, null=True)
    inap_chapter = models.CharField(max_length=30, blank=True, null=True)
    inap_figure = models.CharField(max_length=20, blank=True, null=True)
    inap_item = models.CharField(max_length=15, blank=True, null=True)
    item_id = models.BigIntegerField(blank=True, null=True)
    aircraft_type = models.BigIntegerField(blank=True, null=True)
    system = models.CharField(max_length=100, blank=True, null=True)
    qty_fitted = models.BigIntegerField(blank=True, null=True)
    approved_by_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inap_references'


class ItemSerialTrails(models.Model):
    id = models.BigIntegerField()
    part_number = models.CharField(max_length=100, blank=True, null=True)
    item_id_old = models.BigIntegerField(blank=True, null=True)
    item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    in_use = models.CharField(max_length=2, blank=True, null=True)
    check_item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    item_serial_id_old = models.BigIntegerField(blank=True, null=True)
    aircraft_type = models.BigIntegerField(blank=True, null=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    customer_id = models.BigIntegerField(blank=True, null=True)
    item_serial_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_serial_trails'


class ItemSerials(models.Model):
    id = models.BigIntegerField(primary_key=True)
    part_number = models.CharField(max_length=100, blank=True, null=True)
    item_id_old = models.BigIntegerField(blank=True, null=True)
    item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    in_use = models.CharField(max_length=2, blank=True, null=True)
    check_item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    item_serial_id_old = models.BigIntegerField(blank=True, null=True)
    aircraft_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)
    aircraft_master = models.ForeignKey(AircraftMasters, models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_serials'


class Items(models.Model):
    id = models.BigIntegerField(primary_key=True)
    old_item_id = models.BigIntegerField(blank=True, null=True)
    part_number = models.CharField(max_length=100, blank=True, null=True)
    aircraft_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)
    denomination = models.CharField(max_length=5, blank=True, null=True)
    cpq_category = models.CharField(max_length=5, blank=True, null=True)
    description = models.CharField(max_length=200, blank=True, null=True)
    logcard_yn = models.CharField(max_length=1, blank=True, null=True)
    check_part_no = models.CharField(max_length=40, blank=True, null=True)
    active_yn = models.CharField(max_length=1, blank=True, null=True)
    lifed_item_yn = models.CharField(max_length=1, blank=True, null=True)
    qty_per_ac = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    dba_remarks = models.CharField(max_length=250, blank=True, null=True)
    date_dba_remarks = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'items'


class LimDefrDefLogs(models.Model):
    id = models.BigIntegerField(blank=True, null=True)
    sysdate = models.DateTimeField(blank=True, null=True)
    user_date = models.DateTimeField(blank=True, null=True)
    airframe_hours = models.CharField(max_length=50, blank=True, null=True)
    item_id = models.BigIntegerField(blank=True, null=True)
    lim_def_removal_by_id = models.BigIntegerField(blank=True, null=True)
    limitations_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_defects_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_until = models.CharField(max_length=50, blank=True, null=True)
    defect_removal_snow = models.CharField(max_length=50, blank=True, null=True)
    snow = models.CharField(max_length=50, blank=True, null=True)
    main_system_id = models.BigIntegerField(blank=True, null=True)
    system_deferred_date = models.DateTimeField(blank=True, null=True)
    user_deferred_date = models.DateTimeField(blank=True, null=True)
    demand_no = models.CharField(blank=True, null=True)
    demand_date = models.DateField(blank=True, null=True)
    aircraft_role_id = models.BigIntegerField(blank=True, null=True)
    change_of_serviceability_log_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lim_defr_def_logs'


class Pols(models.Model):
    id = models.BigIntegerField(primary_key=True)
    type_of_pol = models.CharField(blank=True, null=True)
    description = models.CharField(blank=True, null=True)
    sect_ref = models.CharField(blank=True, null=True)
    nato_code = models.CharField(blank=True, null=True)
    substitute_id = models.BigIntegerField(blank=True, null=True)
    system = models.ForeignKey('Systems', models.DO_NOTHING, blank=True, null=True)
    aircraft_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)
    us_spec = models.CharField(blank=True, null=True)
    capacity = models.CharField(blank=True, null=True)
    item = models.ForeignKey(Items, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pols'


class Pulls(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey(AircraftMasters, models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)
    ip_address = models.CharField(max_length=20, blank=True, null=True)
    pulled_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    date_pulled = models.DateField(blank=True, null=True)
    pushed_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='pulls_pushed_by_set', blank=True, null=True)
    date_pushed = models.DateField(blank=True, null=True)
    date_synced = models.DateField(blank=True, null=True)
    dba_remarks = models.CharField(max_length=250, blank=True, null=True)
    date_dba_remarks = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pulls'


class Quals(models.Model):
    id = models.BigIntegerField(primary_key=True)
    abbreviation = models.CharField(blank=True, null=True)
    qual_name = models.CharField(blank=True, null=True)
    qual_code = models.BigIntegerField(blank=True, null=True)
    user_type = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'quals'


class Ranks(models.Model):
    abbreviation = models.CharField(max_length=30, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    rank_of = models.CharField(max_length=1, blank=True, null=True)
    id = models.BigIntegerField(primary_key=True)
    user_type = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ranks'


class SecurityQuestions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    sec_questions = models.CharField(blank=True, null=True)
    created_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    created_date = models.BigIntegerField(blank=True, null=True)
    updated_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='securityquestions_updated_by_set',
                                   blank=True, null=True)
    updated_date = models.DateField(blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'security_questions'


class Systems(models.Model):
    id = models.BigIntegerField(primary_key=True)
    system = models.CharField(blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    other_details = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'systems'


class TableOfEquipmentWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    item_id = models.BigIntegerField(blank=True, null=True)
    weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    moment = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    remarks = models.CharField(blank=True, null=True)
    aircraft_role_id = models.BigIntegerField(blank=True, null=True)
    station_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'table_of_equipment_wb'


class TempWorks(models.Model):
    id = models.BigIntegerField(primary_key=True)
    pull = models.ForeignKey(Pulls, models.DO_NOTHING, blank=True, null=True)
    aircraft_master = models.ForeignKey(AircraftMasters, models.DO_NOTHING, blank=True, null=True)
    work_description = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'temp_works'


class Trades(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    trade = models.CharField(db_column='TRADE', blank=True, null=True)  # Field name made lowercase.
    dba_remarks = models.CharField(db_column='DBA_REMARKS', blank=True, null=True)  # Field name made lowercase.
    date_dba_remarks = models.DateField(db_column='DATE_DBA_REMARKS', blank=True,
                                        null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'trades'


class TyrePressures(models.Model):
    id = models.BigIntegerField(primary_key=True)
    ac_condition = models.CharField(blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    max_main = models.CharField(blank=True, null=True)
    min_main = models.CharField(blank=True, null=True)
    max_nose_tail = models.CharField(blank=True, null=True)
    min_nose_tail = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tyre_pressures'


class UserQuals(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user_id = models.BigIntegerField(blank=True, null=True)
    qual_id = models.BigIntegerField(blank=True, null=True)
    date_awarded = models.DateField(blank=True, null=True)
    updated_by_id = models.BigIntegerField(blank=True, null=True)
    date_updated = models.DateField(blank=True, null=True)
    approved_by_id = models.BigIntegerField(blank=True, null=True)
    date_approved = models.DateField(blank=True, null=True)
    active_yn = models.CharField(max_length=1, blank=True, null=True)
    trade_id = models.BigIntegerField(blank=True, null=True)
    aircraft_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_quals'


class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    pno = models.CharField()
    user_name = models.CharField()
    rank = models.ForeignKey(Ranks, models.DO_NOTHING, blank=True, null=True)
    designation_id = models.BigIntegerField(blank=True, null=True)
    user_type_id = models.BigIntegerField(blank=True, null=True)
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)
    login_pwd = models.CharField(blank=True, null=True)
    pwd_date_updated = models.DateField(blank=True, null=True)
    pwd_valid_upto = models.DateField(blank=True, null=True)
    pin = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    pin_date_updated = models.DateField(blank=True, null=True)
    pin_valid_upto = models.DateField(blank=True, null=True)
    fsi_yn = models.CharField(blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'


class WeightBalance(models.Model):
    id = models.BigIntegerField(primary_key=True)
    snow = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    weighing_change_mod = models.CharField(blank=True, null=True)
    weight_increased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    weight_decreased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_increased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_decreased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    lat_vert_increased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    lat_vert_decreased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    corrected_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    corrected_cg_long = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    corrected_moment_long = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    corrected_cg_lat = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    corrected_moment_lat = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    authenticated_by_id = models.BigIntegerField(blank=True, null=True)
    date_authenticated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'weight_balance'

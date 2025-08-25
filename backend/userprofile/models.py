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


class FuelTanks(models.Model):
    id = models.BigIntegerField(primary_key=True)
    tank_group = models.CharField(blank=True, null=True)
    capacity = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    expansion_2_field = models.CharField(db_column='EXPANSION_2%', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    expansion_3_field = models.CharField(db_column='EXPANSION_3%', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.

    class Meta:
        managed = False
        db_table = 'fuel_tanks'

class Items(models.Model):
    id = models.BigIntegerField(primary_key=True)
    old_item_id = models.BigIntegerField(blank=True, null=True)
    part_number = models.CharField(max_length=100, blank=True, null=True)
    store_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)
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

class Quals(models.Model):
    id = models.BigIntegerField(primary_key=True)
    abbreviation = models.CharField(max_length=30, blank=True, null=True)
    qual = models.CharField(max_length=50, blank=True, null=True)
    user_type = models.CharField(max_length=20, blank=True, null=True)

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


class Systems(models.Model):
    id = models.BigIntegerField(primary_key=True)
    system = models.CharField(blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    other_details = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'systems'

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
    weighing_change_mod = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    weight_increased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    weight_decreased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_increased = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_decresed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    lat_vert_increase = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
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

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
    basic_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_auw = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_landing_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_combat_load = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_operating_g_load = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_fuel_capacity = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_takeoff_speed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    max_landing_speed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)
    max_speed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    expiry_of_ttl_hrs = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aircraft_masters'

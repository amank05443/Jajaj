# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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
    total_stations = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aircraft_types'

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class FuelTanks(models.Model):
    id = models.BigIntegerField(primary_key=True)
    tank_group = models.CharField(blank=True, null=True)
    capacity = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    expansion_2_field = models.CharField(db_column='EXPANSION_2%', blank=True,
                                         null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    expansion_3_field = models.CharField(db_column='EXPANSION_3%', blank=True,
                                         null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.

    class Meta:
        managed = False
        db_table = 'fuel_tanks'

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class WeightBalance(models.Model):
    id = models.AutoField(primary_key=True)
    snow = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    weighing_change_mod = models.CharField()
    weight_increased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    weight_decreased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    long_increased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    long_decreased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    lat_vert_increased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    lat_vert_decreased = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    corrected_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    corrected_cg_long = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    corrected_moment_long = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    corrected_cg_lat = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    corrected_moment_lat = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    authenticated_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    date_authenticated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'weight_balance'

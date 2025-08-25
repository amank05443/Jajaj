# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CurrentOperatingDataWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    basic_weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    basic_long_moment = models.CharField(blank=True, null=True)
    basic_lat_vert_moment = models.CharField(blank=True, null=True)
    weight_item_removed = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    long_moment_item_removed = models.CharField(blank=True, null=True)
    lat_vert_item_removed = models.CharField(blank=True, null=True)
    weight_item_fitted = models.DecimalField(db_column='weight_item-fitted', max_digits=65535, decimal_places=65535, blank=True, null=True)  # Field renamed to remove unsuitable characters.
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

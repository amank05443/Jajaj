# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class EcuMasters(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    type = models.CharField(blank=True, null=True)
    mark = models.CharField(blank=True, null=True)
    serial_no = models.CharField(blank=True, null=True)
    date_of_fitment = models.DateField(blank=True, null=True)
    date_of_removal = models.DateField(blank=True, null=True)
    customer = models.ForeignKey('Customers', models.DO_NOTHING, blank=True, null=True)
    fitted_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    removed_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='ecumasters_removed_by_set', blank=True,
                                   null=True)
    location = models.CharField(blank=True, null=True)
    identifier = models.CharField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'ecu_masters'

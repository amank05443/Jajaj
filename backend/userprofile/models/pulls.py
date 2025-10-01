# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Pulls(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey('Customers', models.DO_NOTHING, blank=True, null=True)
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

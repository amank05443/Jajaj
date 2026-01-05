# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Items(models.Model):
    id = models.BigIntegerField(primary_key=True)
    old_item_id = models.BigIntegerField(blank=True, null=True)
    part_number = models.CharField(max_length=100, blank=True, null=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
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
        managed = True
        db_table = 'items'

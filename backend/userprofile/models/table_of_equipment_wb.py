# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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

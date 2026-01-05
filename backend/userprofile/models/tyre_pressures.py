# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class TyrePressures(models.Model):
    id = models.BigIntegerField(primary_key=True)
    ac_condition = models.CharField(blank=True, null=True)
    aircraft_type_id = models.BigIntegerField(blank=True, null=True)
    max_main = models.CharField(blank=True, null=True)
    min_main = models.CharField(blank=True, null=True)
    max_nose_tail = models.CharField(blank=True, null=True)
    min_nose_tail = models.CharField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tyre_pressures'

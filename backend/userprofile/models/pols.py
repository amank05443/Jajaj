# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Pols(models.Model):
    id = models.BigIntegerField(primary_key=True)
    type_of_pol = models.CharField(blank=True, null=True)
    description = models.CharField(blank=True, null=True)
    sect_ref = models.CharField(blank=True, null=True)
    nato_code = models.CharField(blank=True, null=True)
    substitute_id = models.BigIntegerField(blank=True, null=True)
    system = models.ForeignKey('Systems', models.DO_NOTHING, blank=True, null=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    us_spec = models.CharField(blank=True, null=True)
    capacity = models.CharField(blank=True, null=True)
    item = models.ForeignKey('Items', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'pols'

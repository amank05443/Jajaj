# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ChangeOfServiceabilityLogs(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    airframe_hrs = models.CharField()
    by_whom = models.BigIntegerField(blank=True, null=True)
    reason_for_placing_unserviceable = models.CharField(blank=True, null=True)
    work_carried_out = models.CharField(blank=True, null=True)
    authenticated_by_id = models.BigIntegerField(blank=True, null=True)
    man_hrs = models.CharField(blank=True, null=True)
    system_time_date = models.DateTimeField(blank=True, null=True)
    user_time_date = models.CharField(blank=True, null=True)
    snow = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    defect_code_id = models.BigIntegerField(blank=True, null=True)
    how_found_id = models.ForeignKey('HowFoundDefects', models.DO_NOTHING, blank=True, null=True)
    system_completion_date = models.DateTimeField(blank=True, null=True)
    user_completion_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)
    supervisor_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'change_of_serviceability_logs'

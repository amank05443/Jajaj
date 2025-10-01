# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class LimDefrDefHusLogs(models.Model):
    id = models.BigAutoField(primary_key=True)
    item = models.ForeignKey('Items', models.DO_NOTHING, blank=True, null=True)
    lim_def_removal_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    limitations_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_defects_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_until = models.CharField(max_length=50, blank=True, null=True)
    main_system = models.ForeignKey('Systems', models.DO_NOTHING, blank=True, null=True)
    change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING, blank=True, null=True)
    demand_id = models.BigIntegerField(blank=True, null=True)
    husbandry_yn = models.CharField(blank=True, null=True)
    ldh_no = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lim_defr_def_hus_logs'

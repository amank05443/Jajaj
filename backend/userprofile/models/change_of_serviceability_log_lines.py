# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ChangeOfServiceabilityLogLines(models.Model):
    id = models.BigIntegerField(primary_key=True)
    cosl = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING,related_name="change_of_serviceability_log_lines", db_column='cosl_id',blank=True, null=True)
    # change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING,related_name="change_of_serviceability_log_lines", db_column='change_of_serviceability_log_id',blank=True, null=True)
    trade = models.ForeignKey('Trades', models.DO_NOTHING, blank=True, null=True)
    user_qual = models.ForeignKey('UserQuals', models.DO_NOTHING, blank=True, null=True)
    date_cleared = models.TimeField(blank=True, null=True)
    tradesman_sup = models.CharField(blank=True, null=True)
    cleared_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'change_of_serviceability_log_lines'

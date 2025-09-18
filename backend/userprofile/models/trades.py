# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Trades(models.Model):
    id = models.BigIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    trade = models.CharField(db_column='TRADE', blank=True, null=True)  # Field name made lowercase.
    dba_remarks = models.CharField(db_column='DBA_REMARKS', blank=True, null=True)  # Field name made lowercase.
    date_dba_remarks = models.DateField(db_column='DATE_DBA_REMARKS', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'trades'

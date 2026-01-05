# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Customers(models.Model):
    id = models.BigIntegerField(primary_key=True)
    customer_name = models.CharField(max_length=40)
    sub_customer_name = models.CharField(max_length=40)
    customer_type = models.CharField(max_length=3)
    cust_prefix = models.CharField(max_length=6)
    addressee = models.CharField(max_length=30, blank=True, null=True)
    address_line1 = models.CharField(max_length=30, blank=True, null=True)
    address_line2 = models.CharField(max_length=30, blank=True, null=True)
    address_line3 = models.CharField(max_length=30, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=20, blank=True, null=True)
    pin = models.CharField(max_length=6, blank=True, null=True)
    parent_unit_id = models.BigIntegerField(blank=True, null=True)
    remarks = models.CharField(max_length=100, blank=True, null=True)
    active_yn = models.CharField(max_length=1)
    repair_agency = models.CharField(max_length=1, blank=True, null=True)
    dba_remarks = models.CharField(max_length=250, blank=True, null=True)
    date_dba_remarks = models.DateField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'customers'

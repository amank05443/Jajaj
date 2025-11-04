# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Users(models.Model):
    id = models.BigIntegerField(primary_key=True)
    pno = models.CharField()
    user_name = models.CharField()
    rank = models.ForeignKey('Ranks', models.DO_NOTHING, blank=True, null=True)
    designation_id = models.BigIntegerField(blank=True, null=True)
    user_type_id = models.BigIntegerField(blank=True, null=True)
    customer = models.ForeignKey('Customers', models.DO_NOTHING, blank=True, null=True)
    login_pwd = models.CharField(blank=True, null=True)
    pwd_date_updated = models.DateField(blank=True, null=True)
    pwd_valid_upto = models.DateField(blank=True, null=True)
    pin = models.CharField(blank=True, null=True)
    pin_date_updated = models.DateField(blank=True, null=True)
    pin_valid_upto = models.DateField(blank=True, null=True)
    fsi_yn = models.CharField(blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)
    security_question_id = models.BigIntegerField(blank=True, null=True)
    security_question_ans = models.CharField(blank=True, null=True)

    security_question = models.ForeignKey('SecurityQuestions', models.DO_NOTHING, blank=True, null=True)
    security_question_ans = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

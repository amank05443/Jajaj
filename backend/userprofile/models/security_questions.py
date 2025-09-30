# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class SecurityQuestions(models.Model):
    id = models.BigIntegerField(primary_key=True)
    sec_questions = models.CharField(blank=True, null=True)
    created_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    created_date = models.DateField(blank=True, null=True)
    updated_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='securityquestions_updated_by_set', blank=True, null=True)
    updated_date = models.DateField(blank=True, null=True)
    active_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'security_questions'

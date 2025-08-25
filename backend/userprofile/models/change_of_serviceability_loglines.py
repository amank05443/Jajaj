from django.db import models

class ChangeOfServiceabilityLogLines(models.Model):
    id = models.BigIntegerField(primary_key=True)
    change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING)
    trade_id = models.BigIntegerField(blank=True, null=True)
    operated_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    supervision_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='changeofserviceabilityloglines_supervision_by_set', blank=True, null=True)
    status = models.CharField(blank=True, null=True)
    nominated_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='changeofserviceabilityloglines_nominated_by_set', blank=True, null=True)
    date_cleared = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'change_of_serviceability_log_lines'

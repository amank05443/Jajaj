from django.db import models

class ChangeOfServiceabilityLogs(models.Model):
    id = models.BigAutoField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    airframe_hrs = models.CharField()
    by_whom = models.CharField(blank=True, null=True)
    reason_for_placing_unserviceable = models.CharField(blank=True, null=True)
    work_carried_out = models.CharField(blank=True, null=True)
    authenticated_by_id = models.BigIntegerField(blank=True, null=True)
    man_hrs = models.CharField(blank=True, null=True)
    system_time_date = models.DateTimeField(blank=True, null=True)
    user_time_date = models.DateTimeField(blank=True, null=True)
    snow = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    defect_code_id = models.BigIntegerField(blank=True, null=True)
    how_found_defect = models.ForeignKey('HowFoundDefects', models.DO_NOTHING, blank=True, null=True)
    system_completion_date = models.DateTimeField(blank=True, null=True)
    user_completion_date = models.DateTimeField(blank=True, null=True)
    status = models.CharField(blank=True, null=True)
    supervisor_id = models.BigIntegerField(blank=True, null=True)
    entry_type = models.ForeignKey('EntryTypes', models.DO_NOTHING, blank=True, null=True)
    pull = models.ForeignKey('Pulls', models.DO_NOTHING, blank=True, null=True)


    class Meta:
        managed = False
        db_table = 'change_of_serviceability_logs'
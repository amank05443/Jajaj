from django.db import models

class LimDefrDefLogs(models.Model):
    id = models.BigAutoField(primary_key=True)
    sysdate = models.DateTimeField(blank=True, null=True)
    user_date = models.DateTimeField(blank=True, null=True)
    airframe_hours = models.CharField(max_length=50, blank=True, null=True)
    item = models.ForeignKey('Items', models.DO_NOTHING, blank=True, null=True)
    lim_def_removal_by_id = models.BigIntegerField(blank=True, null=True)
    limitations_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_defects_yn = models.CharField(max_length=2, blank=True, null=True)
    deferred_until = models.CharField(max_length=50, blank=True, null=True)
    defect_removal_snow = models.CharField(max_length=50, blank=True, null=True)
    snow = models.CharField(max_length=50, blank=True, null=True)
    main_system = models.ForeignKey('Systems', models.DO_NOTHING, blank=True, null=True)
    system_deferred_date = models.DateTimeField(blank=True, null=True)
    user_deferred_date = models.DateTimeField(blank=True, null=True)
    demand_no = models.CharField(blank=True, null=True)
    demand_date = models.DateField(blank=True, null=True)
    aircraft_role = models.ForeignKey('AircraftRoles', models.DO_NOTHING, blank=True, null=True)
    change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lim_defr_def_logs'
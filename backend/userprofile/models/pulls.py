from django.db import models

class Pulls(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey("AircraftMasters", models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey("Customers", models.DO_NOTHING, blank=True, null=True)
    ip_address = models.CharField(max_length=20, blank=True, null=True)
    pulled_by = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)
    date_pulled = models.DateField(blank=True, null=True)
    pushed_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='pulls_pushed_by_set', blank=True, null=True)
    date_pushed = models.DateField(blank=True, null=True)
    date_synced = models.DateField(blank=True, null=True)
    dba_remarks = models.CharField(max_length=250, blank=True, null=True)
    date_dba_remarks = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pulls'
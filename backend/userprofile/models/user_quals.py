from django.db import models

class UserQuals(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user = models.ForeignKey('Users', on_delete=models.CASCADE, related_name='userQualsTrade', blank=True, null=True)
    qual = models.ForeignKey('Quals', on_delete=models.CASCADE, blank=True, null=True)
    # trade = models.ForeignKey('Trades', on_delete= models.CASCADE)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    date_awarded = models.DateField(blank=True, null=True)
    updated_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='userquals_updated_by_set', blank=True,
                                   null=True)
    date_updated = models.DateField(blank=True, null=True)
    approved_by = models.ForeignKey('Users', models.DO_NOTHING, related_name='userquals_approved_by_set', blank=True,
                                    null=True)
    date_approved = models.DateField(blank=True, null=True)
    active_yn = models.CharField(max_length=1, blank=True, null=True)
    fsi_yn = models.CharField(max_length=1, blank=True, null=True)
    user_type = models.CharField(null=True)
    trades = models.CharField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'user_quals'
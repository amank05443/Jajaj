from django.db import models

class UserQuals(models.Model):
    id = models.BigIntegerField(primary_key=True)
    user_id = models.BigIntegerField(blank=True, null=True)
    qual_id = models.BigIntegerField(blank=True, null=True)
    date_awarded = models.DateField(blank=True, null=True)
    updated_by_id = models.BigIntegerField(blank=True, null=True)
    date_updated = models.DateField(blank=True, null=True)
    approved_by_id = models.BigIntegerField(blank=True, null=True)
    date_approved = models.DateField(blank=True, null=True)
    active_yn = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_quals'
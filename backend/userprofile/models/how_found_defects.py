from django.db import models

class HowFoundDefects(models.Model):
    id = models.BigIntegerField(primary_key=True)
    occasion = models.CharField(max_length=50, blank=True, null=True)
    user_type = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'how_found_defects'

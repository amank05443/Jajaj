from django.db import models

class HowFoundDefects(models.Model):
    id = models.BigIntegerField(primary_key=True)
    occasion = models.CharField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'how_found_defects'

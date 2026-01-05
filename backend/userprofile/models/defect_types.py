from django.db import models

class DefectTypes(models.Model):
    id = models.BigIntegerField(primary_key=True)
    defect_details = models.CharField(blank=True, null=True)
    defer_defect_yn = models.CharField(blank=True, null=True)
    limitation_defect_yn = models.CharField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'defect_types'
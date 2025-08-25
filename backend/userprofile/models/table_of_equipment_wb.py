from django.db import models

class TableOfEquipmentWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master_id = models.BigIntegerField(blank=True, null=True)
    item_id = models.BigIntegerField(blank=True, null=True)
    weight = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    moment = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    remarks = models.CharField(blank=True, null=True)
    aircraft_role_id = models.BigIntegerField(blank=True, null=True)
    station_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'table_of_equipment_wb'
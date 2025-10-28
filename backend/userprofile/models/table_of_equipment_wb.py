from django.db import models


class TableOfEquipmentWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    item = models.ForeignKey('Items', models.DO_NOTHING, blank=True, null=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    moment = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    remarks = models.CharField(blank=True, null=True)
    aircraft_role = models.ForeignKey('AircraftRoles', models.DO_NOTHING, blank=True, null=True)
    station = models.ForeignKey('AircraftStations', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'table_of_equipment_wb'

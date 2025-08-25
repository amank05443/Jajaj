from django.db import models

class ItemSerials(models.Model):
    id = models.BigIntegerField(primary_key=True)
    part_number = models.CharField(max_length=100, blank=True, null=True)
    item_id_old = models.BigIntegerField(blank=True, null=True)
    item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    in_use = models.CharField(max_length=2, blank=True, null=True)
    check_item_serial_no = models.CharField(max_length=50, blank=True, null=True)
    item_serial_id_old = models.BigIntegerField(blank=True, null=True)
    store_type = models.ForeignKey(AircraftTypes, models.DO_NOTHING, blank=True, null=True)
    aircraft_master = models.ForeignKey(AircraftMasters, models.DO_NOTHING, blank=True, null=True)
    customer = models.ForeignKey(Customers, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_serials'
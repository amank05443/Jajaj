from django.db import models


class AircraftStations(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_type = models.ForeignKey('AircraftTypes', models.DO_NOTHING, blank=True, null=True)
    description = models.CharField(blank=True, null=True)
    position = models.CharField(blank=True, null=True)
    station_number = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'aircraft_stations'

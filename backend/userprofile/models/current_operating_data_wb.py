from django.db import models


class CurrentOperatingDataWb(models.Model):
    id = models.BigIntegerField(primary_key=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    basic_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    basic_long_moment = models.CharField(blank=True, null=True)
    basic_lat_vert_moment = models.CharField(blank=True, null=True)
    weight_item_removed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    long_moment_item_removed = models.CharField(blank=True, null=True)
    lat_vert_item_removed = models.CharField(blank=True, null=True)
    weight_item_fitted = models.DecimalField(db_column='weight_item-fitted', max_digits=10, decimal_places=2,
                                             blank=True, null=True)  # Field renamed to remove unsuitable characters.
    long_moment_item_fitted = models.CharField(blank=True, null=True)
    lat_vert_item_fitted = models.CharField(blank=True, null=True)
    current_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    current_long_moment = models.CharField(blank=True, null=True)
    current_lat_vert = models.CharField(blank=True, null=True)
    current_cg_long = models.CharField(blank=True, null=True)
    current_cg_lat_vert = models.CharField(blank=True, null=True)
    percentange_mac = models.CharField(blank=True, null=True)
    authenticated_by = models.BigIntegerField(blank=True, null=True)
    date_authenticated = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'current_operating_data_wb'

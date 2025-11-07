# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CompassCalibrationLogs(models.Model):
    id = models.BigAutoField(primary_key=True)
    ap_reference = models.CharField(blank=True, null=True)
    aircraft_master = models.ForeignKey('AircraftMasters', models.DO_NOTHING, blank=True, null=True)
    compass_swing_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    ref_snow = models.BigIntegerField(blank=True, null=True)
    compass_type = models.ForeignKey('Items', models.DO_NOTHING, db_column='compass_type', blank=True, null=True)
    compass_ser_no = models.ForeignKey('ItemSerials', models.DO_NOTHING, db_column='compass_ser_no', blank=True,
                                       null=True)
    place = models.ForeignKey('Customers', models.DO_NOTHING, db_column='place', blank=True, null=True)
    method = models.ForeignKey('HowFoundDefects', models.DO_NOTHING, db_column='method', blank=True, null=True)
    actual_north = models.BigIntegerField(blank=True, null=True)
    actual_south = models.BigIntegerField(blank=True, null=True)
    actual_east = models.BigIntegerField(blank=True, null=True)
    actual_west = models.BigIntegerField(blank=True, null=True)
    a_c_north = models.CharField(blank=True, null=True)
    a_c_north_east = models.CharField(blank=True, null=True)
    a_c_north_west = models.CharField(blank=True, null=True)
    a_c_south = models.CharField(blank=True, null=True)
    a_c_south_east = models.CharField(blank=True, null=True)
    a_c_south_west = models.CharField(blank=True, null=True)
    a_c_east = models.CharField(blank=True, null=True)
    a_c_west = models.CharField(blank=True, null=True)
    coeff_a = models.BigIntegerField(blank=True, null=True)
    coeff_b = models.BigIntegerField(blank=True, null=True)
    coeff_c = models.BigIntegerField(blank=True, null=True)
    cosl = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING, blank=True,
    # change_of_serviceability_log = models.ForeignKey('ChangeOfServiceabilityLogs', models.DO_NOTHING, blank=True,
                                                     null=True)
    pull = models.ForeignKey('Pulls', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'compass_calibration_logs'

from django.db import models

class Customers(models.Model):
    customer_name = models.CharField(max_length=40,null=False, blank=False)
    sub_customer_name = models.CharField(max_length=40,null=False, blank=False)
    customer_type = models.CharField(max_length=3,null=False, blank=False)
    cust_prefix = models.CharField(max_length=6,null=False, blank=False)
    addressee = models.CharField(max_length=30,null=True, blank=True)
    address_line1 = models.CharField(max_length=30,null=True, blank=True)
    address_line2 = models.CharField(max_length=30,null=True, blank=True)
    address_line3 = models.CharField(max_length=30,null=True, blank=True)
    city = models.CharField(max_length=20,null=True, blank=True)
    state = models.CharField(max_length=20,null=True, blank=True)
    pin = models.CharField(max_length=6,null=True, blank=True)
    parent_unit_id = models.BigIntegerField(null=True, blank=True)
    remarks = models.CharField(max_length=100,null=True, blank=True)
    active_yn = models.CharField(max_length=1,null=False, blank=False,default='Y')
    repair_agency = models.CharField(max_length=1,null=True, blank=True,default='N')
    dba_remarks = models.CharField(max_length=250,null=True, blank=True)
    date_dba_remarks = models.DateField(null=True, blank=True)

    class Meta:
        db_table = 'customers'

    def __str__(self):
        return (f"{self.customer_name} {self.sub_customer_name} {self.customer_type} {self.cust_prefix} {self.addressee} {self.address_line1}"
                f"{self.address_line2} {self.address_line3} {self.city} {self.state} {self.pin}{self.parent_unit_id}"
                f"{self.remarks} {self.active_yn} {self.repair_agency} {self.dba_remarks}{self.date_dba_remarks} ")
from django.db import models

class Users(models.Model):
    pno = models.CharField(max_length=10,null=False, blank=False)
    user_name = models.CharField(max_length=100,null=False, blank=False)
    rank_id = models.DecimalField(max_digits=10,decimal_places=0,null=True, blank=True)
    customer_id = models.DecimalField(max_digits=10,decimal_places=0,null=True, blank=True)
    login_pwd = models.CharField(max_length=256,null=True, blank=True)
    pwd_date_updated = models.DateField(null=True, blank=True)
    pwd_valid_upto = models.DateField(null=True, blank=True)
    pin= models.DecimalField(max_digits=6,decimal_places=0,null=True, blank=True)
    pin_date_updated = models.DateField(null=True, blank=True)
    pin_valid_upto = models.DateField(null=True, blank=True)
    fsi_yn = models.CharField(max_length=1,null=True, blank=True)
    active_yn = models.CharField(max_length=1,null=True, blank=True)

    class Meta:
        db_table = 'users'

    # def __str__(self):
    #     return (f"{self.pno} {self.user_name} {self.rank_id} {self.customer_id} {self.login_pwd} {self.pwd_date_updated}"
    #             f"{self.pwd_valid_upto} {self.pin} {self.pin_date_updated} {self.pin_valid_upto}"
    #             f"{self.fsi_yn} {self.active_yn}")
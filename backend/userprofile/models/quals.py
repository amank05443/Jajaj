# models.py
from django.db import models

class Quals(models.Model):
    objects         = None
    abbreviation    = models.CharField(null=True, max_length=30)
    qual            = models.CharField(null=True, max_length=50)
    user_type        = models.CharField(null=True, max_length=20)

    class Meta:
        db_table = 'quals'

    # def __str__(self):
    #     return f"{self.abbreviation} {self.qual} {self.user_type}"
from django.db import models
# models.py
from django.db import models

class Ranks(models.Model):
    abbreviation    = models.CharField(null=True, max_length=30)
    name            = models.CharField(null=True, max_length=200)
    rank_of          = models.CharField(null=True, max_length=1)
    user_type        = models.CharField(null=True, max_length=20)

    class Meta:
        db_table = 'ranks'

    def __str__(self):
        return f"{self.abbreviation} {self.name} {self.rank_of} {self.user_type}"
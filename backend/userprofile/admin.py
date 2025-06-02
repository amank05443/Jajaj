# Register your models here.
from django.contrib import admin
from .models import quals


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'pno','password')



# admin.site.register(UserProfile, UserProfileAdmin)



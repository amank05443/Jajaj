from django.contrib import admin
from .models import Ranks, Quals,Users,UserQuals,Trades

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'rank', 'pno','login_pwd','designation_id','user_type_id','customer','pwd_date_updated',
                    'pwd_valid_upto','pin','pin_date_updated','pin_valid_upto','fsi_yn','active_yn','security_question_id','security_question_ans')


@admin.register(Ranks)
class RanksAdmin(admin.ModelAdmin):
    list_display = ('abbreviation', 'name', 'rank_of','user_type')

@admin.register(Quals)
class QualsAdmin(admin.ModelAdmin):
    list_display = ('abbreviation', 'qual_name', 'user_type','qual_code')

@admin.register(UserQuals)
class UserQualsAdmin(admin.ModelAdmin):
    list_display = ('user', 'qual', 'trades' ,'aircraft_type','date_awarded','updated_by','date_updated','approved_by','date_approved','active_yn','fsi_yn')


@admin.register(Trades)
class TradesAdmin(admin.ModelAdmin):
    list_display = ('trade', 'dba_remarks', 'date_dba_remarks')
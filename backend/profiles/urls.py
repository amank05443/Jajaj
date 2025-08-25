
from profiles import views
from django.urls import path
from profiles.views import (user_profile_view,  create_rank,
                               create_qual,list_quals)

urlpatterns = [
path('api/ranks', create_rank, name='create_rank'),
path('api/quals', create_qual, name='create_qual'),
path('api/qualsData', list_quals.as_view(), name='list_qual'),
path('user-profile/', user_profile_view, name='user_profile'),  # User profile data
path('user-profile/', user_profile_view, name='user_profile'),  # User profile data
    ]
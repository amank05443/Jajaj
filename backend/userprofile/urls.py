from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import login_view, get_csrf_token, user_profile_view, logout_view, register_view, create_rank, create_qual, \
    list_quals, AircraftDetailView

urlpatterns = [
    path('login/', login_view, name='login'),
    path('csrf/', get_csrf_token, name='csrf'),  # Endpoint to get CSRF token
    path('user-profile/', user_profile_view, name='user_profile'),  # User profile data
    path('logout/', logout_view, name='logout'),  # Add the logout URL
    path('register/', register_view, name='register'),
    path('api/ranks', create_rank, name='create_rank'),
    path('api/quals', create_qual, name='create_qual'),
    path('api/qualsData', list_quals.as_view(), name='list_qual'),
    path('api/aircraft/<int:side_no>/', AircraftDetailView.as_view(), name='aircraft-detail'),
]


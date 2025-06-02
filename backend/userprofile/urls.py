from django.test import TestCase
from django.urls import path
from .views import  get_csrf_token,logout_view,register_view
# from .views import AircraftUnserviceableCreateView

urlpatterns = [
    # path('login/', login_view, name='login'),
    path('csrf/', get_csrf_token, name='csrf'),  # Endpoint to get CSRF token
    # path('api/user-profile/', user_profile_view, name='user_profile'),  # User profile data
    # path('api/uns/', AircraftUnserviceableCreateView.as_view(), name='uns-create'),  # User profile data
    path('logout/', logout_view, name='logout'),  # Add the logout URL
    path('register/', register_view, name='register'),
]


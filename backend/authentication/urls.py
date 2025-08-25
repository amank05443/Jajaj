from authentication import views
from django.urls import path
from authentication.views import (login_view, get_csrf_token,logout_view, register_view)


urlpatterns = [
    path('login/', login_view, name='login'),
    path('csrf/', get_csrf_token, name='csrf'),  # Endpoint to get CSRF token
    path('logout/', logout_view, name='logout'),  # Add the logout URL
    path('register/', register_view, name='register')
    ]
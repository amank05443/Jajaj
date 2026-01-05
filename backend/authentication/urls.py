from authentication import views
from django.urls import path
from authentication.views import (login_view, get_csrf_token,logout_view, register_view)
from authentication.jwt_views import (
    JWTLoginView,
    JWTLogoutView,
    JWTRefreshView,
    JWTUserView,
    JWTVerifyView,
)


urlpatterns = [
    # Existing session-based auth endpoints (kept for backward compatibility)
    path('login/', login_view, name='login'),
    path('csrf/', get_csrf_token, name='csrf'),  # Endpoint to get CSRF token
    path('logout/', logout_view, name='logout'),  # Add the logout URL
    path('register/', register_view, name='register'),

    # New JWT-based auth endpoints with httpOnly cookies
    path('api/auth/jwt/login/', JWTLoginView.as_view(), name='jwt-login'),
    path('api/auth/jwt/logout/', JWTLogoutView.as_view(), name='jwt-logout'),
    path('api/auth/jwt/refresh/', JWTRefreshView.as_view(), name='jwt-refresh'),
    path('api/auth/jwt/me/', JWTUserView.as_view(), name='jwt-me'),
    path('api/auth/jwt/verify/', JWTVerifyView.as_view(), name='jwt-verify'),
]
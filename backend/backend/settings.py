import os
from pathlib import Path
from datetime import timedelta
from corsheaders.defaults import default_headers


import requests
import psycopg2

# from requests import session

# BASE DIRECTORY
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY
SECRET_KEY = 'django-insecure-q4mm7(ld%t#ol_!n7+-be_rxo4wxhb6g31fqb(^sepokc9$kjm'
DEBUG = True
ALLOWED_HOSTS = ['*']  # In production, limit to domains you control

# APPLICATIONS
INSTALLED_APPS = [
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',

    # Your apps
    'userprofile',
    'authentication',
    'profiles',
    'reports',
]

# MIDDLEWARE
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'corsheaders.middleware.CorsMiddleware',  # 🚨 CORS should come *before* CommonMiddleware
    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URLS & WSGI
ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'

# TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'e700',
        'USER': 'aman',
        'PASSWORD': 'ilmsair',
        'HOST': 'localhost',
        'PORT': '5432',
       
    }
}

# SESSION CONFIG
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# INTERNATIONALIZATION
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = False
TIME_ZONE = "Asia/Kolkata"

# STATIC FILES
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# DEFAULT PRIMARY KEY FIELD
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ✅ CORS CONFIGURATION
CORS_ALLOW_ALL_ORIGINS = True  # Set this to True *only during development*
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True  # Required to allow sending cookies

CORS_ALLOW_HEADERS = list(default_headers) + [
    'X-CSRFToken',
]

# ✅ CSRF CONFIGURATION
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
]
CSRF_COOKIE_HTTPONLY = False
CSRF_TRUSTED_NAME = 'csrfToken'
CSRF_COOKIE_SAMESITE = 'Lax'  # Or 'None' if you're on different domains with HTTPS
CSRF_COOKIE_SECURE = False

SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_COOKIE_SECURE = False# Set True only for HTTPS in production
SESSION_COOKIE_AGE = 9000 #inactivity based log out set session expiry time
SESSION_SAVE_EVERY_REQUEST = True # Reset timer for each request
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# =====================================================
# JWT AUTHENTICATION CONFIGURATION
# For offline + sync architecture with httpOnly cookies
# =====================================================

# IMPORTANT: This SECRET_KEY must be the SAME on all laptops and the main server
# for JWT tokens to be valid across all systems during sync
JWT_SECRET_KEY = 'e700-shared-jwt-secret-key-change-in-production-must-be-same-on-all-systems'

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'authentication.jwt_authentication.CookieJWTAuthentication',  # Custom JWT from httpOnly cookie
        'rest_framework.authentication.SessionAuthentication',  # Keep existing session auth
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Simple JWT Configuration
SIMPLE_JWT = {
    # Token lifetimes - designed for offline work scenario
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),      # Short-lived for security
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=12),       # 12 hours covers full work day
    'ROTATE_REFRESH_TOKENS': True,                       # New refresh token on each refresh
    'BLACKLIST_AFTER_ROTATION': False,                   # Don't blacklist (no DB dependency)

    # Signing configuration - MUST be same across all systems
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': JWT_SECRET_KEY,                       # Use shared secret
    'VERIFYING_KEY': None,

    # Token type
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    # Token claims
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    # Sliding token (not used, but configured)
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=30),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(hours=12),
}

# JWT Cookie Configuration (for httpOnly cookies)
JWT_COOKIE_SETTINGS = {
    'ACCESS_TOKEN_COOKIE_NAME': 'access_token',
    'REFRESH_TOKEN_COOKIE_NAME': 'refresh_token',
    'COOKIE_HTTPONLY': True,           # Cannot be accessed by JavaScript (XSS safe)
    'COOKIE_SECURE': False,            # False for localhost (no HTTPS), True in production
    'COOKIE_SAMESITE': 'Lax',          # Prevents CSRF from external sites
    'COOKIE_PATH': '/',                # Available for all paths
    'COOKIE_DOMAIN': None,             # None = current domain only
}
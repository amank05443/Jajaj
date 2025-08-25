import os
from pathlib import Path
from corsheaders.defaults import default_headers

import backend.logging_config
from .logging_config import LOGGING,RequestContextMiddleware,SQLDebugMiddleware


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
    'corsheaders',

    # Your apps
    'userprofile',
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
    'backend.logging_config.RequestContextMiddleware', #added by Abhishek Singh,LAM for debug logging
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
        'NAME': '700NAMS',
        'USER': 'ilmsair',
        'PASSWORD': 'ilmsair',
        'HOST': '172.17.1.131',
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
USE_TZ = True

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

#added by Abhishek Singh,LAM for debugging and logging for logging_config.py---21Aug25
if DEBUG:
    MIDDLEWARE.insert(2,"backend.logging_config.SQLDebugMiddleware")


LOGGING = LOGGING
#-----------------------------------end--------------------------------------




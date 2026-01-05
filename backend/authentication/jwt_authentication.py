# Purpose: Custom JWT Authentication that reads tokens from httpOnly cookies
# This is required for secure token storage (XSS protection)
# Added by: Authentication System Enhancement

from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
import jwt


class CookieJWTAuthentication(JWTAuthentication):
    """
    Custom JWT Authentication class that extracts JWT tokens from httpOnly cookies
    instead of Authorization header.

    This provides better security against XSS attacks since JavaScript cannot
    access httpOnly cookies.

    Flow:
    1. Check for access_token in cookies
    2. If found, validate it
    3. If valid, return the user
    4. If not found or invalid, return None (allowing other auth methods to try)
    """

    def authenticate(self, request):
        """
        Authenticate the request and return a tuple of (user, token) or None.
        """
        # Get cookie settings from Django settings
        cookie_settings = getattr(settings, 'JWT_COOKIE_SETTINGS', {})
        access_cookie_name = cookie_settings.get('ACCESS_TOKEN_COOKIE_NAME', 'access_token')

        # Try to get the access token from cookies
        raw_token = request.COOKIES.get(access_cookie_name)

        if raw_token is None:
            # No token in cookies, let other authentication methods try
            return None

        # Validate the token
        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
            return (user, validated_token)
        except TokenError as e:
            # Token is invalid or expired - return None to allow other auth methods
            # Don't raise AuthenticationFailed as it blocks AllowAny endpoints
            print(f'[CookieJWTAuth] Token error: {str(e)}')
            return None
        except Exception as e:
            # Other errors - also return None to be graceful
            print(f'[CookieJWTAuth] Auth error: {str(e)}')
            return None

    def get_user(self, validated_token):
        """
        Get the user from the validated token.
        Since we're using a custom Users model (not Django's auth User),
        we need to fetch the user ourselves.
        """
        from userprofile.models import Users

        try:
            user_id = validated_token.get('user_id')
            if user_id is None:
                raise AuthenticationFailed('Token contained no user_id claim')

            user = Users.objects.get(id=user_id)
            return user
        except Users.DoesNotExist:
            raise AuthenticationFailed('User not found')


class JWTTokenGenerator:
    """
    Helper class to generate JWT tokens with custom claims.
    Used for login to create both access and refresh tokens.
    """

    @staticmethod
    def generate_tokens_for_user(user):
        """
        Generate access and refresh tokens for a user.

        Args:
            user: The Users model instance

        Returns:
            dict: {
                'access_token': str,
                'refresh_token': str,
                'access_token_expires': datetime,
                'refresh_token_expires': datetime
            }
        """
        from datetime import datetime, timedelta
        from rest_framework_simplejwt.tokens import RefreshToken

        # Get settings
        jwt_settings = settings.SIMPLE_JWT
        jwt_secret = settings.JWT_SECRET_KEY

        # Current time
        now = datetime.utcnow()

        # Token expiry times
        access_exp = now + jwt_settings.get('ACCESS_TOKEN_LIFETIME', timedelta(minutes=30))
        refresh_exp = now + jwt_settings.get('REFRESH_TOKEN_LIFETIME', timedelta(hours=12))

        # Access token payload
        access_payload = {
            'token_type': 'access',
            'user_id': user.id,
            'pno': user.pno,
            'user_name': user.user_name,
            'iat': now,
            'exp': access_exp,
        }

        # Refresh token payload
        refresh_payload = {
            'token_type': 'refresh',
            'user_id': user.id,
            'iat': now,
            'exp': refresh_exp,
        }

        # Generate tokens
        access_token = jwt.encode(access_payload, jwt_secret, algorithm='HS256')
        refresh_token = jwt.encode(refresh_payload, jwt_secret, algorithm='HS256')

        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'access_token_expires': access_exp,
            'refresh_token_expires': refresh_exp,
        }

    @staticmethod
    def refresh_access_token(refresh_token_str):
        """
        Generate a new access token from a valid refresh token.

        Args:
            refresh_token_str: The refresh token string

        Returns:
            dict: New tokens if successful

        Raises:
            AuthenticationFailed: If refresh token is invalid or expired
        """
        from datetime import datetime, timedelta

        jwt_secret = settings.JWT_SECRET_KEY
        jwt_settings = settings.SIMPLE_JWT

        try:
            # Decode and validate refresh token
            payload = jwt.decode(refresh_token_str, jwt_secret, algorithms=['HS256'])

            # Verify it's a refresh token
            if payload.get('token_type') != 'refresh':
                raise AuthenticationFailed('Invalid token type')

            # Get user
            from userprofile.models import Users
            user_id = payload.get('user_id')
            user = Users.objects.get(id=user_id)

            # Generate new tokens
            return JWTTokenGenerator.generate_tokens_for_user(user)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Refresh token has expired')
        except jwt.InvalidTokenError as e:
            raise AuthenticationFailed(f'Invalid refresh token: {str(e)}')
        except Exception as e:
            raise AuthenticationFailed(f'Token refresh failed: {str(e)}')

    @staticmethod
    def decode_token(token_str):
        """
        Decode a token without validation (for debugging/inspection).
        """
        jwt_secret = settings.JWT_SECRET_KEY
        try:
            return jwt.decode(token_str, jwt_secret, algorithms=['HS256'])
        except Exception as e:
            return None

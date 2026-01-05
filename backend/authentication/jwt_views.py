# Purpose: JWT Authentication Views with httpOnly cookie support
# These views handle login, logout, token refresh, and user info retrieval
# All tokens are stored in httpOnly cookies for XSS protection
# Added by: Authentication System Enhancement

import bcrypt
import json
from datetime import datetime

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from userprofile.models import Users, Ranks, Quals, UserQuals
from .jwt_authentication import JWTTokenGenerator


def set_jwt_cookies(response, tokens):
    """
    Helper function to set JWT tokens as httpOnly cookies.

    Args:
        response: Django/DRF response object
        tokens: dict containing 'access_token', 'refresh_token', and expiry times
    """
    cookie_settings = settings.JWT_COOKIE_SETTINGS

    # Set access token cookie
    response.set_cookie(
        key=cookie_settings.get('ACCESS_TOKEN_COOKIE_NAME', 'access_token'),
        value=tokens['access_token'],
        httponly=cookie_settings.get('COOKIE_HTTPONLY', True),
        secure=cookie_settings.get('COOKIE_SECURE', False),
        samesite=cookie_settings.get('COOKIE_SAMESITE', 'Lax'),
        path=cookie_settings.get('COOKIE_PATH', '/'),
        domain=cookie_settings.get('COOKIE_DOMAIN', None),
        max_age=int(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds()),
    )

    # Set refresh token cookie
    response.set_cookie(
        key=cookie_settings.get('REFRESH_TOKEN_COOKIE_NAME', 'refresh_token'),
        value=tokens['refresh_token'],
        httponly=cookie_settings.get('COOKIE_HTTPONLY', True),
        secure=cookie_settings.get('COOKIE_SECURE', False),
        samesite=cookie_settings.get('COOKIE_SAMESITE', 'Lax'),
        path=cookie_settings.get('COOKIE_PATH', '/'),
        domain=cookie_settings.get('COOKIE_DOMAIN', None),
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
    )

    return response


def clear_jwt_cookies(response):
    """
    Helper function to clear JWT cookies on logout.
    """
    cookie_settings = settings.JWT_COOKIE_SETTINGS

    response.delete_cookie(
        key=cookie_settings.get('ACCESS_TOKEN_COOKIE_NAME', 'access_token'),
        path=cookie_settings.get('COOKIE_PATH', '/'),
        domain=cookie_settings.get('COOKIE_DOMAIN', None),
    )

    response.delete_cookie(
        key=cookie_settings.get('REFRESH_TOKEN_COOKIE_NAME', 'refresh_token'),
        path=cookie_settings.get('COOKIE_PATH', '/'),
        domain=cookie_settings.get('COOKIE_DOMAIN', None),
    )

    return response


class JWTLoginView(APIView):
    """
    JWT Login endpoint that sets httpOnly cookies.

    POST /api/auth/jwt/login/
    Body: { "pno": "...", "login_pwd": "..." }

    Response: User info (tokens are set as httpOnly cookies)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Get credentials from request
            data = request.data
            pno = data.get('pno')
            password = data.get('login_pwd')

            # Validate input
            if not pno or not password:
                return Response(
                    {'success': False, 'message': 'PNO and password are required.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Find user by PNO
            user = Users.objects.filter(pno=pno).first()
            if not user:
                return Response(
                    {'success': False, 'message': 'Invalid credentials'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Get stored password hash
            stored_hash = user.login_pwd

            # Handle Grails bcrypt format ($2y$ -> $2b$)
            if stored_hash and stored_hash.startswith('$2y$'):
                stored_hash = "$2b$" + stored_hash[4:]

            # Verify password
            try:
                password_match = bcrypt.checkpw(
                    password.encode('utf-8'),
                    stored_hash.encode('utf-8')
                )
            except Exception as e:
                return Response(
                    {'success': False, 'message': 'Password verification failed'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            if not password_match:
                return Response(
                    {'success': False, 'message': 'Invalid password'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Generate JWT tokens
            tokens = JWTTokenGenerator.generate_tokens_for_user(user)

            # Get user's rank
            rank = Ranks.objects.filter(id=user.rank_id).first()
            rank_abbr = rank.abbreviation if rank else 'UNKNOWN'
            rank_name = rank.name if rank else 'Unknown'

            # Get user's qualifications
            user_quals = UserQuals.objects.filter(user_id=user.id).select_related('qual')
            quals_list = []
            for uq in user_quals:
                if uq.qual:
                    quals_list.append({
                        'id': uq.qual.id,
                        'name': uq.qual.name,
                        'abbreviation': uq.qual.abbreviation if hasattr(uq.qual, 'abbreviation') else uq.qual.name,
                    })

            # Prepare response data
            user_data = {
                'id': user.id,
                'pno': user.pno,
                'user_name': user.user_name,
                'rank_id': user.rank_id,
                'rank_abbr': rank_abbr,
                'rank_name': rank_name,
                'designation': getattr(user, 'designation', None),
                'quals': quals_list,
            }

            # Create response and set cookies
            response = Response({
                'success': True,
                'message': 'Login successful',
                'user': user_data,
            })

            # Set JWT tokens as httpOnly cookies
            response = set_jwt_cookies(response, tokens)

            # Also maintain session for backward compatibility
            request.session['user_id'] = user.id
            request.session.save()

            return response

        except json.JSONDecodeError:
            return Response(
                {'success': False, 'message': 'Invalid JSON format'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print('[JWT LOGIN ERROR]', e)
            return Response(
                {'success': False, 'message': 'Server error'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class JWTLogoutView(APIView):
    """
    JWT Logout endpoint that clears httpOnly cookies.

    POST /api/auth/jwt/logout/

    Response: Success message (cookies are cleared)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Create response
            response = Response({
                'success': True,
                'message': 'Logout successful'
            })

            # Clear JWT cookies
            response = clear_jwt_cookies(response)

            # Also clear session for backward compatibility
            try:
                request.session.flush()
            except Exception:
                pass

            return response

        except Exception as e:
            print('[JWT LOGOUT ERROR]', e)
            return Response(
                {'success': False, 'message': 'Logout failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class JWTRefreshView(APIView):
    """
    JWT Token Refresh endpoint.
    Reads refresh token from httpOnly cookie and issues new tokens.

    POST /api/auth/jwt/refresh/

    Response: Success (new tokens set as cookies)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Get refresh token from cookie
            cookie_settings = settings.JWT_COOKIE_SETTINGS
            refresh_cookie_name = cookie_settings.get('REFRESH_TOKEN_COOKIE_NAME', 'refresh_token')
            refresh_token = request.COOKIES.get(refresh_cookie_name)

            if not refresh_token:
                return Response(
                    {'success': False, 'message': 'No refresh token provided'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Generate new tokens
            try:
                tokens = JWTTokenGenerator.refresh_access_token(refresh_token)
            except Exception as e:
                # Clear invalid cookies
                response = Response(
                    {'success': False, 'message': str(e)},
                    status=status.HTTP_401_UNAUTHORIZED
                )
                response = clear_jwt_cookies(response)
                return response

            # Create response and set new cookies
            response = Response({
                'success': True,
                'message': 'Token refreshed successfully'
            })

            response = set_jwt_cookies(response, tokens)

            return response

        except Exception as e:
            print('[JWT REFRESH ERROR]', e)
            return Response(
                {'success': False, 'message': 'Token refresh failed'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class JWTUserView(APIView):
    """
    Get current authenticated user's info.
    Validates JWT from httpOnly cookie and returns user data.

    GET /api/auth/jwt/me/

    Response: Current user info
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # request.user is set by CookieJWTAuthentication
            user = request.user

            if not user or not hasattr(user, 'id'):
                return Response(
                    {'success': False, 'message': 'Not authenticated'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            # Get user's rank
            rank = Ranks.objects.filter(id=user.rank_id).first()
            rank_abbr = rank.abbreviation if rank else 'UNKNOWN'
            rank_name = rank.name if rank else 'Unknown'

            # Get user's qualifications
            user_quals = UserQuals.objects.filter(user_id=user.id).select_related('qual')
            quals_list = []
            for uq in user_quals:
                if uq.qual:
                    quals_list.append({
                        'id': uq.qual.id,
                        'name': uq.qual.name,
                        'abbreviation': uq.qual.abbreviation if hasattr(uq.qual, 'abbreviation') else uq.qual.name,
                    })

            # Prepare response data
            user_data = {
                'id': user.id,
                'pno': user.pno,
                'user_name': user.user_name,
                'rank_id': user.rank_id,
                'rank_abbr': rank_abbr,
                'rank_name': rank_name,
                'designation': getattr(user, 'designation', None),
                'quals': quals_list,
            }

            return Response({
                'success': True,
                'user': user_data
            })

        except Exception as e:
            print('[JWT USER ERROR]', e)
            return Response(
                {'success': False, 'message': 'Failed to get user info'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class JWTVerifyView(APIView):
    """
    Verify if the current JWT token is valid.
    Used by frontend to check auth status on app load.

    GET /api/auth/jwt/verify/

    Response: { success: true/false, valid: true/false }
    """
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            # Get access token from cookie
            cookie_settings = settings.JWT_COOKIE_SETTINGS
            access_cookie_name = cookie_settings.get('ACCESS_TOKEN_COOKIE_NAME', 'access_token')
            access_token = request.COOKIES.get(access_cookie_name)

            # Debug: print all cookies received
            print(f'[JWT VERIFY] All cookies: {request.COOKIES.keys()}')

            if not access_token:
                return Response({
                    'success': True,
                    'valid': False,
                    'message': 'No token present'
                })

            # Try to decode token
            decoded = JWTTokenGenerator.decode_token(access_token)

            if decoded is None:
                return Response({
                    'success': True,
                    'valid': False,
                    'message': 'Invalid token'
                })

            # Check if token is expired
            import time
            exp = decoded.get('exp', 0)
            if exp < time.time():
                return Response({
                    'success': True,
                    'valid': False,
                    'message': 'Token expired'
                })

            return Response({
                'success': True,
                'valid': True,
                'user_id': decoded.get('user_id')
            })

        except Exception as e:
            return Response({
                'success': True,
                'valid': False,
                'message': 'Token verification failed'
            })

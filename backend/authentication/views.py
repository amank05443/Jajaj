from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
import json
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

#------------------------------------------------- Import All Models Here -------------------------------------------
from userprofile.models import (Users,AircraftMasters,AircraftRoles,AircraftTypes,Customers,Quals,Ranks,
                                      FuelTanks,EcuMasters,TyrePressures,Pols,Systems)


# CSRF Token View: Ensures CSRF token is set(Aman-Jul25)
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'success': True, 'message': 'CSRF cookie set'})

# Login View: Handles user authentication
@require_POST
def login_view(request):
    try:
        # Parse the incoming JSON request body
        data = json.loads(request.body)
        pno = data.get('pno')
        password = data.get('login_pwd')

        # Check if PNO and password are provided
        if not pno or not password:
            return JsonResponse({'success': False, 'message': 'PNO and password are required.'}, status=400)

        # Attempt to find the user by PNO
        user = Users.objects.filter(pno=pno).first()

        if not user or not check_password(password, user.login_pwd):
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        # Set the user in the session after successful login
        request.session['user_id'] = user.id  # This stores the user_id in the session
        request.session.save()

        rank =Ranks.objects.filter(id=user.rank_id).first()
        rank_abbr = rank.abbreviation if rank else 'UNKNOWN'

        # Successful login
        return JsonResponse({'success': True, 'message': 'Login successful',
                             'user' : {
                                 'id':user.id,
                                 'name':user.user_name,
                                 'pno':user.pno,
                                 'rank':rank_abbr,
                                 'session_id': request.session.session_key
                             },
                             })

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON format'}, status=400)
    except KeyError as e:
        return JsonResponse({'success': False, 'message': f'Missing key: {str(e)}'}, status=400)
    except Exception as e:
        print('[ERROR]', e)
        return JsonResponse({'success': False, 'message': 'Server error'}, status=500)



#
@require_POST

def logout_view(request):
    try:
        # Clear the session
        request.session.flush()  # This clears all session data, including the user_id

        return JsonResponse({'success': True, 'message': 'Logout successful'})
    except Exception as e:
        print('[ERROR in logout]',e)
        return JsonResponse({'success':False,'message':'Logout failed'},status=500)


@csrf_protect
@require_POST
def register_view(request):
    try:
        data = json.loads(request.body)
        user_name = data.get('user_name')
        rank_id = data.get('rank_id')
        pno = data.get('pno')
        login_pwd = data.get('login_pwd')

        if not all([user_name, rank_id, pno, login_pwd]):
            return JsonResponse({'success': False, 'message': 'All fields are required'}, status=400)

        if Users.objects.filter(pno=pno).exists():
            return JsonResponse({'success': False, 'message': 'PNO already exists'}, status=409)

        hashed_password = make_password(login_pwd)

        Users.objects.create(user_name=user_name, rank_id=rank_id, pno=pno, login_pwd=hashed_password)

        return JsonResponse({'success': True, 'message': 'Profile created successfully'}, status=201)

    except Exception as e:
        print('[REGISTER ERROR]', e)
        return JsonResponse({'success': False, 'message': 'Server error'}, status=500)

        import traceback
        print('[REGISTER ERROR]',e)
        traceback.print_exc()
        return JsonResponse({'success':False,'message':'Server error'},status=500)

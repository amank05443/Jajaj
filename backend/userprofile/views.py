from django.http import JsonResponse
from django.shortcuts import render
from django.forms.models import model_to_dict
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
#------------------------------------------------- Import All Models Here -------------------------------------------
from .models.users import Users
from .models.aircraft_masters import AircraftMasters
from .models.aircraft_roles import AircraftRoles
from .models.aircraft_types import AircraftTypes
from .models.quals import Quals
from .models.ranks import Ranks
from .models.fuel_tanks import FuelTanks

#------------------------------------------------- Import All Serializers  Here -------------------------------------------
from .serializers import UsersSerializer, RanksSerializer,QualsSerializer, AircraftMastersSerializer, AircraftTypesSerializer, AircraftRolesSerializer, FuelTanksSerializer


# @api_view(['GET'])
# class AircraftDetailView(APIView):
#     def get(requests):
#         try:
#             aircraft = AircraftMasters.objects.all()
#             serializer = AircraftMastersSerializer(aircraft)
#             return Response(serializer.data)
#         except AircraftMasters.DoesNotExist:
#             return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)





@api_view(['POST'])
def create_rank(request):
    serializer = RanksSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_qual(request):
    serializer = QualsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Quals_view(ListAPIView):
    # queryset = AircraftMasters.objects.all()
    queryset = Quals.objects.all()
    serializer_class = QualsSerializer

class AircraftSideNoView(ListAPIView):
    # queryset = AircraftMasters.objects.all()
    # side_no= data.get('side_no')
    queryset = AircraftMasters.objects.all()
    serializer_class = AircraftMastersSerializer

# class AircraftAllDetailView(ListAPIView):
#     # queryset = AircraftMasters.objects.all()
#     # side_no= data.get('side_no')
#     queryset = AircraftMasters.objects.all()
#     serializer_class = AircraftMastersSerializer

# def aircraft_all_detail_view(request, side_no ):
#     data= list(AircraftMasters.objects.filter(id=side_no).values())
#     return JsonResponse(data, safe=False)

def aircraft_all_detail_view(request, side_no ):
    try:
        aircraft1= AircraftMasters.objects.get(id=side_no)
        data = model_to_dict(aircraft1)
        ac_roles_qs = AircraftRoles.objects.filter(aircraft_type_id=aircraft1.aircraft_type_id)
        ac_type = AircraftTypes.objects.get(id=aircraft1.aircraft_type_id)
        data['ac_type'] = ac_type.aircraft_name
        ac_roles = ', '.join(r.role for r in ac_roles_qs)
        data['roles'] = ac_roles
        # data = {"aircraft_type_id": aircraft1.aircraft_type_id,
        #         "aircraft_details" : aircraft1,
        #         "roles": air_roles
        #         }
        return JsonResponse(data)
    except AircraftMasters.DoesNotExist:
        return JsonResponse({"error": "<UNK>"})
class list_quals(ListAPIView):
    # queryset = Quals.objects.all()
    queryset = Quals.objects.exclude(abbreviation__isnull=True)
    serializer_class = QualsSerializer

class AircraftDetailView(APIView):
    def get(self,request,side_no,format=None):
        try:
            aircraft = AircraftMasters.objects.get(side_no=side_no)
            serializer = AircraftMastersSerializer(aircraft)
            return Response(serializer.data)
        except AircraftMasters.DoesNotExist:
            return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)


class AircraftTypeDetailsView(ListAPIView):
    queryset = AircraftTypes.objects.all()
    serializer_class = AircraftTypesSerializer

# class AircraftDetailsView(ListAPIView):
#     def get(self,request,aircraft_type_id):
#         try:
#             aircraft = AircraftMasters.objects.get(aircraft_type_id=aircraft_type_id)
#             serializer = AircraftMastersSerializer(aircraft)
#             return Response(serializer.data)
#         except AircraftMasters.DoesNotExist:
#             return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)

def AircraftDetailsView(request,aircraft_type_id):
    try:
        data = list(AircraftMasters.objects.filter(aircraft_type_id=aircraft_type_id).values())
        return JsonResponse(data,safe=False)
    except AircraftMasters.DoesNotExist:
        return Response({"error":"Aircraft not found"},status.HTTP_404_NOT_FOUND)

# CSRF Token View: Ensures CSRF token is set
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
        print(data)

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

# User Profile View: Fetch the logged-in user's data
@require_GET
def user_profile_view(request):
    # Get the user_id from the session
    user_id = request.session.get('user_id')

    if not user_id:
        return JsonResponse({'success': False, 'message': 'Not logged in'}, status=401)

    # Fetch the user from the database
    try:
        user = Users.objects.get(id=user_id)
        rank = Ranks.objects.filter(id=user.rank_id).first()
        rank_abbr = rank.abbreviation if rank else 'Unknown'
        # Return the user data (name, rank, pno)
        return JsonResponse({
            'success': True,
            'message':'Login successful',
            'user': {
                'id':user.id,
                'name': user.user_name,
                'rank': rank_abbr,
                'pno': user.pno,
                'session_id':request.session.session_key
            },

        })
    except Users.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found'}, status=404)

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
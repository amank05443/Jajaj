from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
import json
from django.views.decorators.csrf import csrf_protect
from userprofile.models.ranks import Ranks
from userprofile.models.quals import Quals
from userprofile.models.aircraft_masters import AircraftMasters
from userprofile.models.fuel_tanks import FuelTanks
from userprofile.serializers import  RanksSerializer,QualsSerializer,AircraftMastersSerializer,FuelTanksSerializer


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
        password = data.get('password')

        # Check if PNO and password are provided
        if not pno or not password:
            return JsonResponse({'success': False, 'message': 'PNO and password are required.'}, status=400)

        # Attempt to find the user by PNO
        # user = UserProfile.objects.filter(pno=pno).first()

        if not user or not check_password(password, user.password):
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)

        # Set the user in the session after successful login
        request.session['user_id'] = user.id  # This stores the user_id in the session

        # Optionally set customer info in the session
        request.session['customer'] = 'CNAMS'

        # Successful login
        return JsonResponse({'success': True, 'message': 'Login successful'})

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
        user = UserProfile.objects.get(id=user_id)
        # Return the user data (name, rank, pno)
        return JsonResponse({
            'success': True,
            'user': {
                'name': user.name,
                'rank': user.rank,
                # 'pno': user.pno
            }
        })
    except UserProfile.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found'}, status=404)

# User Profile View: Fetch the existing user's data
@require_GET
# def user_view(request):
#     pno = request.session.get('pno')
#     # def get(self, request, pno):
#     try:
#         user = UserProfile.objects.get(pno=pno)
#         # Return the user data (name, rank, pno)
#         return JsonResponse({
#             'success': True,
#             'user': {
#                 'name': user.name,
#                 'rank': user.rank,
#             }
#         })
#     except UserProfile.DoesNotExist:
#         return JsonResponse({'success': False, 'message': 'User not found'}, status=404)






    #     user = Users.objects.get(pno=pno)
    #     serializer = UsersSerializer(user)
    # #     return
    # #     Response(serializer.data, status=status.HTTP_200_OK)
    # # except Users.DoesNotExist:
    # #     return Response({'error':'User not found'}, status=status.HTTP_404_NOT_FOUND)
    #     return JsonResponse({
    #         'success': True,
    #         serializer.data
    #     }, status=status.HTTP_200_OK)
    # except UserProfile.DoesNotExist:
    #     return JsonResponse({'success': False, 'message': 'User not found'}, status=404)

# @api_view(['GET'])
# def get_user_profile(request):
#     pno = request.data.get('pno')
#     try:
#         user = User.objects.get(pno=pno)
#         serializer = UsersSerializer(user)
#         return Response(serializer.data)
#     except User.DoesNotExist:
#         return Response({"error": 'User not found'}, status=404)

# @api_view(['POST'])
# def save_user_profile(request):
#     try:
#         pno = request.data.get('pno')
#         password = request.data.get('password')
#         user = User.objects.filter(pno=pno)
#         user.password = make_password(password)
#         user.save()
#         return Response({'message': "Password set successfully AK"})
#     except User.DoesNotExist:
#         return Response({"error": 'User not found'}, status=404)

# @api_view(['GET'])
# def check_user_by_pno(request, pno):
#     if not pno:
#         return JsonResponse({'error': 'PNO is required'}, status=400)
#     if pno:
#         return JsonResponse({'error1': 'PNO is available'}, status=400)
#     try:
#         user = User.objects.get(pno=pno)
#         # return JsonResponse({'exists': True, 'name': user.userName, "rank": user.rank})
#         return JsonResponse({
#             'success': True,
#             'user': {
#                 'name': user.name,
#                 'rank': user.rank,
#                 # 'pno': user.pno
#             }
#         })
#     except User.DoesNotExist:
#         # return JsonResponse({"exists": False})
#         return JsonResponse({'success': False, 'message': 'User not found'}, status=404)
#
# @require_POST
# def submit_user_data(request):
#     data = json.loads(request.body)
#     pno = data.get('pno')
#     name = data.get('name')
#     rank = data.get('rank')
#     password = data.get('password')
#
#     # global pno, name, rank, password
#     # if request.method == 'POST':
#
#     if not all([name, rank, pno, password]):
#             return JsonResponse({'success': False, 'message': 'All fields are required'}, status=400)
#
#     User.objects.create_or_update(name=name, rank=rank, pno=pno, password=password
#         # pno=pno,
#         # defaults={
#         #     'name': name,
#         #     'rank': rank,
#         #     'password': password
#         # }
#     )
#     return JsonResponse({'success': True, 'message': 'Profile created successfully'}, status=201)

@require_POST
def logout_view(request):
        # Clear the session
        request.session.flush()  # This clears all session data, including the user_id

        return JsonResponse({'success': True, 'message': 'Logout successful'})

@csrf_protect
@require_POST
def register_view(request):
    try:
        data = json.loads(request.body)
        name = data.get('name')
        rank = data.get('rank')
        pno = data.get('pno')
        password = data.get('password')

        if not all([name, rank, pno, password]):
            return JsonResponse({'success': False, 'message': 'All fields are required'}, status=400)

        # if UserProfile.objects.filter(pno=pno).exists():
        #     return JsonResponse({'success': False, 'message': 'PNO already exists'}, status=409)

        hashed_password = make_password(password)
        # UserProfile.objects.create(name=name, rank=rank, pno=pno, password=hashed_password)

        return JsonResponse({'success': True, 'message': 'Profile created successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print('[REGISTER ERROR]', e)
        return JsonResponse({'success': False, 'message': 'Server error'}, status=500)
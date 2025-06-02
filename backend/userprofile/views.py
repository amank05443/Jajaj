from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
# from .models import AircraftUnserviceable
# from .serializers import AircraftUnserviceableSerializer
import json
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.csrf import csrf_protect
# from rest_framework.response import Response
# from rest_framework import status


# CSRF Token View: Ensures CSRF token is set
@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'success': True, 'message': 'CSRF cookie set'})

# Login View: Handles user authentication
@require_POST
# def login_view(request):
#     try:
#         # Parse the incoming JSON request body
#         data = json.loads(request.body)
#         pno = data.get('pno')
#         password = data.get('password')
#
#         # Check if PNO and password are provided
#         if not pno or not password:
#             return JsonResponse({'success': False, 'message': 'PNO and password are required.'}, status=400)
#
#         # Attempt to find the user by PNO
#         user = UserProfile.objects.filter(pno=pno).first()
#
#         if not user or not check_password(password, user.password):
#             return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
#
#         # Set the user in the session after successful login
#         request.session['user_id'] = user.id  # This stores the user_id in the session
#
#         # Optionally set customer info in the session
#         request.session['customer'] = 'CNAMS'
#
#         # Successful login
#         return JsonResponse({'success': True, 'message': 'Login successful'})
#
#     except json.JSONDecodeError:
#         return JsonResponse({'success': False, 'message': 'Invalid JSON format'}, status=400)
#     except KeyError as e:
#         return JsonResponse({'success': False, 'message': f'Missing key: {str(e)}'}, status=400)
#     except Exception as e:
#         print('[ERROR]', e)
#         return JsonResponse({'success': False, 'message': 'Server error'}, status=500)
#
# # User Profile View: Fetch the logged-in user's data
# @require_GET
# def user_profile_view(request):
#     # Get the user_id from the session
#     user_id = request.session.get('user_id')
#
#     if not user_id:
#         return JsonResponse({'success': False, 'message': 'Not logged in'}, status=401)
#
#     # Fetch the user from the database
#     try:
#         user = UserProfile.objects.get(id=user_id)
#         # Return the user data (name, rank, pno)
#         return JsonResponse({
#             'success': True,
#             'user': {
#                 'name': user.name,
#                 'rank': user.rank,
#                 'pno': user.pno
#             }
#         })
#     except UserProfile.DoesNotExist:
#         return JsonResponse({'success': False, 'message': 'User not found'}, status=404)

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

        if UserProfile.objects.filter(pno=pno).exists():
            return JsonResponse({'success': False, 'message': 'PNO already exists'}, status=409)

        hashed_password = make_password(password)
        UserProfile.objects.create(name=name, rank=rank, pno=pno, password=hashed_password)

        return JsonResponse({'success': True, 'message': 'Profile created successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        print('[REGISTER ERROR]', e)
        return JsonResponse({'success': False, 'message': 'Server error'}, status=500)

# class AircraftUnserviceableCreateView(generics.CreateAPIView):
#     queryset = AircraftUnserviceable.objects.all()
#     serializer_class = AircraftUnserviceableSerializer
#
#     def create(self,request,*args,**kwargs):
#         print("incoming data:",request.data)
#
#         serializer = (
#             self.get_serializer(data=request.data))
#         if serializer.is_valid():
#             self.perform_create(serializer)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print("Serializer errors:", serializer.errors)
#             return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


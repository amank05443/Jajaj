from django.http import JsonResponse
from django.shortcuts import render
from django.forms.models import model_to_dict
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from userprofile.serializers import  (RanksSerializer,AircraftMastersSerializer,UsersSerializer,
                                      get_dynamic_serializer,QualsSerializer)


#---Added by Abhishek Singh on 13jun25 for Dynamic views and urls
from django.apps import apps
from django.core.exceptions import ObjectDoesNotExist

from rest_framework.viewsets import ViewSet

#------------------------------------------------- Import All Models Here -------------------------------------------
from userprofile.models import (Users,AircraftMasters,AircraftRoles,AircraftTypes,Customers,Quals,Ranks,
                                      FuelTanks,EcuMasters,TyrePressures,Pols,Systems)
# Create your views here.

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
    queryset = Quals.objects.exclude(abbreviation__isnull=True)
    serializer_class = QualsSerializer

# User Profile View: Fetch the logged-in user's data (Aman)
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


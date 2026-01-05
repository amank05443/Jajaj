from datetime import datetime
from django.db import transaction
from django.db.models import Max
from django.http import JsonResponse
from rest_framework import status, generics
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import (AircraftMasters,AircraftTypes,Users,UserQuals,Quals,)
from ..serializers import (UsersSerializer,UsersSerializerForFlyingOps,UserQualsSerializer,UserQualsSerializerForFlyingOps)

@api_view(['GET'])
def select_search(request):
    q = request.GET.get('q')

    if len(q) < 3:
        return Response([])

    data =(
        Users.objects.filter(
            Q(user_name__icontains=q) | Q(pno__icontains=q)
        )
        .prefetch_related(
            'userQualsTrade',
            'userQualsTrade__qual'
        )
    )

    results = []

    for records in data:
        for rec in records.userQualsTrade.all():
            results.append(UserQualsSerializerForFlyingOps(rec).data)

    return Response(results)
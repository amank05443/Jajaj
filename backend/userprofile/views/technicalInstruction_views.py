from django.http import JsonResponse
from ..models import (Items)


def get_partNumbers(request):
    items = Items.objects.all().distinct()
    data = list(items.values("id", "part_number", "description"))
    return JsonResponse(data, safe=False)
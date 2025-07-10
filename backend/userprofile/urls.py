from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import login_view, get_csrf_token, user_profile_view, logout_view, register_view, create_rank, create_qual,list_quals, AircraftDetailView
from . import views
from .views import (login_view, get_csrf_token, user_profile_view, logout_view, register_view, create_rank, create_qual,
                   list_quals, AircraftDetailView, AircraftSideNoView, aircraft_all_detail_view, Quals_view,AircraftTypeDetailsView,AircraftDetailsView,DynamicModelView)


dynamic_view = DynamicModelView.as_view({
    'get':'list',
    'post': 'post',
})
detail_view = DynamicModelView.as_view({
    'get':'get',
    'put':'put',
    'patch':'put',
})



urlpatterns = [
    path('login/', login_view, name='login'),
    path('csrf/', get_csrf_token, name='csrf'),  # Endpoint to get CSRF token
    path('user-profile/', user_profile_view, name='user_profile'),  # User profile data
    path('logout/', logout_view, name='logout'),  # Add the logout URL
    path('register/', register_view, name='register'),
    path('api/qualsData', Quals_view.as_view(), name='AircraftDetailView'),
    path('api/aircraftSideNo/', AircraftSideNoView.as_view(), name='AircraftDetailView'),
    path('api/leadingParticularsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/VariableExpandableLoadItemsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/ranks', create_rank, name='create_rank'),
    path('api/quals', create_qual, name='create_qual'),
    path('api/qualsData', list_quals.as_view(), name='list_qual'),
    path('api/aircraft-type-details', AircraftTypeDetailsView.as_view(), name='aircraft-type-details'),
    path('api/aircraft-details/<int:aircraft_type_id>', views.AircraftDetailsView, name='aircraft-details'),

    #Dynamic views & urls
    path('api/<str:table>/',dynamic_view),
    path('api/<str:table>/<int:pk>/', detail_view),

    # --useParams()---
    path('api/params/get/', views.get_params),
    path('api/params/set/', views.set_params),
]


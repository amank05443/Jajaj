from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import (  get_customers,DynamicModelView,AircraftDetailView,Quals_view,aircraft_all_detail_view, AircraftTypeDetailsView,AircraftDetailsView,
                                 ChangeOfServiceabilityLogsCreateView,user_details_for_authentication_one, user_details_for_authentication,check_passkey_authentication,
                                 user_user_authentication_for_trade, user_user_qualification_for_authentication)
from . import views


dynamic_view = DynamicModelView.as_view({
    'get':'list',
    'post': 'post',
    'delete':'delete'
})
detail_view = DynamicModelView.as_view({
    'get':'get',
    'put':'put',
    'patch':'put',
    'delete':'delete'
})



urlpatterns = [

    path('api/qualsData', Quals_view.as_view(), name='AircraftDetailView'),
    path('api/leadingParticularsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/VariableExpandableLoadItemsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/BasicWeightAndMomentsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),

    path('api/aircraft-type-details', AircraftTypeDetailsView.as_view(), name='aircraft-type-details'),
    path('api/aircraft-details/<int:aircraft_type_id>', views.AircraftDetailsView, name='aircraft-details'),
    path('api/customers/',get_customers,name='get_customers'),
    path('api/serviceability-log/',ChangeOfServiceabilityLogsCreateView.as_view(),name='serviceability-log'),

    path('api/userDetailsForAuthenticationAllUsers/',views.user_details_for_authentication_one,name='viewUserDetailsForAuthentication'),
    path('api/userAuthenticationTrade/',views.user_user_authentication_for_trade,name='viewUserAuthenticationForTrade'),
    path('api/userQualification/',views.user_user_qualification_for_authentication,name='viewUserQualificationForAuthentication'),
    path('api/userDetailsForAuthentication/<int:id>/',views.user_details_for_authentication,name='viewUserDetailsForAuthentication'),
    path('api/checkPasskey/',views.check_passkey_authentication,name='checkPasskeyForAuthentication'),

    #Dynamic views & urls
    path('api/<str:table>/',dynamic_view),
    path('api/<str:table>/<int:pk>/', detail_view),

    # --useParams()---
    path('api/params/get/', views.get_params),
    path('api/params/set/', views.set_params),
]


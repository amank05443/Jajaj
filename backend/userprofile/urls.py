from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import (
    DynamicModelView, get_params, set_params,get_customers, AircraftDetailsView, AircraftTypeDetailsView, aircraft_all_detail_view, check_passkey_authentication,
    user_details_for_authentication, user_details_for_authentication_one,user_authentication_for_trade,user_qualification_for_authentication,Quals_view,
    ChangeOfServiceabilityLogsCreateView,usLogDropDowns,limLogData
)


    #---------------------------------------------- For Dynamic View ---------------------------------------------------#
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
    #------------------------------------------------ Test & View ------------------------------------------------------#
    path('api/qualsData', Quals_view.as_view(), name='AircraftDetailView'),
    path('api/VariableExpandableLoadItemsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/aircraft-type-details', AircraftTypeDetailsView.as_view(), name='aircraft-type-details'),
    path('api/aircraft-details/<int:aircraft_type_id>', AircraftDetailsView, name='aircraft-details'),
    path('api/customers/',get_customers,name='get_customers'),

    path('api/usLogDropDowns/',usLogDropDowns),
    path('api/limLogData/',limLogData),

    path('api/serviceability-log/',ChangeOfServiceabilityLogsCreateView.as_view(),name='serviceability-log'),


    #---------------------------------------------- Section 1  ---------------------------------------------------------#
    path('api/leadingParticularsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),

    #---------------------------------------------- Section 5  ---------------------------------------------------------#
    path('api/serviceability-log/',ChangeOfServiceabilityLogsCreateView.as_view(), name='serviceability-log'),


    #-------------------------------------------- Section 9 & 10 -------------------------------------------------------#
    path('api/BasicWeightAndMomentsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),


    #--------------------------------------------- e-sign Authentication  ----------------------------------------------#
    path('api/userDetailsForAuthenticationAllUsers/', user_details_for_authentication_one, name='viewUserDetailsForAuthentication'),
    path('api/checkPasskey/', check_passkey_authentication, name='checkPasskeyForAuthentication'),
    path('api/userAuthenticationTrade/', user_authentication_for_trade, name='viewUserAuthenticationForTrade'),
    path('api/userQualification/', user_qualification_for_authentication, name='viewUserQualificationForAuthentication'),
    path('api/userDetailsForAuthentication/<int:id>/', user_details_for_authentication, name='viewUserDetailsForAuthentication'),


    #--------------------------------------------- Dynamic views & urls  -----------------------------------------------#
    path('api/<str:table>/',dynamic_view),
    path('api/<str:table>/<int:pk>/', detail_view),


    #-------------------------------------------------- useParams()  ---------------------------------------------------#
    path('api/params/get/', get_params),
    path('api/params/set/', set_params),





]


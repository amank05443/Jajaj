from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import (
    DynamicModelView, get_params, set_params,get_customers,data_for_headers, AircraftDetailsView, AircraftTypeDetailsView, aircraft_all_detail_view, check_passkey_authentication,
    user_details_for_authentication_one,check_passkey_authentication_right_side,user_authentication_for_trade,user_details_for_authentication_two,remove_user,
    Quals_view,ChangeOfServiceabilityLogsCreateView,usLogDropDowns,limLogData,saveUsLogData,clearUsLog,LimGridData,fetch_authenticated_data,forward_to_ato_for_authorisation,
    softwareLogData, check_passkey_authentication_right_side_limitation,get_partNumbers,
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
    #------------------------------------------------ Headers ------------------------------------------------------#
    path('api/headersData/<int:id>/', data_for_headers, name='dataForHeaders'),
    #------------------------------------------------ Test & View ------------------------------------------------------#
    path('api/qualsData', Quals_view.as_view(), name='AircraftDetailView'),
    path('api/VariableExpandableLoadItemsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/aircraft-type-details', AircraftTypeDetailsView.as_view(), name='aircraft-type-details'),
    path('api/aircraft-details/<int:aircraft_type_id>', AircraftDetailsView, name='aircraft-details'),
    path('api/customers/',get_customers,name='get_customers'),

    # --------------------------------------------- e-sign Authentication  ----------------------------------------------#
    path('api/userDetailsForAuthenticationAllUsers/<int:id>/', user_details_for_authentication_one, name='viewUserDetailsForAuthentication'),
    path('api/fetchSavedEntries/', fetch_authenticated_data, name='fetchAuthenticatedData'),
    path('api/forwardToAtoForAuthorisation/', forward_to_ato_for_authorisation, name='forwardToAtoForAuthorisation'),
    path('api/checkPasskey/', check_passkey_authentication, name='checkPasskeyForAuthentication'),
    path('api/checkPasskeyRightSide/', check_passkey_authentication_right_side, name='checkPasskeyForAuthentication'),
    path('api/checkPasskeyRightSideLimitation/', check_passkey_authentication_right_side_limitation, name='checkPasskeyForAuthentication'),
    path('api/removeUser/', remove_user, name='removeExistingUser'),
    path('api/userAuthenticationTrade/', user_authentication_for_trade, name='viewUserAuthenticationForTrade'),
    path('api/userAllDetailsForAuthenticationTwo/', views.user_details_for_authentication_two,
         name='viewUserDetailsForAuthenticationTwo'),
    # path('api/userQualification/', user_qualification_for_authentication, name='viewUserQualificationForAuthentication'),
    # path('api/userDetailsForAuthenticationTwo/', user_details_for_authentication, name='viewUserDetailsForAuthentication'),


    # ------------------------------------------- Security questions ---------------------------------------------------#

    path("api/get_security_questions/", views.get_security_questions, name="get_security_questions"),
    path("api/validate_password/", views.validate_password, name="validate_password"),
    path("api/reset_passcode/", views.reset_passcode, name="reset_passcode"),
    path("api/validate_security_answer/", views.validate_security_answer, name="validate_password"),

    path('api/serviceability-log/', ChangeOfServiceabilityLogsCreateView.as_view(), name='serviceability-log'),

    #---------------------------------------------- Section 1  ---------------------------------------------------------#
    path('api/leadingParticularsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),



    #---------------------------------------------- Section 2  ---------------------------------------------------------#
    path('api/limGridData/<int:id>/', LimGridData.as_view(), name='LimGridData'),




    #---------------------------------------------- Section 5  ---------------------------------------------------------#
    path('api/usLogDropDowns/', usLogDropDowns),
    path('api/limLogData/', limLogData),
    path('api/serviceability-log/<int:id>/', ChangeOfServiceabilityLogsCreateView.as_view(), name='serviceability-log'),
    path('api/softwareLogData/', softwareLogData),
    path('api/saveUsLogData/', views.saveUsLogData, name='saveUsLogData'),
    path('api/clearUsLog/', clearUsLog),
    path('api/serviceability-log/',ChangeOfServiceabilityLogsCreateView.as_view(), name='serviceability-log'),


    #-------------------------------------------- Section 9 & 10 -------------------------------------------------------#
    path('api/BasicWeightAndMomentsOfAircraft/<int:id>/', aircraft_all_detail_view, name='AircraftAllDetailView'),



    #--------------------------------------------- Dynamic views & urls  -----------------------------------------------#
    path('api/<str:table>/',dynamic_view),
    path('api/<str:table>/<int:pk>/', detail_view),


    #-------------------------------------------------- useParams()  ---------------------------------------------------#
    path('api/params/get/', get_params),
    path('api/params/set/', set_params),
    path("api/get_user_details/<str:pno>/", views.get_user_details, name="get_user_details"),
#-------------------------------------------------- technicalInstructions()  ---------------------------------------------------#
    path('api/fetchAllPartNumbers/', views.get_partNumbers, name='technicalInstructions'),


]


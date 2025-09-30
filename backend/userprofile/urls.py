from userprofile import views
from django.test import TestCase
from django.urls import path
from userprofile.views import (  get_customers,DynamicModelView,AircraftDetailView,AircraftSideNoView,Quals_view,
                                 aircraft_all_detail_view, AircraftTypeDetailsView,AircraftDetailsView,ChangeOfServiceabilityLogsCreateView)
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
    path("api/get_security_questions/", views.get_security_questions, name="get_security_questions"),
    path("api/validate_password/", views.validate_password, name="validate_password"),
    path("api/reset_passcode/", views.reset_passcode, name="reset_passcode"),
    path("api/validate_security_answer/", views.validate_security_answer, name="validate_password"),
    path('api/qualsData', Quals_view.as_view(), name='AircraftDetailView'),
    path('api/aircraftSideNo/', AircraftSideNoView.as_view(), name='AircraftDetailView'),
    path('api/leadingParticularsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/VariableExpandableLoadItemsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),
    path('api/BasicWeightAndMomentsOfAircraft/<int:id>/', views.aircraft_all_detail_view, name='AircraftAllDetailView'),

    path('api/aircraft-type-details', AircraftTypeDetailsView.as_view(), name='aircraft-type-details'),
    path('api/aircraft-details/<int:aircraft_type_id>', views.AircraftDetailsView, name='aircraft-details'),
    path('api/customers/',get_customers,name='get_customers'),
    path('api/serviceability-log/',ChangeOfServiceabilityLogsCreateView.as_view(),name='serviceability-log'),

    #Dynamic views & urls
    path('api/<str:table>/',dynamic_view),
    path('api/<str:table>/<int:pk>/', detail_view),

    # --useParams()---
    path('api/params/get/', views.get_params),
    path('api/params/set/', views.set_params),
    path("api/get_user_details/<str:pno>/", views.get_user_details, name="get_user_details"),


]


from userprofile import views
from django.urls import path
from .views import change_of_serviceability_logs_pdf
from .views import aircraft_pdf
from .views import booklet_pdf


urlpatterns = [
    path("aircraft/pdf/<int:id>/", aircraft_pdf, name="aircraft_pdf"),
    path("sec5/pdf/<int:id>/", change_of_serviceability_logs_pdf, name="change_of_serviceability_logs_pdf"),
    path("booklet_pdf/pdf/", booklet_pdf, name="booklet_pdf"),
]
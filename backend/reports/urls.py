from userprofile import views
from django.urls import path
from .views import aircraft_pdf
from .views import booklet_pdf


urlpatterns = [
    path("aircraft/pdf/", aircraft_pdf, name="aircraft_pdf"),
    path("booklet_pdf/pdf/", booklet_pdf, name="booklet_pdf"),
]
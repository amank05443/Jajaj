from userprofile import views
from django.urls import path
from .views import change_of_serviceability_logs_pdf
from .views import aircraft_pdf
from .views import booklet_pdf
from .views import Mod703B
from .views import MODForm704A
from .views import MODForm712A
from .views import MODForm702
from .views import MODForm710


urlpatterns = [
    path("aircraft/pdf/<int:id>/", aircraft_pdf, name="aircraft_pdf"),
    path("sec5/pdf/<int:id>/", change_of_serviceability_logs_pdf, name="change_of_serviceability_logs_pdf"),
    path("handlePrintMod703B/pdf/<int:id>/", Mod703B, name="Mod703B"),
    path("handlePrintMODForm704A/pdf/<int:id>/", MODForm704A, name="MODForm704A"),
    path("handlePrintMODForm712A/pdf/<int:id>/", MODForm712A, name="MODForm712A"),
    path("handlePrintMODForm702/pdf/<int:id>/", MODForm702, name="MODForm702"),
    path("handlePrintMODForm710/pdf/<int:id>/", MODForm710, name="MODForm710"),
    path("booklet_pdf/pdf/", booklet_pdf, name="booklet_pdf"),
]
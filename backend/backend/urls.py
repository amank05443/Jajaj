

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView  # Import RedirectView
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', RedirectView.as_view(url='/admin/')),  # Redirect root URL to /admin/
    path('', include('userprofile.urls')),  # include your app routes
    path('', include('authentication.urls')),  # include your app routes
    path('', include('profiles.urls')),  # include your app routes
    path('', include('reports.urls')),  # include your app routes

    # path('api/', include('api.urls')),
]






"""Root URL configuration for the TechnoLearn API."""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("courses.urls")),
]

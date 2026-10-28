from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok", "project": "TechnoLearn API", "version": "1.0"})

def api_root(request):
    return JsonResponse({
        "categories": "/api/categories/",
        "courses": "/api/courses/",
        "featured": "/api/courses/featured/",
        "course_detail": "/api/courses/<slug>/",
        "health": "/api/health/"
    })

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/health/", health),
    path("api/", api_root),
    path("api/categories/", include("apps.categories.urls")),
    path("api/courses/", include("apps.courses.urls")),
]

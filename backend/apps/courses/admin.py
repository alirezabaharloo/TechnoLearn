from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "instructor_name", "price", "status", "is_featured", "is_published")
    list_filter = ("status", "category", "is_featured")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "instructor_name")

from django.contrib import admin

from .models import Category, Course


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "id")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "slug",
        "category",
        "instructor_name",
        "price",
        "discount_price",
        "lesson_count",
        "rating",
        "status",
        "created_at",
    )
    list_filter = ("status", "category")
    search_fields = ("title", "instructor_name", "slug")
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ("status",)

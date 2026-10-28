from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    category_color = serializers.CharField(source="category.color", read_only=True)
    final_price = serializers.IntegerField(read_only=True)
    has_discount = serializers.BooleanField(read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    level_display = serializers.CharField(source="get_level_display", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id", "title", "slug", "short_description", "description",
            "instructor_name", "instructor_avatar", "category", "category_name", "category_slug", "category_color",
            "cover_image", "price", "discounted_price", "final_price", "has_discount", "discount_percent",
            "status", "status_display", "level", "level_display",
            "duration_hours", "lessons_count", "is_featured", "created_at", "updated_at"
        ]

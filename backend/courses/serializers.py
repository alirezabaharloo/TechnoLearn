from rest_framework import serializers

from .models import Category, Course


class CategorySerializer(serializers.ModelSerializer):
    course_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "description", "course_count")


class CourseCategorySerializer(serializers.ModelSerializer):
    """The nested category does not need a separate course-count query."""
    class Meta:
        model = Category
        fields = ("id", "name", "slug", "description")


class CourseSerializer(serializers.ModelSerializer):
    category = CourseCategorySerializer(read_only=True)
    price = serializers.DecimalField(max_digits=12, decimal_places=2, coerce_to_string=False)
    discount_price = serializers.DecimalField(max_digits=12, decimal_places=2, coerce_to_string=False, allow_null=True)
    rating = serializers.DecimalField(max_digits=3, decimal_places=1, coerce_to_string=False, allow_null=True)

    class Meta:
        model = Course
        fields = (
            "id", "title", "slug", "description", "short_description", "thumbnail",
            "category", "instructor_name", "price", "discount_price", "duration",
            "lesson_count", "rating", "status", "created_at", "updated_at",
        )
        read_only_fields = fields

from rest_framework import serializers

from .models import Category, Course


class CategorySerializer(serializers.ModelSerializer):
    """Serializes a category, including how many published courses it has."""

    course_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "description", "course_count")

    def get_course_count(self, obj: Category) -> int:
        return obj.courses.filter(status=Course.Status.PUBLISHED).count()


class CourseSerializer(serializers.ModelSerializer):
    """Serializes a course, nesting its category."""

    category = CategorySerializer(read_only=True)
    price = serializers.DecimalField(
        max_digits=8, decimal_places=2, coerce_to_string=False
    )
    rating = serializers.DecimalField(
        max_digits=3, decimal_places=1, coerce_to_string=False, allow_null=True
    )

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "slug",
            "description",
            "short_description",
            "thumbnail",
            "category",
            "instructor_name",
            "price",
            "duration",
            "lesson_count",
            "rating",
            "status",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("created_at", "updated_at")

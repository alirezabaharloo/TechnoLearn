from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    courses_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "icon", "color", "courses_count", "created_at"]

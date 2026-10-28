from rest_framework import generics
from django.db.models import Count
from .models import Category
from .serializers import CategorySerializer

class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.annotate(courses_count=Count("courses")).order_by("id")

    def get_queryset(self):
        return Category.objects.annotate(courses_count=Count("courses")).order_by("id")

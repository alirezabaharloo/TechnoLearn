from rest_framework import generics, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Course
from .serializers import CourseSerializer

class StandardPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 24

class CourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["category__slug", "status", "level"]
    search_fields = ["title", "short_description", "instructor_name"]
    ordering_fields = ["created_at", "price", "discounted_price", "title"]
    ordering = ["-created_at"]

    def get_queryset(self):
        qs = Course.objects.filter(is_published=True).select_related("category")
        # custom category filter via ?category=slug
        category_slug = self.request.query_params.get("category")
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        # ordering: support ?ordering=cheapest etc via mapping
        ordering = self.request.query_params.get("ordering")
        if ordering == "cheapest":
            qs = qs.order_by("price")
        elif ordering == "expensive":
            qs = qs.order_by("-price")
        elif ordering == "newest":
            qs = qs.order_by("-created_at")
        elif ordering == "oldest":
            qs = qs.order_by("created_at")
        return qs

class FeaturedCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    pagination_class = None

    def get_queryset(self):
        return Course.objects.filter(is_published=True, is_featured=True).select_related("category")[:8]

class CourseDetailView(generics.RetrieveAPIView):
    serializer_class = CourseSerializer
    lookup_field = "slug"
    queryset = Course.objects.filter(is_published=True).select_related("category")

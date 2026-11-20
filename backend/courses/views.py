from rest_framework import generics

from .models import Category, Course
from .pagination import StandardPagination
from .serializers import CategorySerializer, CourseSerializer


class CategoryListView(generics.ListAPIView):
    """GET /api/categories/ — list all categories (not paginated)."""

    serializer_class = CategorySerializer
    pagination_class = None
    queryset = Category.objects.all()


class CourseListView(generics.ListAPIView):
    """GET /api/courses/ — list published courses with search and filtering.

    Supported query parameters:
      - ``search``: case-insensitive match against the course title.
      - ``category``: filter by category slug.
      - ``page`` / ``page_size``: pagination controls.
    """

    serializer_class = CourseSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        params = self.request.query_params
        queryset = (
            Course.objects.select_related("category")
            .filter(status=Course.Status.PUBLISHED)
            .order_by("-created_at", "-id")
        )

        search = params.get("search") or params.get("q")
        if search:
            term = search.strip()
            if term:
                queryset = queryset.filter(title__icontains=term)

        category = params.get("category")
        if category:
            queryset = queryset.filter(category__slug=category.strip())

        return queryset


class CourseDetailView(generics.RetrieveAPIView):
    """GET /api/courses/<slug>/ — retrieve a single published course."""

    serializer_class = CourseSerializer
    lookup_field = "slug"
    queryset = Course.objects.select_related("category").filter(
        status=Course.Status.PUBLISHED
    )

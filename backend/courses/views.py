from django.db.models import Case, Count, F, Q, When
from rest_framework import generics

from .models import Category, Course
from .pagination import StandardPagination
from .serializers import CategorySerializer, CourseSerializer


class CategoryListView(generics.ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None
    queryset = Category.objects.annotate(
        course_count=Count("courses", filter=Q(courses__status=Course.Status.PUBLISHED))
    )


class CourseListView(generics.ListAPIView):
    """Published courses; popularity is represented by rating, not enrollments."""
    serializer_class = CourseSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        params = self.request.query_params
        queryset = Course.objects.select_related("category").filter(status=Course.Status.PUBLISHED)
        search = (params.get("search") or params.get("q") or "").strip()
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(short_description__icontains=search)
                | Q(instructor_name__icontains=search) | Q(category__name__icontains=search)
            )
        category = (params.get("category") or "").strip()
        if category:
            queryset = queryset.filter(category__slug=category)
        sort = params.get("sort", "newest")
        if sort == "popular":
            return queryset.order_by(F("rating").desc(nulls_last=True), "-created_at", "-id")
        if sort in ("price_asc", "price_desc"):
            queryset = queryset.annotate(effective_price=Case(
                When(discount_price__lt=F("price"), then=F("discount_price")),
                default=F("price"), output_field=Course._meta.get_field("price"),
            ))
            return queryset.order_by("effective_price" if sort == "price_asc" else "-effective_price", "-id")
        return queryset.order_by("-created_at", "-id")


class CourseDetailView(generics.RetrieveAPIView):
    # Preserve the existing read-only endpoint for clients already using it.
    serializer_class = CourseSerializer
    lookup_field = "slug"
    queryset = Course.objects.select_related("category").filter(status=Course.Status.PUBLISHED)

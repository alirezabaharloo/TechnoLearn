from django.urls import path
from .views import CourseListView, FeaturedCourseListView, CourseDetailView

urlpatterns = [
    path("", CourseListView.as_view(), name="course-list"),
    path("featured/", FeaturedCourseListView.as_view(), name="course-featured"),
    path("<slug:slug>/", CourseDetailView.as_view(), name="course-detail"),
]

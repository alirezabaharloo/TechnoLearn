from django.test import TestCase

from courses.models import Category, Course


class CategoryModelTests(TestCase):
    def test_str_returns_name(self):
        category = Category.objects.create(name="Motion Graphics", slug="motion-graphics")
        self.assertEqual(str(category), "Motion Graphics")

    def test_defaults(self):
        category = Category.objects.create(name="Programming", slug="programming")
        self.assertEqual(category.description, "")


class CourseModelTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Programming", slug="programming")

    def test_str_returns_title(self):
        course = Course.objects.create(
            title="Programming with AI",
            slug="programming-with-ai",
            description="desc",
            category=self.category,
            instructor_name="Priya Nair",
        )
        self.assertEqual(str(course), "Programming with AI")

    def test_defaults(self):
        course = Course.objects.create(
            title="A Course",
            slug="a-course",
            description="desc",
            category=self.category,
            instructor_name="Someone",
        )
        self.assertEqual(course.status, Course.Status.DRAFT)
        self.assertEqual(course.price, 0)
        self.assertEqual(course.lesson_count, 0)
        self.assertIsNone(course.rating)

    def test_default_ordering_is_newest_first(self):
        first = Course.objects.create(
            title="First", slug="first", description="d", category=self.category, instructor_name="A"
        )
        second = Course.objects.create(
            title="Second", slug="second", description="d", category=self.category, instructor_name="B"
        )
        self.assertGreater(second.created_at, first.created_at)
        self.assertEqual(list(Course.objects.all()), [second, first])

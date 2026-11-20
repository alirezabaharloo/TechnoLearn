from django.test import TestCase
from rest_framework.test import APIClient

from courses.models import Category, Course


class CategoryApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Motion Graphics", slug="motion-graphics", description="Animate with AI."
        )

    def test_list_categories(self):
        response = self.client.get("/api/categories/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        category = data[0]
        self.assertEqual(category["name"], "Motion Graphics")
        self.assertEqual(category["slug"], "motion-graphics")
        self.assertIn("course_count", category)


class CourseApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.programming = Category.objects.create(name="Programming", slug="programming")
        self.graphics = Category.objects.create(name="Graphic Design", slug="graphic-design")

        self.published = Course.objects.create(
            title="Programming with AI Coding Agents",
            slug="programming-with-ai",
            description="Long description",
            short_description="Short",
            thumbnail="https://example.com/thumb.jpg",
            category=self.programming,
            instructor_name="Priya Nair",
            price=129.00,
            duration="10h 00m",
            lesson_count=36,
            rating=4.9,
            status=Course.Status.PUBLISHED,
        )
        self.other = Course.objects.create(
            title="Designing Brand Assets with AI",
            slug="designing-brand-assets",
            description="Long description",
            short_description="Short",
            category=self.graphics,
            instructor_name="Sofia Alvarez",
            price=82.00,
            duration="6h 00m",
            lesson_count=21,
            rating=4.7,
            status=Course.Status.PUBLISHED,
        )
        self.draft = Course.objects.create(
            title="Draft Course Title",
            slug="draft-course",
            description="Long description",
            short_description="Short",
            category=self.programming,
            instructor_name="Someone",
            status=Course.Status.DRAFT,
        )

    def test_list_only_published(self):
        response = self.client.get("/api/courses/")
        self.assertEqual(response.status_code, 200)
        slugs = [c["slug"] for c in response.json()["results"]]
        self.assertIn("programming-with-ai", slugs)
        self.assertNotIn("draft-course", slugs)

    def test_search_by_title(self):
        response = self.client.get("/api/courses/", {"search": "Programming"})
        self.assertEqual(response.status_code, 200)
        slugs = [c["slug"] for c in response.json()["results"]]
        self.assertIn("programming-with-ai", slugs)
        self.assertNotIn("designing-brand-assets", slugs)

    def test_search_is_case_insensitive(self):
        response = self.client.get("/api/courses/", {"search": "BRAND"})
        self.assertEqual(response.status_code, 200)
        slugs = [c["slug"] for c in response.json()["results"]]
        self.assertIn("designing-brand-assets", slugs)

    def test_filter_by_category(self):
        response = self.client.get("/api/courses/", {"category": "graphic-design"})
        self.assertEqual(response.status_code, 200)
        slugs = [c["slug"] for c in response.json()["results"]]
        self.assertEqual(slugs, ["designing-brand-assets"])

    def test_combined_search_and_category(self):
        # Matches category but not the search term -> empty results.
        response = self.client.get(
            "/api/courses/", {"category": "graphic-design", "search": "Programming"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"], [])

        # Both filters match.
        response = self.client.get(
            "/api/courses/", {"category": "programming", "search": "Coding"}
        )
        self.assertEqual(response.status_code, 200)
        slugs = [c["slug"] for c in response.json()["results"]]
        self.assertEqual(slugs, ["programming-with-ai"])

    def test_unknown_category_returns_empty(self):
        response = self.client.get("/api/courses/", {"category": "nonexistent"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["results"], [])

    def test_pagination(self):
        for i in range(15):
            Course.objects.create(
                title=f"Bulk Course {i}",
                slug=f"bulk-course-{i}",
                description="d",
                category=self.programming,
                instructor_name="Instructor",
                status=Course.Status.PUBLISHED,
            )
        response = self.client.get("/api/courses/", {"page_size": 5})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(len(body["results"]), 5)
        self.assertGreater(body["count"], 5)
        self.assertIsNotNone(body["next"])
        self.assertIsNone(body["previous"])

    def test_detail_by_slug(self):
        response = self.client.get("/api/courses/programming-with-ai/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["title"], "Programming with AI Coding Agents")
        self.assertEqual(data["category"]["slug"], "programming")
        self.assertEqual(data["price"], 129.00)
        self.assertEqual(data["rating"], 4.9)

    def test_detail_draft_is_not_accessible(self):
        response = self.client.get("/api/courses/draft-course/")
        self.assertEqual(response.status_code, 404)

    def test_detail_unknown_slug_is_404(self):
        response = self.client.get("/api/courses/does-not-exist/")
        self.assertEqual(response.status_code, 404)

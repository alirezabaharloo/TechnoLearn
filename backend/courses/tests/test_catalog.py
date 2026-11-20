from django.test import TestCase
from rest_framework.test import APIClient
from courses.models import Category, Course


class CatalogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name="طراحی", slug="design")
        self.first = Course.objects.create(title="اول", slug="first", description="", category=self.category, instructor_name="مدرس", price=100, discount_price=40, rating=4.5, status=Course.Status.PUBLISHED)
        self.second = Course.objects.create(title="دوم", slug="second", description="", category=self.category, instructor_name="مدرس", price=60, rating=4.9, status=Course.Status.PUBLISHED)
        Course.objects.create(title="پیش‌نویس", slug="draft", description="", category=self.category, instructor_name="مدرس", price=1, rating=5, status=Course.Status.DRAFT)

    def test_category_count_excludes_drafts(self):
        self.assertEqual(self.client.get('/api/categories/').json()[0]['course_count'], 2)

    def test_ordering_uses_effective_price_and_only_published(self):
        for sort, expected in [('price_asc', ['first', 'second']), ('price_desc', ['second', 'first']), ('popular', ['second', 'first']), ('newest', ['second', 'first'])]:
            with self.subTest(sort=sort):
                body = self.client.get('/api/courses/', {'sort': sort}).json()
                self.assertEqual([item['slug'] for item in body['results']], expected)
        self.assertEqual(self.client.get('/api/courses/', {'sort': 'price_asc'}).json()['results'][0]['discount_price'], 40)

    def test_pagination_combines_with_filters(self):
        body = self.client.get('/api/courses/', {'category': 'design', 'search': 'مدرس', 'page_size': 1, 'page': 2}).json()
        self.assertEqual(body['count'], 2)
        self.assertEqual(len(body['results']), 1)
        self.assertEqual(body['results'][0]['slug'], 'first')

    def test_category_list_uses_one_query(self):
        Category.objects.create(name='دیگر', slug='other')
        with self.assertNumQueries(1):
            self.client.get('/api/categories/').render()

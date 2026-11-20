from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    """Page-number pagination with an optional, bounded page-size override."""

    page_size = 9
    page_size_query_param = "page_size"
    max_page_size = 50

from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام دسته")
    slug = models.SlugField(max_length=120, unique=True, verbose_name="نامک")
    description = models.TextField(blank=True, verbose_name="توضیحات")
    icon = models.CharField(max_length=50, blank=True, default="folder", verbose_name="آیکون")
    color = models.CharField(max_length=20, default="#0ea5e9", verbose_name="رنگ")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "دسته‌بندی"
        verbose_name_plural = "دسته‌بندی‌ها"
        ordering = ["id"]

    def __str__(self):
        return self.name

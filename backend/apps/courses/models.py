from django.db import models

class Course(models.Model):
    STATUS_CHOICES = [
        ("completed", "تکمیل شده"),
        ("ongoing", "در حال برگزاری"),
        ("upcoming", "به‌زودی"),
    ]
    LEVEL_CHOICES = [
        ("beginner", "مقدماتی"),
        ("intermediate", "متوسط"),
        ("advanced", "پیشرفته"),
    ]

    title = models.CharField(max_length=200, verbose_name="عنوان")
    slug = models.SlugField(max_length=220, unique=True, verbose_name="نامک")
    short_description = models.CharField(max_length=300, verbose_name="توضیح کوتاه")
    description = models.TextField(blank=True, verbose_name="توضیح کامل")
    instructor_name = models.CharField(max_length=120, verbose_name="نام مدرس")
    instructor_avatar = models.URLField(blank=True, verbose_name="آواتار مدرس")
    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.CASCADE,
        related_name="courses",
        verbose_name="دسته‌بندی",
    )
    cover_image = models.URLField(verbose_name="تصویر کاور")
    price = models.PositiveIntegerField(verbose_name="قیمت (تومان)")
    discounted_price = models.PositiveIntegerField(null=True, blank=True, verbose_name="قیمت با تخفیف")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="completed", verbose_name="وضعیت")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default="beginner", verbose_name="سطح")
    duration_hours = models.DecimalField(max_digits=5, decimal_places=1, default=10, verbose_name="مدت زمان (ساعت)")
    lessons_count = models.PositiveIntegerField(default=20, verbose_name="تعداد جلسات")
    is_featured = models.BooleanField(default=False, verbose_name="منتخب")
    is_published = models.BooleanField(default=True, verbose_name="منتشر شده")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاریخ ایجاد")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "دوره"
        verbose_name_plural = "دوره‌ها"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    @property
    def final_price(self):
        return self.discounted_price if self.discounted_price else self.price

    @property
    def has_discount(self):
        return self.discounted_price is not None and self.discounted_price < self.price

    @property
    def discount_percent(self):
        if self.has_discount:
            return round((1 - self.discounted_price / self.price) * 100)
        return 0

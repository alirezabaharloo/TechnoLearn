from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Category",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, unique=True)),
                ("slug", models.SlugField(max_length=140, unique=True)),
                ("description", models.TextField(blank=True, default="")),
            ],
            options={
                "verbose_name_plural": "categories",
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("slug", models.SlugField(max_length=220, unique=True)),
                ("description", models.TextField()),
                ("short_description", models.CharField(blank=True, default="", max_length=300)),
                ("thumbnail", models.URLField(blank=True, default="", max_length=500)),
                ("instructor_name", models.CharField(max_length=200)),
                ("price", models.DecimalField(decimal_places=2, default=0, max_digits=8)),
                ("duration", models.CharField(blank=True, default="", max_length=50)),
                ("lesson_count", models.PositiveIntegerField(default=0)),
                ("rating", models.DecimalField(blank=True, decimal_places=1, max_digits=3, null=True)),
                ("status", models.CharField(choices=[("draft", "Draft"), ("published", "Published")], default="draft", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("category", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="courses", to="courses.category")),
            ],
            options={
                "ordering": ("-created_at", "-id"),
            },
        ),
    ]

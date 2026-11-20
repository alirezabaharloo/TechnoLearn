"""Seed the database with realistic sample categories and courses.

Usage:
    python manage.py seed_courses

The command is idempotent: running it repeatedly updates existing records
(keyed by slug) instead of creating duplicates.
"""
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from courses.models import Category, Course

CATEGORIES = [
    {
        "name": "Motion Graphics",
        "slug": "motion-graphics",
        "description": "Bring still designs to life with AI-assisted animation and motion design.",
    },
    {
        "name": "Video Production",
        "slug": "video-production",
        "description": "Plan, shoot, and edit compelling video with the help of AI workflows.",
    },
    {
        "name": "Programming",
        "slug": "programming",
        "description": "Build software faster by working with AI coding agents and assistants.",
    },
    {
        "name": "Graphic Design",
        "slug": "graphic-design",
        "description": "Produce polished visual design and digital assets using AI-powered tools.",
    },
    {
        "name": "Content Creation",
        "slug": "content-creation",
        "description": "Plan and produce high-quality content across platforms with AI support.",
    },
]

COURSES = [
    {
        "title": "Motion Graphics with Free AI Tools",
        "slug": "motion-graphics-with-free-ai-tools",
        "category": "motion-graphics",
        "short_description": "Animate professional motion graphics without spending a dime on software.",
        "description": (
            "Master practical motion graphics using free AI tools. You will learn a "
            "repeatable workflow for turning static designs into polished animated "
            "sequences, from concept and asset prep through rendering and export. "
            "Hands-on projects mirror real client briefs so you finish with a "
            "portfolio you can be proud of."
        ),
        "instructor_name": "Elena Rossi",
        "price": Decimal("79.00"),
        "duration": "6h 20m",
        "lesson_count": 22,
        "rating": Decimal("4.8"),
        "thumbnail": "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Producing Videos with AI: From Idea to Publish",
        "slug": "producing-videos-with-ai",
        "category": "video-production",
        "short_description": "A complete, practical pipeline for making videos faster with AI.",
        "description": (
            "Learn to produce videos end to end with AI. You will script, storyboard, "
            "generate assets, edit, and caption your videos using practical AI tools. "
            "The course focuses on repeatable workflows and real deliverables rather "
            "than a tour of every tool on the market."
        ),
        "instructor_name": "Marcus Bennett",
        "price": Decimal("99.00"),
        "duration": "8h 10m",
        "lesson_count": 30,
        "rating": Decimal("4.7"),
        "thumbnail": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Programming with AI Coding Agents",
        "slug": "programming-with-ai-coding-agents",
        "category": "programming",
        "short_description": "Work with AI coding agents to ship real features, faster and with confidence.",
        "description": (
            "Go beyond copy-pasting prompts. This course teaches you how to direct AI "
            "coding agents effectively: structuring tasks, writing clear specs, "
            "reviewing output, and integrating AI work into a real development workflow "
            "with tests and version control."
        ),
        "instructor_name": "Priya Nair",
        "price": Decimal("129.00"),
        "duration": "10h 00m",
        "lesson_count": 36,
        "rating": Decimal("4.9"),
        "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "AI-Powered Graphic Design for Digital Content",
        "slug": "ai-powered-graphic-design",
        "category": "graphic-design",
        "short_description": "Design polished digital assets and visuals with AI-assisted workflows.",
        "description": (
            "Create professional graphic design assets for digital channels using AI. "
            "You will learn to generate, refine, and polish visuals, maintain consistent "
            "branding, and deliver assets optimized for social, web, and print."
        ),
        "instructor_name": "Sofia Alvarez",
        "price": Decimal("69.00"),
        "duration": "5h 45m",
        "lesson_count": 20,
        "rating": Decimal("4.6"),
        "thumbnail": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Content Creation with AI: Plan, Write, Publish",
        "slug": "content-creation-with-ai",
        "category": "content-creation",
        "short_description": "Build a repeatable content system powered by AI tools.",
        "description": (
            "A practical guide to planning, drafting, and publishing content with AI. "
            "Learn to build an editorial calendar, produce drafts efficiently, keep a "
            "consistent voice, and repurpose content across platforms without burning out."
        ),
        "instructor_name": "Daniel Okafor",
        "price": Decimal("59.00"),
        "duration": "4h 30m",
        "lesson_count": 16,
        "rating": Decimal("4.5"),
        "thumbnail": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Animated Explainers Using Free AI Generators",
        "slug": "animated-explainers-free-ai",
        "category": "motion-graphics",
        "short_description": "Produce clear animated explainer videos using free AI generators.",
        "description": (
            "Learn to create animated explainer videos from scratch with free AI tools. "
            "You will script concise narratives, generate matching visuals, animate, and "
            "deliver a finished explainer ready for real use."
        ),
        "instructor_name": "Elena Rossi",
        "price": Decimal("74.00"),
        "duration": "5h 15m",
        "lesson_count": 18,
        "rating": Decimal("4.7"),
        "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "AI Video Editing: Practical Workflows",
        "slug": "ai-video-editing-workflows",
        "category": "video-production",
        "short_description": "Speed up your video editing with practical, real-world AI workflows.",
        "description": (
            "A hands-on course on using AI to accelerate the editing process. You will "
            "cut, assemble, caption, and polish video with AI-assisted techniques, "
            "focusing on the techniques that save the most time in day-to-day work."
        ),
        "instructor_name": "Marcus Bennett",
        "price": Decimal("89.00"),
        "duration": "6h 40m",
        "lesson_count": 24,
        "rating": Decimal("4.6"),
        "thumbnail": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Shipping Code with AI Assistants",
        "slug": "shipping-code-with-ai-assistants",
        "category": "programming",
        "short_description": "Practical techniques for integrating AI assistants into real projects.",
        "description": (
            "Learn practical strategies for using AI assistants to write, refactor, and "
            "debug code in real projects. You will work through feature development, "
            "testing, and review practices that keep AI-generated code clean and safe."
        ),
        "instructor_name": "Priya Nair",
        "price": Decimal("109.00"),
        "duration": "7h 50m",
        "lesson_count": 28,
        "rating": Decimal("4.8"),
        "thumbnail": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Designing Brand Assets with AI",
        "slug": "designing-brand-assets-with-ai",
        "category": "graphic-design",
        "short_description": "Create a cohesive set of brand assets quickly with AI tools.",
        "description": (
            "Build a complete, cohesive brand asset kit using AI-assisted design. You "
            "will create logos, color systems, typography pairings, and social templates "
            "that look professional and stay consistent."
        ),
        "instructor_name": "Sofia Alvarez",
        "price": Decimal("82.00"),
        "duration": "6h 00m",
        "lesson_count": 21,
        "rating": Decimal("4.7"),
        "thumbnail": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Social Media Content at Scale with AI",
        "slug": "social-media-content-scale-ai",
        "category": "content-creation",
        "short_description": "Produce a month of quality social content using AI, efficiently.",
        "description": (
            "A practical system for producing a month of social media content with AI. "
            "You will plan a content calendar, generate and adapt assets per platform, "
            "and build a workflow that scales without sacrificing quality."
        ),
        "instructor_name": "Daniel Okafor",
        "price": Decimal("64.00"),
        "duration": "4h 50m",
        "lesson_count": 17,
        "rating": Decimal("4.6"),
        "thumbnail": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Kinetic Typography and Motion Title Sequences",
        "slug": "kinetic-typography-motion-titles",
        "category": "motion-graphics",
        "short_description": "Design striking kinetic typography and title sequences with AI.",
        "description": (
            "Create striking kinetic typography and title sequences with AI assistance. "
            "You will learn to animate type, sync motion to audio, and deliver polished "
            "title cards for videos and brand films."
        ),
        "instructor_name": "Elena Rossi",
        "price": Decimal("72.00"),
        "duration": "5h 05m",
        "lesson_count": 19,
        "rating": Decimal("4.7"),
        "thumbnail": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Cinematic Short Films with AI Tools",
        "slug": "cinematic-short-films-ai",
        "category": "video-production",
        "short_description": "Plan and produce a cinematic short film using AI-assisted tools.",
        "description": (
            "A project-based course on producing a cinematic short film with AI tools. "
            "You will move from concept and shot planning through to a finished, "
            "polished short, learning practical decisions at every stage."
        ),
        "instructor_name": "Marcus Bennett",
        "price": Decimal("119.00"),
        "duration": "9h 20m",
        "lesson_count": 32,
        "rating": Decimal("4.8"),
        "thumbnail": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "AI Tools for Web Interface Design",
        "slug": "ai-tools-web-interface-design",
        "category": "graphic-design",
        "short_description": "Design clean, usable web interfaces faster with AI-assisted workflows.",
        "description": (
            "Learn to design clean, usable web interfaces with AI assistance. You will "
            "build wireframes, refine visuals, and produce design-ready interface "
            "elements using practical AI workflows."
        ),
        "instructor_name": "Sofia Alvarez",
        "price": Decimal("88.00"),
        "duration": "6h 30m",
        "lesson_count": 23,
        "rating": Decimal("4.6"),
        "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "AI-Assisted Programming: Testing and Refactoring",
        "slug": "ai-programming-testing-refactoring",
        "category": "programming",
        "short_description": "Use AI to write and refactor tests that actually hold up.",
        "description": (
            "A practical course on using AI to write, refactor, and review tests. You "
            "will learn how to guide AI to produce meaningful tests, keep them maintainable, "
            "and integrate them confidently into your workflow."
        ),
        "instructor_name": "Priya Nair",
        "price": Decimal("94.00"),
        "duration": "7h 10m",
        "lesson_count": 26,
        "rating": Decimal("4.7"),
        "thumbnail": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Long-Form Content Strategy with AI",
        "slug": "long-form-content-strategy-ai",
        "category": "content-creation",
        "short_description": "Plan and produce long-form content consistently with AI support.",
        "description": (
            "Build a long-form content strategy powered by AI. You will research, outline, "
            "draft, and edit longer pieces with a repeatable system that keeps quality high "
            "and effort manageable."
        ),
        "instructor_name": "Daniel Okafor",
        "price": Decimal("67.00"),
        "duration": "5h 30m",
        "lesson_count": 18,
        "rating": Decimal("4.5"),
        "thumbnail": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    },
]


# Localized demo content. Prices in the original sample were dollar-like values;
# these demo prices are explicitly converted to toman, not real exchange rates.
CATEGORY_NAMES = {
    "motion-graphics": "موشن گرافیک",
    "video-production": "تولید ویدیو",
    "programming": "برنامه‌نویسی",
    "graphic-design": "طراحی گرافیک",
    "content-creation": "تولید محتوا",
}
COURSE_TITLES = [
    "ساخت موشن گرافیک با ابزارهای رایگان هوش مصنوعی",
    "تولید ویدیو با هوش مصنوعی؛ از ایده تا انتشار",
    "برنامه‌نویسی با ایجنت‌های هوش مصنوعی",
    "طراحی گرافیک و محتوای دیجیتال با هوش مصنوعی",
    "تولید محتوا با هوش مصنوعی؛ برنامه‌ریزی تا انتشار",
    "ساخت ویدیوهای توضیحی متحرک با ابزارهای رایگان",
    "تدوین ویدیو با هوش مصنوعی: جریان‌های کاری کاربردی",
    "ساخت و توسعه کد با دستیارهای هوش مصنوعی",
    "طراحی هویت بصری برند با هوش مصنوعی",
    "تولید محتوای شبکه‌های اجتماعی با هوش مصنوعی",
    "تایپوگرافی متحرک و ساخت تیتراژ",
    "ساخت فیلم کوتاه سینمایی با ابزارهای هوش مصنوعی",
    "طراحی رابط وب با ابزارهای هوش مصنوعی",
    "تست و بازآرایی کد با کمک هوش مصنوعی",
    "استراتژی محتوای بلند با هوش مصنوعی",
]
INSTRUCTOR_NAMES = {
    "Elena Rossi": "النا روسی", "Marcus Bennett": "مارکوس بنت",
    "Priya Nair": "پریا نایر", "Sofia Alvarez": "سوفیا آلوارز",
    "Daniel Okafor": "دنیل اوکافور",
}


class Command(BaseCommand):
    help = "Seed the database with sample categories and courses."

    @transaction.atomic
    def handle(self, *args, **options):
        categories = {}
        for data in CATEGORIES:
            category, _ = Category.objects.update_or_create(
                slug=data["slug"], defaults={"name": CATEGORY_NAMES[data["slug"]], "description": data["description"]}
            )
            categories[data["slug"]] = category

        for data, title in zip(COURSES, COURSE_TITLES):
            course, _ = Course.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "title": title,
                    "description": data["description"],
                    "short_description": "با یک مسیر پروژه‌محور، ایده‌هایت را با کمک هوش مصنوعی به نتیجه‌ای واقعی تبدیل کن.",
                    "thumbnail": data["thumbnail"],
                    "category": categories[data["category"]],
                    "instructor_name": INSTRUCTOR_NAMES[data["instructor_name"]],
                    "price": data["price"] * 10000,
                    "duration": data["duration"],
                    "lesson_count": data["lesson_count"],
                    "rating": data["rating"],
                    "status": Course.Status.PUBLISHED,
                },
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {Category.objects.count()} categories and "
                f"{Course.objects.count()} courses."
            )
        )

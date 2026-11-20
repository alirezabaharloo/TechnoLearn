# TechnoLearn — Course Marketplace

A modern, responsive online learning platform focused on **practical, project-based
AI education**. This repository currently implements the **Courses Page** (listing,
search, category filtering, pagination, and course detail) backed by a Django REST
Framework API.

## Tech stack

| Layer    | Technology                                              |
| -------- | ------------------------------------------------------- |
| Frontend | React (JS), Vite, Tailwind CSS, React Router, Axios, TanStack Query, Lucide React |
| Backend  | Python, Django, Django REST Framework, SQLite           |

## Project structure

```
.
├── backend/                     # Django REST API
│   ├── config/                  # Django project (settings, urls, wsgi, asgi)
│   ├── courses/                 # Courses app
│   │   ├── models.py            # Category & Course models
│   │   ├── serializers.py
│   │   ├── views.py             # List/detail views with search + filtering
│   │   ├── pagination.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── management/commands/seed_courses.py
│   │   ├── migrations/
│   │   └── tests/
│   ├── manage.py
│   └── requirements.txt
└── frontend/                    # React + Vite app
    ├── public/
    └── src/
        ├── api/                 # Axios client + TanStack query client
        ├── hooks/               # useCategories, useCourses, useCourse
        ├── components/          # Header, HeroSection, CourseSearch, CategoryFilter,
        │                        # CourseGrid, CourseCard, EmptyState, Pagination, Footer
        ├── pages/               # CoursesPage, CourseDetailPage
        └── utils/               # formatting helpers
```

## API endpoints

| Method | Path                   | Description                                  |
| ------ | ---------------------- | -------------------------------------------- |
| GET    | `/api/categories/`     | List all categories                          |
| GET    | `/api/courses/`        | List published courses (search + filter + pagination) |
| GET    | `/api/courses/{slug}/` | Retrieve a single published course by slug   |

The `/api/courses/` endpoint supports:

- `?search=<term>` — case-insensitive title search
- `?category=<slug>` — filter by category
- `?page=<n>` and `?page_size=<n>` — pagination

Only courses with `status = "published"` are exposed in public responses.

## Getting started

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_courses
python manage.py runserver
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The frontend uses a relative `/api` base URL and the Vite dev server proxies
`/api` requests to `http://127.0.0.1:8000` (override with `VITE_PROXY_TARGET`).
No hardcoded API hosts are used; the base URL is configurable via
`VITE_API_BASE_URL`.

## Development

- Backend tests: `cd backend && python manage.py test`
- Frontend build: `cd frontend && npm run build`

## Scope

This implementation covers the Courses Page only. The architecture (API-first,
TanStack Query server-state, route-based pages) is structured so authentication,
payments, dashboards, and lesson players can be added later without major
restructuring.

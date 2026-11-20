# TechnoLearn

TechnoLearn is a Persian, RTL learning catalog focused on practical, project-based AI skills. The homepage and course catalog share React components and use the existing Django REST API. The pre-existing read-only course-detail API remains available for compatibility; the frontend intentionally exposes only the home and catalog pages.

## Stack and structure

- `frontend/`: React (JavaScript), Vite, Tailwind CSS, React Router, Axios, TanStack Query and Lucide. `src/pages` contains the two pages, `src/components` the shared UI, `src/hooks` the queries, and `src/api` the API client.
- `backend/`: Django, Django REST Framework and SQLite. The `courses` app owns models, serializers, views, migrations, admin, sample data and tests.

The frontend uses a relative `/api` URL and Vite proxies it to Django (`VITE_PROXY_TARGET` can override the development proxy). For deployments, configure the web server to route `/api/` to Django. Set backend environment variables as described in `backend/.env.example`; do not use development defaults in production.

## API

- `GET /api/categories/`: categories and published course counts.
- `GET /api/courses/`: published courses only. Supports `search` (title, short description, instructor or category), `category` (slug), `sort` (`newest`, `popular`, `price_asc`, `price_desc`), `page` and `page_size` (maximum 50). Responses use DRF's `count`, `next`, `previous`, and `results` pagination shape.
- `GET /api/courses/{slug}/`: existing published-course endpoint.

Popularity means highest rating, with unrated courses last; no enrollment data is collected. Price ordering uses the discount price when it is lower than the regular price. Prices are in **Iranian toman**. The demo seed uses illustrative prices, not currency conversions or real offers; existing database prices should be reviewed when upgrading from the earlier dollar-denominated demo.

## Local setup

The commands below are provided for the project owner to run, not executed by the agent.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_courses
python manage.py runserver
```

In another terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The seed command updates sample records identified by their existing slugs; it does not delete other records. It overwrites fields of those sample records when rerun. Run backend tests with `python manage.py test` from `backend/` and build the frontend with `npm run build` from `frontend/`.

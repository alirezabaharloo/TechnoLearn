# TechnoLearn — تکنولرن

پلتفرم آموزشی حرفه‌ای برای یادگیری مهارت‌های طراحی، تدوین و تولید محتوای دیجیتال. طراحی شده با الهام از سبزلرن، اما با هویت بصری مستقل و ساختار فنی استاندارد برای توسعه به یک سیستم کامل فروش دوره.

> **Live Preview:** 
> - Frontend (React): `http://localhost:5173` → در محیط E2B به صورت `https://5173-....e2b.app`
> - Backend (Django API): `http://localhost:8000/api/`

---

## ✨ ویژگی‌ها

### بک‌اند (Django + DRF + PostgreSQL/SQLite)
- مدل‌های `Category` و `Course` با ساختار توسعه‌پذیر
- API کامل با فیلتر، جستجو، مرتب‌سازی و صفحه‌بندی
- اندپوینت‌ها:
  - `GET /api/categories/` — لیست دسته‌ها (همراه `courses_count`)
  - `GET /api/courses/` — لیست دوره‌ها با `?category=slug&search=query&ordering=-created_at&page=1&page_size=9`
  - `GET /api/courses/featured/` — دوره‌های منتخب بدون pagination
  - `GET /api/courses/<slug>/` — جزئیات دوره
  - `GET /api/health/` — سلامت سرویس
- پشتیبانی از PostgreSQL (env) + fallback به SQLite برای توسعه
- CORS باز برای فرانت‌اند + پنل ادمین جنگو

### فرانت‌اند (React 18 + Vite + Tailwind + React Router)
- **RTL فارسی** با فونت Vazirmatn
- سه صفحه اصلی فاز اول:
  1. **خانه** — هدر واکنش‌گرا، Hero با گرادیان و آمار، دسته‌بندی‌ها از API، دوره‌های منتخب، مزایا، CTA و فوتر
  2. **دوره‌ها** — کارت‌های یکپارچه، فیلتر دسته از API، جستجوی debounced (۵۰۰ms)، مرتب‌سازی (جدیدترین/قیمت/الفبا)، صفحه‌بندی سرورساید، مدیریت حالت‌های loading/error/empty
  3. **درباره ما** — معرفی برند، چشم‌انداز، حوزه‌ها، رویکرد آموزشی، تماس — بدون داده ساختگی اضافی
- صفحه جزئیات دوره `/courses/:slug` (placeholder توسعه‌پذیر)
- کامپوننت‌های reusable: `Header`, `Footer`, `CourseCard`, `CategoryCard`
- مدیریت خطا و لودینگ هماهنگ با دیزاین‌سیستم
- Vite proxy برای `/api` → `localhost:8000`

---

## 🛠 تکنولوژی‌ها

| لایه | تکنولوژی |
|------|-----------|
| Frontend | React 18, React Router 6, Tailwind CSS 3, Vite 5 |
| Backend | Python 3.11, Django 5, DRF 3.15, django-filter, django-cors-headers |
| DB | PostgreSQL (prod) / SQLite (dev) |
| Fonts | Vazirmatn (Google Fonts) |

---

## 🚀 راه‌اندازی سریع

### ۱. بک‌اند
```bash
cd backend
pip install -r requirements.txt --break-system-packages
python manage.py migrate
python manage.py shell < seed.py   # ایجاد ۴ دسته + ۱۲ دوره نمونه
python manage.py runserver 0.0.0.0:8000
# سپس http://localhost:8000/api/health/ و /api/courses/ را تست کن
```

**متغیرهای محیطی (اختیاری برای PostgreSQL):**
```bash
export DB_ENGINE=postgresql
export DB_NAME=technolearn
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_HOST=localhost
export DB_PORT=5432
```

### ۲. فرانت‌اند
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
# build تولید:
npm run build
```

### اجرای همزمان
```bash
./run_dev.sh  # هر دو سرویس را با trap اجرا می‌کند
```

---

## 📁 ساختار پروژه

```
TechnoLearn/
├── backend/
│   ├── config/          # settings, urls, wsgi
│   ├── apps/
│   │   ├── categories/  # Category model + API
│   │   └── courses/     # Course model + API (pagination, filter, search, ordering)
│   ├── manage.py
│   ├── requirements.txt
│   ├── seed.py
│   └── db.sqlite3
├── frontend/
│   ├── src/
│   │   ├── components/  # Header, Footer, CourseCard, CategoryCard
│   │   ├── pages/       # Home, Courses, About, CourseDetail
│   │   ├── services/api.js
│   │   ├── hooks/useDebounce.js
│   │   ├── App.jsx, main.jsx, index.css
│   ├── vite.config.js   # proxy + allowedHosts:true برای preview
│   ├── tailwind.config.js
│   └── package.json
└── run_dev.sh
```

---

## 🎨 نکات طراحی

- الهام از sabzlearn.ir: کارت‌های گرد، گرادیان‌های ملایم، فیلترهای pill-shaped، صفحه‌بندی ساده
- هویت مستقل TechnoLearn: پالت Slate + Sky/Indigo/Violet، تایپوگرافی Vazirmatn، گوشه‌های 20-28px، سایه‌های نرم
- ریسپانسیو کامل، دسترسی‌پذیری و تمیزکد (Clean Code)

---

## 🔮 توسعه آینده

ساختار برای افزودن موارد زیر بدون بازنویسی آماده است:
- احراز هویت (JWT)، پنل کاربری، پرداخت، پخش ویدیو (HLS)، نظرات، علاقه‌مندی‌ها
- مدیریت محتوا برای صفحه About از طریق API
- آپلود کاور و ویدیو (MEDIA_URL)

---

## 📄 لایسنس

MIT — آزاد برای توسعه.

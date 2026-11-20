import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookOpen, SlidersHorizontal, Sparkles } from "lucide-react";
import CategoryFilter from "../components/CategoryFilter.jsx";
import CourseSearch from "../components/CourseSearch.jsx";
import CourseGrid from "../components/CourseGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { useCourses } from "../hooks/useCourses.js";
import { useCategories } from "../hooks/useCategories.js";
import { formatNumber } from "../utils/format.js";

const PAGE_SIZE = 9;
export default function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const sort = ["newest", "popular", "price_asc", "price_desc"].includes(params.get("sort")) ? params.get("sort") : "newest";
  const rawPage = Number(params.get("page"));
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const [input, setInput] = useState(search);
  useEffect(() => setInput(search), [search]);
  const update = (values) => setParams(previous => { const next = new URLSearchParams(previous); Object.entries(values).forEach(([key, value]) => value ? next.set(key, String(value)) : next.delete(key)); return next; });
  const { data, isLoading, isError, refetch } = useCourses({ search, category, page, pageSize: PAGE_SIZE, sort });
  const allCourses = useCourses({ pageSize: 1 });
  const categories = useCategories();
  const reset = () => { setInput(""); setParams({}); };
  return <>
    <section className="catalog-hero"><div className="container-page catalog-intro"><div><span className="eyebrow light"><span />مسیر یادگیری تو از اینجاست</span><h1>هر ایده‌ای، یک <em>شروع</em> می‌خواد.</h1><p>مهارت‌های جدید یاد بگیر و با قدرت هوش مصنوعی، ایده‌هات رو به پروژه‌های واقعی تبدیل کن.</p></div><div className="catalog-stats"><div><BookOpen size={21} /><strong>{allCourses.data ? formatNumber(allCourses.data.count) : "—"}</strong><span>دوره آموزشی</span></div><div><Sparkles size={21} /><strong>{categories.data ? formatNumber(categories.data.length) : "—"}</strong><span>مسیر یادگیری</span></div></div></div></section>
    <section className="container-page catalog-content"><div className="catalog-tools"><div><span className="eyebrow"><span />یاد بگیر و خلق کن</span><h2>همه دوره‌های آموزشی</h2><p>مسیر مناسب خودت رو پیدا کن.</p></div><CourseSearch value={input} onChange={setInput} onSubmit={value => update({ search: value.trim(), page: null })} /></div>
      <CategoryFilter activeCategory={category} onSelect={slug => update({ category: slug, page: null })} />
      <div className="results-toolbar"><div><strong>{isLoading ? "در حال دریافت دوره‌ها..." : isError ? "دوره‌ها دریافت نشدند" : `${formatNumber(data?.count)} دوره برای یادگیری`}</strong><span> برای ساختن آماده‌ای؟</span></div><label><SlidersHorizontal size={17} /><span>مرتب‌سازی:</span><select value={sort} onChange={event => update({ sort: event.target.value, page: null })} aria-label="مرتب‌سازی دوره‌ها"><option value="newest">جدیدترین</option><option value="popular">محبوب‌ترین (امتیاز)</option><option value="price_asc">کمترین قیمت</option><option value="price_desc">بیشترین قیمت</option></select></label></div>
      {isError ? <div className="state-box" role="alert"><strong>دریافت دوره‌ها ممکن نشد.</strong><p>اتصال به سرور یا شماره صفحه را بررسی کنید.</p><button className="button-dark" onClick={() => refetch()}>تلاش دوباره</button> <button className="text-link" onClick={reset}>حذف فیلترها</button></div> : isLoading ? <CourseGrid loading /> : data?.results?.length ? <CourseGrid courses={data.results} /> : <div className="state-box"><strong>دوره‌ای پیدا نشد.</strong><p>عبارت جستجو یا دسته‌بندی دیگری را امتحان کن.</p><button className="text-link" onClick={reset}>حذف فیلترها</button></div>}
      {data && <Pagination page={page} pageSize={PAGE_SIZE} total={data.count} onPageChange={next => update({ page: next })} />}
    </section>
  </>;
}

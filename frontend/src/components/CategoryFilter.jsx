import { useCategories } from "../hooks/useCategories.js";

export default function CategoryFilter({ activeCategory, onSelect }) {
  const { data = [], isLoading, isError, refetch } = useCategories();
  return <div className="category-filter"><h2>دسته‌بندی دوره‌ها</h2>
    {isLoading ? <p className="muted">در حال دریافت دسته‌بندی‌ها...</p> : isError ? <p className="muted">دسته‌بندی‌ها دریافت نشدند. <button className="text-link" onClick={() => refetch()}>تلاش دوباره</button></p> : <div className="filter-chips">
      <button type="button" aria-pressed={!activeCategory} className={!activeCategory ? "active" : ""} onClick={() => onSelect(null)}>همه دوره‌ها</button>
      {data.map((item) => <button type="button" aria-pressed={activeCategory === item.slug} className={activeCategory === item.slug ? "active" : ""} key={item.slug} onClick={() => onSelect(item.slug)}>{item.name}</button>)}
    </div>}
  </div>;
}

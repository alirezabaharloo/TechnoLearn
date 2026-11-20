import { Search } from "lucide-react";

export default function CourseSearch({ value = "", onChange, onSubmit, placeholder = "دنبال یادگیری چی هستی؟", variant = "default" }) {
  return <form role="search" className={`course-search ${variant === "hero" ? "search-hero" : ""}`} onSubmit={(event) => { event.preventDefault(); onSubmit?.(value); }}>
    <Search size={20} aria-hidden="true" /><input aria-label="جستجوی دوره‌ها" type="search" value={value} onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} />
    <button type="submit">جستجو</button>
  </form>;
}

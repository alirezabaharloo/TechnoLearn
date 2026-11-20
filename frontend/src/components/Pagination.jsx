import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatNumber } from "../utils/format.js";
export default function Pagination({ page, pageSize, total, onPageChange }) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  const visible = [...new Set([1, pages, page - 1, page, page + 1])].filter(n => n > 0 && n <= pages).sort((a,b) => a-b);
  return <nav className="pagination" aria-label="صفحه‌بندی">
    <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="صفحه قبل"><ChevronRight size={18} /></button>
    {visible.map((n, i) => <span key={n} className="page-item">{i > 0 && n - visible[i-1] > 1 && <span>…</span>}<button className={page === n ? "active" : ""} aria-current={page === n ? "page" : undefined} onClick={() => onPageChange(n)}>{formatNumber(n)}</button></span>)}
    <button disabled={page >= pages} onClick={() => onPageChange(page + 1)} aria-label="صفحه بعد"><ChevronLeft size={18} /></button>
  </nav>;
}

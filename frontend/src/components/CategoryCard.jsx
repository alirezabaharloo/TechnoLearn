import { Link } from 'react-router-dom'

const iconMap = {
  film: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 4V2m0 2v2m0-2h2m-2 0H4m8 6a4 4 0 11-8 0 4 4 0 018 0zM15 12a3 3 0 100 6 3 3 0 000-6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 8V4a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7" /></svg>
  ),
  sparkles: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  palette: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343a1 1 0 01-.707-.293l-2.343-2.343a1 1 0 00-.707-.293H12" /></svg>
  ),
  cube: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10m0-10v10" /></svg>
  ),
}

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/courses?category=${category.slug}`}
      className="group bg-white rounded-[20px] p-6 border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all text-right flex flex-col"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md"
        style={{ background: category.color }}
      >
        {iconMap[category.icon] || iconMap.film}
      </div>
      <h3 className="font-bold text-slate-900 text-[15px]">{category.name}</h3>
      <p className="text-xs text-slate-500 leading-6 mt-2 line-clamp-2 flex-1">{category.description}</p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1 group-hover:gap-2 transition-all">
          مشاهده دوره‌ها
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </span>
        <span className="text-xs bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">{category.courses_count} دوره</span>
      </div>
    </Link>
  )
}

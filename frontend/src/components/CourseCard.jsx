import { Link } from 'react-router-dom'
import { formatPrice } from '../services/api'

const statusMap = {
  completed: { label: 'تکمیل شده', color: 'bg-emerald-500' },
  ongoing: { label: 'در حال برگزاری', color: 'bg-amber-500' },
  upcoming: { label: 'به‌زودی', color: 'bg-sky-500' },
}

export default function CourseCard({ course }) {
  const status = statusMap[course.status] || statusMap.completed
  return (
    <div className="group bg-white rounded-[20px] overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={course.cover_image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        {/* Category badge */}
        <span
          className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
          style={{ background: course.category_color || '#0ea5e9' }}
        >
          {course.category_name}
        </span>
        {/* Discount */}
        {course.has_discount && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-black px-2.5 py-1.5 rounded-full">
            %{course.discount_percent} تخفیف
          </span>
        )}
        {/* Status dot */}
        <span className={`absolute bottom-3 right-3 flex items-center gap-1.5 text-xs font-medium bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow`}>
          <span className={`w-2 h-2 rounded-full ${status.color}`}></span>
          {status.label}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[15px] leading-6 text-slate-900 line-clamp-2 min-h-[48px]">
          {course.title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-5 min-h-[32px]">
          {course.short_description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-3">
          <img src={course.instructor_avatar} alt={course.instructor_name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
          <span className="text-xs text-slate-600">مدرس: <span className="font-semibold text-slate-800">{course.instructor_name}</span></span>
          <span className="mr-auto text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {course.duration_hours} ساعت
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 my-3" />

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            {course.has_discount ? (
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 line-through">{formatPrice(course.price)}</span>
                <span className="font-black text-sky-600 text-[15px]">{formatPrice(course.discounted_price)}</span>
              </div>
            ) : (
              <span className="font-black text-slate-900 text-[15px]">{formatPrice(course.price)}</span>
            )}
          </div>
          <Link
            to={`/courses/${course.slug}`}
            className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-slate-800 transition flex items-center gap-1"
          >
            مشاهده دوره
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api, formatPrice } from '../services/api'

export default function CourseDetail() {
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getCourse(slug).then(setCourse).catch(e => setError(e.message)).finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-12 text-center">در حال بارگذاری...</div>
  if (error) return <div className="max-w-7xl mx-auto px-4 py-12 text-center text-rose-600">{error}</div>
  if (!course) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        بازگشت به دوره‌ها
      </Link>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[22px] border border-slate-200 overflow-hidden">
            <img src={course.cover_image} alt={course.title} className="w-full h-72 object-cover" />
            <div className="p-6">
              <span className="inline-flex text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background: course.category_color }}>{course.category_name}</span>
              <h1 className="text-xl font-black mt-3 leading-8">{course.title}</h1>
              <p className="text-sm text-slate-600 leading-7 mt-3">{course.short_description}</p>
              <div className="flex items-center gap-4 mt-5 text-xs text-slate-500">
                <span className="flex items-center gap-1"><img src={course.instructor_avatar} className="w-6 h-6 rounded-full" alt="" />{course.instructor_name}</span>
                <span>{course.duration_hours} ساعت</span>
                <span>{course.lessons_count} جلسه</span>
                <span>{course.level_display}</span>
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
                این صفحه پیش‌نمایش است. در فاز بعدی پخش ویدیو، سرفصل‌ها و ثبت‌نام به آن اضافه خواهد شد.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-[22px] border border-slate-200 p-6">
            <div className="text-sm text-slate-500">قیمت دوره</div>
            {course.has_discount ? (
              <>
                <div className="text-sm line-through text-slate-400 mt-1">{formatPrice(course.price)}</div>
                <div className="text-2xl font-black text-sky-600">{formatPrice(course.discounted_price)}</div>
                <span className="inline-flex mt-2 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">%{course.discount_percent} تخفیف</span>
              </>
            ) : (
              <div className="text-2xl font-black text-slate-900 mt-1">{formatPrice(course.price)}</div>
            )}
            <button className="w-full mt-5 bg-slate-900 text-white py-3 rounded-full font-bold text-sm hover:bg-slate-800">ثبت‌نام در دوره</button>
            <p className="text-xs text-slate-400 text-center mt-3">پرداخت امن — در فاز آینده فعال می‌شود</p>
          </div>
        </div>
      </div>
    </div>
  )
}

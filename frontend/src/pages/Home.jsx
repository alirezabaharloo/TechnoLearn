import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import CourseCard from '../components/CourseCard'
import CategoryCard from '../components/CategoryCard'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [cats, feats] = await Promise.all([
          api.getCategories(),
          api.getFeatured(),
        ])
        setCategories(cats.results || cats)
        setFeatured(feats.results || feats)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-slate-200 rounded-3xl" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-slate-200 rounded-2xl" />)}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 max-w-lg mx-auto">
          <p className="text-rose-700 font-bold">خطا در دریافت اطلاعات</p>
          <p className="text-sm text-rose-600 mt-2">{error}</p>
          <button onClick={() => location.reload()} className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-full text-sm">تلاش مجدد</button>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900" />
        <div className="absolute inset-0 opacity-30" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px"}} />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-sky-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-indigo-500/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-3 py-1.5 text-xs">
                <span className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
                بیش از ۱۲ دوره تخصصی — به‌روزرسانی هفتگی
              </div>
              <h1 className="text-[30px] sm:text-[40px] lg:text-[44px] font-black leading-[1.2] mt-5">
                مهارت‌های
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent"> طراحی و تدوین </span>
                را حرفه‌ای بیاموز
              </h1>
              <p className="text-slate-300 leading-8 mt-5 text-[15px] max-w-xl">
                در تکنولرن یادگیری را پروژه‌محور تجربه کن؛ از پریمیر و افترافکت تا فتوشاپ و طراحی سه‌بعدی — با مسیر یادگیری مرحله‌ای و پشتیبانی واقعی.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/courses" className="bg-white text-slate-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-slate-100 transition flex items-center gap-2 shadow-lg">
                  شروع یادگیری
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </Link>
                <Link to="/about" className="bg-white/10 backdrop-blur border border-white/20 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-white/15 transition">
                  درباره تکنولرن
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-10">
                {[
                  { n: '۱۲+', l: 'دوره فعال' },
                  { n: '۴', l: 'حوزه تخصصی' },
                  { n: '۱۲۰۰+', l: 'هنرجو' },
                ].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-2xl font-black">{s.n}</div>
                    <div className="text-xs text-slate-400 mt-1">{s.l}</div>
                  </div>
                ))}
                <div className="hidden sm:flex items-center gap-2 mr-4 pr-6 border-r border-white/10">
                  <div className="flex -space-x-2 space-x-reverse">
                    {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/40?img=${10+i}`} className="w-8 h-8 rounded-full border-2 border-slate-900" alt="" />)}
                  </div>
                  <span className="text-xs text-slate-300">رضایت ۹۸٪ هنرجویان</span>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-[28px] p-3 shadow-2xl rotate-[-1deg]">
                <img src="https://images.unsplash.com/photo-1536243287037-704f633496ae?w=800&auto=format&fit=crop" alt="editing" className="w-full h-[340px] object-cover rounded-[20px]" />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">در حال پخش</div>
                    <div className="text-sm font-bold text-slate-900">آموزش پریمیر پرو — فصل ۳</div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-slate-900 text-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-xs font-bold">AE</span>
                  <div>
                    <div className="text-xs text-slate-400">موشن گرافیک</div>
                    <div className="text-sm font-bold">۱۲ پروژه عملی</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-slate-500">
          <span className="font-bold text-slate-700">ابزارهایی که یاد می‌گیری:</span>
          <div className="flex flex-wrap gap-3">
            {['Premiere Pro','After Effects','Photoshop','Blender','Illustrator','Audition'].map(t => (
              <span key={t} className="bg-slate-100 px-3 py-1.5 rounded-full font-medium text-slate-700">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">دسته‌بندی‌های آموزشی</h2>
            <p className="text-sm text-slate-500 mt-2">مسیر یادگیری خود را انتخاب کن — هر دسته شامل دوره‌های سطح‌بندی‌شده است</p>
          </div>
          <Link to="/courses" className="hidden sm:flex items-center gap-1 text-sm font-bold text-sky-600 hover:text-sky-700">
            مشاهده همه
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </section>

      {/* Featured courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              دوره‌های منتخب
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-3">جدیدترین دوره‌ها</h2>
            <p className="text-sm text-slate-500 mt-2">منتخب تیم تکنولرن — با تخفیف‌های ویژه برای شروع سریع‌تر</p>
          </div>
          <Link to="/courses" className="hidden sm:inline-flex bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800">
            همه دوره‌ها
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {featured.map(course => <CourseCard key={course.id} course={course} />)}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="bg-slate-900 rounded-[28px] p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "20px 20px"}} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[80px] rounded-full" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <h2 className="text-2xl font-black">چرا تکنولرن؟</h2>
              <p className="text-slate-300 text-sm leading-7 mt-3">ما آموزش را از تئوری به عمل می‌بریم؛ هر دوره با پروژه واقعی، فایل تمرینی و بازخورد مدرس همراه است.</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {[
                  { title: 'آموزش پروژه‌محور', desc: 'یادگیری با ساخت پروژه‌های واقعی بازار کار', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'from-sky-500 to-cyan-400' },
                  { title: 'مهارت‌های کاربردی', desc: 'تمرکز بر ابزارهایی که همین امروز به کار می‌آیند', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'from-violet-500 to-purple-400' },
                  { title: 'محتوای تخصصی', desc: 'سرفصل‌های به‌روز بر اساس نسخه‌های جدید نرم‌افزارها', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'from-emerald-500 to-teal-400' },
                  { title: 'دسترسی آسان', desc: 'مشاهده آنلاین + دانلود برای یادگیری آفلاین', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'from-amber-500 to-orange-400' },
                ].map(b => (
                  <div key={b.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center text-white mb-3`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} /></svg>
                    </div>
                    <h4 className="font-bold text-sm">{b.title}</h4>
                    <p className="text-xs text-slate-400 leading-6 mt-1">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-[22px] p-6 shadow-xl">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/100?img=32" className="w-10 h-10 rounded-full" alt="" />
                  <div>
                    <div className="text-sm font-bold">نگار احمدی — مدرس موشن گرافیک</div>
                    <div className="text-xs text-slate-500">۹ سال تجربه — ۳۴ دوره</div>
                  </div>
                  <span className="mr-auto bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">۴.۹ ★</span>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    { l: 'پریمیر پرو جامع', p: 85 },
                    { l: 'افترافکت پیشرفته', p: 92 },
                    { l: 'فتوشاپ پروژه‌محور', p: 78 },
                  ].map(r => (
                    <div key={r.l}>
                      <div className="flex justify-between text-xs mb-1"><span className="text-slate-700">{r.l}</span><span className="text-slate-500">{r.p}% پیشرفت</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" style={{ width: `${r.p}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">گواهی پایان دوره</div>
                    <div className="font-bold text-sm mt-1">قابل ارائه به کارفرما</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14">
        <div className="bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600 rounded-[28px] p-8 lg:p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "18px 18px", opacity: 0.15}} />
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-white/10 blur-[50px] rounded-full" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black">آماده‌ای خلق کنی؟</h3>
              <p className="text-white/90 text-sm leading-7 mt-2 max-w-xl">همین امروز مسیر یادگیری‌ات را شروع کن. همه دوره‌ها با ضمانت بازگشت وجه و پشتیبانی مدرس همراه هستند.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/courses" className="bg-white text-slate-900 px-7 py-3 rounded-full font-bold text-sm hover:bg-slate-100 shadow-lg">
                مشاهده دوره‌ها
              </Link>
              <Link to="/about" className="bg-white/15 backdrop-blur border border-white/30 text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-white/25">
                بیشتر بدان
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

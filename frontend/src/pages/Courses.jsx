import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../services/api'
import { useDebounce } from '../hooks/useDebounce'
import CourseCard from '../components/CourseCard'

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [courses, setCourses] = useState([])
  const [categories, setCategories] = useState([])
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // filters from URL
  const category = searchParams.get('category') || ''
  const search = searchParams.get('search') || ''
  const ordering = searchParams.get('ordering') || '-created_at'
  const page = parseInt(searchParams.get('page') || '1', 10)

  const [searchInput, setSearchInput] = useState(search)
  const debouncedSearch = useDebounce(searchInput, 500)

  // sync debounced search to URL
  useEffect(() => {
    if (debouncedSearch !== search) {
      const p = new URLSearchParams(searchParams)
      if (debouncedSearch) p.set('search', debouncedSearch)
      else p.delete('search')
      p.set('page', '1')
      setSearchParams(p, { replace: true })
    }
    // eslint-disable-next-line
  }, [debouncedSearch])

  // sync search input when URL changes externally (category links)
  useEffect(() => {
    setSearchInput(search)
  }, [search])

  // fetch categories once
  useEffect(() => {
    api.getCategories().then(res => setCategories(res.results || res)).catch(() => {})
  }, [])

  // fetch courses when filters change
  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const params = {
          page,
          page_size: 9,
          category: category || undefined,
          search: search || undefined,
          ordering: ordering || undefined,
        }
        const data = await api.getCourses(params)
        setCourses(data.results || [])
        setCount(data.count || 0)
        setNext(data.next)
        setPrev(data.previous)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category, search, ordering, page])

  const updateParam = (key, value) => {
    const p = new URLSearchParams(searchParams)
    if (value) p.set(key, value)
    else p.delete(key)
    if (key !== 'page') p.set('page', '1')
    setSearchParams(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.ceil(count / 9)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="bg-white rounded-[24px] border border-slate-200 p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-50 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-50 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-full text-xs font-bold">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {count ? `${count} دوره فعال` : 'دوره‌های تکنولرن'}
          </div>
          <h1 className="text-[26px] sm:text-[30px] font-black text-slate-900 mt-4">همه دوره‌های آموزشی</h1>
          <p className="text-sm text-slate-500 leading-7 mt-2 max-w-2xl">
            تمام دوره‌های منتشرشده تکنولرن را اینجا ببین؛ با فیلتر دسته‌بندی، جستجوی لحظه‌ای و مرتب‌سازی بر اساس جدیدترین و قیمت.
          </p>

          {/* Search + ordering row */}
          <div className="flex flex-col lg:flex-row gap-3 mt-6">
            <div className="flex-1 relative">
              <svg className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="جستجو بر اساس عنوان دوره، مثلا: پریمیر، فتوشاپ، Blender..."
                className="w-full pr-10 pl-4 py-3 rounded-full border border-slate-200 bg-slate-50 focus:bg-white focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none text-sm transition"
              />
              {searchInput && (
                <button onClick={() => setSearchInput('')} className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            <select
              value={ordering}
              onChange={e => updateParam('ordering', e.target.value)}
              className="px-5 py-3 rounded-full border border-slate-200 bg-white text-sm font-medium outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 min-w-[180px]"
            >
              <option value="-created_at">جدیدترین</option>
              <option value="created_at">قدیمی‌ترین</option>
              <option value="price">ارزان‌ترین</option>
              <option value="-price">گران‌ترین</option>
              <option value="title">الفبایی (عنوان)</option>
            </select>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => updateParam('category', '')}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition ${!category ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
            >
              همه دسته‌ها
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition flex items-center gap-2 ${category === cat.slug ? 'text-white border-transparent shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                style={category === cat.slug ? { background: cat.color } : {}}
              >
                {cat.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${category === cat.slug ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{cat.courses_count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[20px] border border-slate-200 overflow-hidden animate-pulse">
                <div className="h-44 bg-slate-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 rounded" />
                  <div className="h-8 bg-slate-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center">
            <p className="font-bold text-rose-700">خطا در ارتباط با سرور</p>
            <p className="text-sm text-rose-600 mt-2">{error}</p>
            <button onClick={() => location.reload()} className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-full text-sm">تلاش مجدد</button>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-[24px] p-10 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900 mt-4">
              {search ? `نتیجه‌ای برای "${search}" یافت نشد` : category ? 'دوره‌ای در این دسته یافت نشد' : 'فعلاً دوره‌ای ثبت نشده است'}
            </h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              {search ? 'عبارت جستجو را تغییر بده یا فیلتر دسته را بردار تا همه دوره‌ها نمایش داده شوند.' : 'به‌زودی دوره‌های جدید اضافه می‌شوند. دسته دیگری انتخاب کن یا جستجو را امتحان کن.'}
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {search && <button onClick={() => updateParam('search', '')} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm">پاک کردن جستجو</button>}
              {category && <button onClick={() => updateParam('category', '')} className="bg-white border border-slate-200 px-5 py-2 rounded-full text-sm">نمایش همه دسته‌ها</button>}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-600">
                نمایش <b>{courses.length}</b> از <b>{count}</b> دوره
                {category && <> در دسته <b>{categories.find(c => c.slug === category)?.name}</b></>}
                {search && <> برای <b>"{search}"</b></>}
              </span>
              <span className="text-xs text-slate-400 hidden sm:block">صفحه {page} از {totalPages}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map(c => <CourseCard key={c.id} course={c} />)}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  disabled={!prev}
                  onClick={() => updateParam('page', String(page - 1))}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => updateParam('page', String(p))}
                    className={`w-10 h-10 rounded-full text-sm font-bold border transition ${p === page ? 'bg-slate-900 text-white border-slate-900 shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={!next}
                  onClick={() => updateParam('page', String(page + 1))}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

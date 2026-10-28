import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const nav = [
    { to: '/', label: 'خانه' },
    { to: '/courses', label: 'دوره‌ها' },
    { to: '/about', label: 'درباره ما' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
      {/* Top bar */}
      <div className="bg-slate-900 text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span className="text-slate-300">به تکنولرن خوش آمدید — آموزش تخصصی طراحی و تدوین دیجیتال</span>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              پشتیبانی: 021-12345678
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              info@technolearn.ir
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-sky-500/20">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[20px] leading-none tracking-tight text-slate-900">TechnoLearn</span>
              <span className="text-[10px] tracking-[0.18em] text-slate-500 font-bold -mt-1">تکنولرن</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-full">
            {nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link to="/courses" className="hidden sm:inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition shadow-md">
              مشاهده دوره‌ها
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            {/* Search icon */}
            <Link to="/courses" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hidden sm:flex">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
              {open ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl">
          <div className="px-4 py-4 flex flex-col gap-2">
            {nav.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/courses" onClick={() => setOpen(false)} className="mt-2 bg-sky-500 text-white text-center py-3 rounded-xl font-bold">
              مشاهده همه دوره‌ها
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

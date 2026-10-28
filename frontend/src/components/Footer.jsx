import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black">T</div>
              <div>
                <div className="font-black text-lg">TechnoLearn</div>
                <div className="text-xs tracking-widest text-slate-400">تکنولرن</div>
              </div>
            </div>
            <p className="text-slate-400 leading-7 text-sm max-w-md">
              تکنولرن بستری حرفه‌ای برای یادگیری مهارت‌های طراحی، تدوین و تولید محتوای دیجیتال است. آموزش‌های ما پروژه‌محور، کاربردی و متناسب با نیاز بازار کار طراحی شده‌اند.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['instagram','telegram','youtube','linkedin'].map(s => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-slate-300">
                  <span className="text-xs font-bold">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm">دسترسی سریع</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white">صفحه اصلی</Link></li>
              <li><Link to="/courses" className="hover:text-white">همه دوره‌ها</Link></li>
              <li><Link to="/about" className="hover:text-white">درباره ما</Link></li>
              <li><a href="#" className="hover:text-white">قوانین و مقررات</a></li>
              <li><a href="#" className="hover:text-white">سوالات متداول</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                تهران، خیابان ولیعصر
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                info@technolearn.ir
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                021-12345678
              </li>
            </ul>
            <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-xs text-slate-400">خبرنامه تکنولرن</div>
              <div className="flex gap-2 mt-2">
                <input placeholder="ایمیل شما" className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-slate-900 outline-none" />
                <button className="bg-sky-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-sky-600">عضویت</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <span className="text-slate-400">© {new Date().getFullYear()} TechnoLearn — تمامی حقوق محفوظ است.</span>
          <span className="text-slate-500">طراحی شده با ❤️ برای یادگیری حرفه‌ای</span>
        </div>
      </div>
    </footer>
  )
}

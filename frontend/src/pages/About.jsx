import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[28px] p-8 lg:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px"}} />
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-sky-500/20 blur-[80px] rounded-full" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-bold">درباره تکنولرن</span>
            <h1 className="text-[28px] sm:text-[34px] font-black leading-tight mt-4">یادگیری مهارت‌های خلاقانه، ساده و کاربردی</h1>
            <p className="text-slate-300 leading-8 mt-4 text-sm max-w-xl">
              تکنولرن با تمرکز بر آموزش‌های ویدیویی در حوزه طراحی، تدوین و تولید محتوای دیجیتال شکل گرفته تا مسیر یادگیری را برای هنرجویان کوتاه، شفاف و نتیجه‌محور کند.
            </p>
            <div className="flex gap-3 mt-6">
              <Link to="/courses" className="bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-100">مشاهده دوره‌ها</Link>
              <a href="#contact" className="bg-white/10 border border-white/20 px-6 py-3 rounded-full text-sm font-bold hover:bg-white/15">ارتباط با ما</a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white rounded-[22px] p-6 text-slate-900 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black">T</div>
                <div>
                  <div className="font-black">TechnoLearn</div>
                  <div className="text-xs text-slate-500">تکنولرن — از ۱۴۰۲</div>
                </div>
              </div>
              <p className="text-sm leading-7 text-slate-600 mt-4">
                «ما باور داریم بهترین آموزش، آموزشی است که فردا در پروژه واقعی‌ات به کار بیاید.»
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { n: '۴', l: 'حوزه آموزشی' },
                  { n: '۱۲', l: 'دوره فعال' },
                  { n: '۹۸٪', l: 'رضایت' },
                ].map(s => (
                  <div key={s.l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="font-black text-lg text-slate-900">{s.n}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-[22px] border border-slate-200 p-7">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-sky-500 rounded-full" />
              معرفی برند
            </h2>
            <p className="text-sm leading-8 text-slate-600 mt-4">
              <strong className="text-slate-900">تکنولرن (TechnoLearn)</strong> پلتفرمی آموزشی برای یادگیری نرم‌افزارهای خلاقانه است. تمرکز ما بر آموزش‌های ویدیویی در زمینه‌های تدوین ویدیو با Premiere Pro، موشن گرافیک با After Effects، طراحی گرافیک با Photoshop و مدل‌سازی سه‌بعدی است. محتوا به صورت مرحله‌ای، پروژه‌محور و هم‌گام با نسخه‌های جدید نرم‌افزارها تدوین می‌شود تا هنرجو بتواند هر آنچه می‌آموزد را مستقیماً در پروژه‌های واقعی به کار گیرد.
            </p>
          </section>

          <section className="bg-white rounded-[22px] border border-slate-200 p-7">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-violet-500 rounded-full" />
              هدف و چشم‌انداز
            </h2>
            <p className="text-sm leading-8 text-slate-600 mt-4">
              هدف ما کوتاه‌کردن فاصله بین «یادگیری» و «کسب درآمد» است. چشم‌انداز تکنولرن تبدیل شدن به مرجع فارسی‌زبان آموزش مهارت‌های دیجیتال خلاقانه است؛ جایی که هر فرد، بدون پیش‌نیاز پیچیده، بتواند با یک مسیر یادگیری شفاف از سطح مقدماتی به سطح حرفه‌ای برسد. در آینده دوره‌ها متناسب با نیاز بازار و بازخورد هنرجویان توسعه می‌یابند و حوزه‌های جدید مانند طراحی UI، صداگذاری و تولید محتوا برای شبکه‌های اجتماعی نیز اضافه خواهند شد.
            </p>
          </section>

          <section className="bg-white rounded-[22px] border border-slate-200 p-7">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-500 rounded-full" />
              حوزه‌های آموزشی
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {[
                { t: 'تدوین ویدیو', d: 'کات حرفه‌ای، روایت داستانی، اصلاح رنگ و خروجی استاندارد با Premiere Pro', c: 'from-sky-500 to-cyan-400' },
                { t: 'موشن گرافیک', d: 'انیمیشن، جلوه‌های ویژه و لوگوموشن با After Effects', c: 'from-violet-500 to-purple-400' },
                { t: 'طراحی گرافیک', d: 'رتوش، ترکیب‌بندی و طراحی پوستر و کاور با Photoshop', c: 'from-pink-500 to-rose-400' },
                { t: 'طراحی سه‌بعدی', d: 'مدل‌سازی، نورپردازی و رندر رئال با Blender', c: 'from-amber-500 to-orange-400' },
              ].map(x => (
                <div key={x.t} className="border border-slate-200 rounded-2xl p-4 hover:shadow-md transition">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${x.c} flex items-center justify-center text-white text-xs font-black`}>{x.t[0]}</div>
                  <h4 className="font-bold text-sm mt-3">{x.t}</h4>
                  <p className="text-xs text-slate-500 leading-6 mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 text-sm">!</span>
              <p className="text-xs leading-6 text-amber-900">
                ساختار دسته‌بندی‌ها به صورت داینامیک از API دریافت می‌شود؛ افزودن حوزه‌های جدید بدون بازنویسی کد امکان‌پذیر است.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-[22px] border border-slate-200 p-7">
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-indigo-500 rounded-full" />
              رویکرد آموزشی
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                'یادگیری مرحله‌به‌مرحله: هر دوره به فصل‌های کوتاه و تمرین‌محور تقسیم شده تا بدون سردرگمی پیش بروی.',
                'تمرین عملی: همراه هر فصل فایل پروژه، فوتیج و تکالیف کاربردی ارائه می‌شود.',
                'به‌روزرسانی مداوم: سرفصل‌ها با نسخه‌های جدید نرم‌افزارها به‌روز می‌شوند.',
                'مسیر شغلی: پروژه‌های پایانی قابل ارائه به کارفرما و مناسب برای نمونه‌کار هستند.',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 text-sm leading-7 text-slate-600">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section id="contact" className="bg-white rounded-[22px] border border-slate-200 p-7">
            <h3 className="font-black text-slate-900">راه‌های ارتباطی</h3>
            <p className="text-xs text-slate-500 mt-2 leading-6">برای پیشنهاد، همکاری یا پیگیری پشتیبانی از راه‌های زیر با ما در تماس باش.</p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div><div className="text-xs text-slate-500">ایمیل</div><div className="text-sm font-bold">info@technolearn.ir</div></div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div><div className="text-xs text-slate-500">تلفن پشتیبانی</div><div className="text-sm font-bold" dir="ltr">021-12345678</div></div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500 text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div><div className="text-xs text-slate-500">آدرس</div><div className="text-sm font-bold">تهران، خیابان ولیعصر</div></div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              {['اینستاگرام','تلگرام','یوتیوب'].map(s => (
                <a key={s} href="#" className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-full text-center hover:bg-slate-800">{s}</a>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-5">ساعت پاسخگویی: شنبه تا چهارشنبه ۹ تا ۱۷ — پاسخ در کمتر از ۲۴ ساعت.</p>
          </section>

          <section className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[22px] p-7 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "18px 18px"}} />
            <h3 className="font-black relative">آماده شروع یادگیری هستی؟</h3>
            <p className="text-sm leading-7 text-white/90 mt-2 relative">همین حالا دوره مورد علاقه‌ات را انتخاب کن و با یک پروژه واقعی شروع کن.</p>
            <Link to="/courses" className="inline-flex bg-white text-slate-900 px-6 py-3 rounded-full text-sm font-bold mt-5 hover:bg-slate-100 relative">مشاهده دوره‌ها</Link>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-[22px] p-6">
            <h4 className="font-bold text-amber-900 text-sm">نکته شفافیت</h4>
            <p className="text-xs leading-7 text-amber-800 mt-2">
              ما از ارائه آمار تأییدنشده یا سوابق شخصی غیرواقعی خودداری می‌کنیم. تمام اطلاعات نمایش‌داده‌شده قابل اتکا و قابل به‌روزرسانی از طریق پنل مدیریت هستند. محتوای این صفحه در فازهای بعدی از طریق API بک‌اند مدیریت خواهد شد.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

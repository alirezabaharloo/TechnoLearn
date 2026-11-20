import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, Blocks, Clapperboard, Code2, Lightbulb, Palette, Play, Sparkles, WandSparkles, Zap } from "lucide-react";
import CourseSearch from "../components/CourseSearch.jsx";
import CourseGrid from "../components/CourseGrid.jsx";
import { useCategories } from "../hooks/useCategories.js";
import { useCourses } from "../hooks/useCourses.js";
import { formatNumber } from "../utils/format.js";

const icons = [Clapperboard, Code2, Palette, WandSparkles, Blocks];
function SectionHeading({ eyebrow, title, description, link = "/courses" }) {
  return <div className="section-heading"><div><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2><p>{description}</p></div><Link className="see-all" to={link}>مشاهده همه <ArrowLeft size={17} /></Link></div>;
}
function CourseSection({ title, eyebrow, description, sort }) {
  const { data, isLoading, isError, refetch } = useCourses({ pageSize: 3, sort });
  return <section className="section container-page"><SectionHeading eyebrow={eyebrow} title={title} description={description} link={`/courses?sort=${sort}`} />
    {isError ? <div className="state-box">دوره‌ها دریافت نشدند. <button className="text-link" onClick={() => refetch()}>تلاش دوباره</button></div> : !isLoading && !data?.results?.length ? <div className="state-box">هنوز دوره‌ای منتشر نشده است.</div> : <CourseGrid courses={data?.results} loading={isLoading} />}
  </section>;
}
export default function HomePage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: categories = [], isLoading, isError, refetch } = useCategories();
  return <>
    <section className="home-hero"><div className="container-page hero-layout"><div className="hero-copy">
      <div className="hero-kicker"><span className="live-dot" /> آینده را فقط تماشا نکن، آن را بساز</div>
      <h1>ایده‌هات رو با <span>هوش مصنوعی</span><br />به واقعیت تبدیل کن<span className="hero-period">.</span></h1>
      <p>از اولین ایده تا پروژه‌ای که به آن افتخار می‌کنی؛ مهارت‌های دنیای جدید را کاربردی و پروژه‌محور یاد بگیر.</p>
      <CourseSearch value={search} onChange={setSearch} onSubmit={(value) => navigate(`/courses${value.trim() ? `?search=${encodeURIComponent(value.trim())}` : ""}`)} variant="hero" />
      <div className="hero-hints"><span>پیشنهاد برای شروع:</span><Link to="/courses?category=programming">برنامه‌نویسی با AI</Link><Link to="/courses?category=graphic-design">طراحی با AI</Link></div>
    </div><div className="hero-art"><div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><img src="/ai-creative-hero.png" alt="" /><div className="art-tag"><span><Sparkles size={19} /></span><div><strong>از ایده تا اجرا</strong><small>با قدرت هوش مصنوعی</small></div></div><div className="art-caption" dir="ltr">CREATE · LEARN · REPEAT <ArrowDownLeft size={16} /></div></div></div>
      <div className="container-page hero-bottom"><span><span className="hero-bottom-icon"><Play size={14} fill="currentColor" /></span> یادگیری برای دنیای واقعی</span><span dir="ltr">YOUR CREATIVE JOURNEY STARTS HERE ↗</span></div>
    </section>
    <div className="value-strip"><div className="container-page value-inner"><span><Zap size={19} /> یادگیری کاربردی</span><i /><span><Blocks size={19} /> آموزش پروژه‌محور</span><i /><span><Sparkles size={19} /> مهارت‌های دنیای جدید</span><i /><span><Lightbulb size={19} /> از ایده تا اجرا</span></div></div>
    <CourseSection eyebrow="تازه‌های تکنولرن" title="جدیدترین دوره‌ها" description="یک قدم تازه برای ساختن آینده‌ای که می‌خواهی." sort="newest" />
    <section className="categories-section" id="categories"><div className="container-page"><SectionHeading eyebrow="مسیر خودت را پیدا کن" title="دوست داری چی بسازی؟" description="از بین مسیرهای یادگیری، علاقه‌ات را انتخاب کن." />
      {isLoading ? <div className="state-box">در حال دریافت دسته‌بندی‌ها...</div> : isError ? <div className="state-box">دسته‌بندی‌ها دریافت نشدند. <button className="text-link" onClick={() => refetch()}>تلاش دوباره</button></div> : !categories.length ? <div className="state-box">هنوز دسته‌بندی‌ای وجود ندارد.</div> : <div className="category-grid">{categories.map((category, index) => { const Icon = icons[index % icons.length]; return <Link to={`/courses?category=${encodeURIComponent(category.slug)}`} className="category-card" key={category.id}><span className={`category-icon color-${index % 5}`}><Icon size={24} /></span><ArrowUpLeft className="category-arrow" size={18} /><strong>{category.name}</strong><small>{formatNumber(category.course_count)} دوره آموزشی</small></Link>; })}</div>}
    </div></section>
    <CourseSection eyebrow="انتخاب یادگیرنده‌ها" title="دوره‌های محبوب" description="دوره‌هایی با بالاترین امتیاز، برای قدم بعدی تو." sort="popular" />
    <section className="why-section" id="why-us"><div className="container-page why-grid"><div><span className="eyebrow light"><span />چرا تکنولرن؟</span><h2>فقط یاد نگیر،<br /><em>خلق کن.</em></h2><p>ما باور داریم بهترین راه یادگیری، ساختن است. در تکنولرن از ابزارها فراتر می‌رویم و سراغ مهارت‌هایی می‌رویم که می‌توانی در پروژه‌های واقعی استفاده کنی.</p><Link className="button-lime" to="/courses">مسیر یادگیری رو پیدا کن <ArrowLeft size={18} /></Link></div><div className="why-features"><div><span><Blocks /></span><section><h3>یادگیری با پروژه واقعی</h3><p>هر مهارت را با تمرین و ساختن، عمیق‌تر یاد بگیر.</p></section></div><div><span><WandSparkles /></span><section><h3>ابزارهای امروز، مهارت‌های فردا</h3><p>هوش مصنوعی را به بخشی از جریان کاری خودت تبدیل کن.</p></section></div><div><span><Lightbulb /></span><section><h3>برای ذهن‌های کنجکاو</h3><p>از ایده‌های کوچک شروع کن و به تجربه‌های بزرگ برس.</p></section></div></div></div></section>
    <section className="container-page cta-wrap"><div className="cta-panel"><div><span className="eyebrow"><span />وقت ساختنه</span><h2>ایده بعدی تو، از اینجا شروع می‌شه.</h2><p>دوره مناسب خودت را پیدا کن و اولین قدم را بردار.</p></div><Link className="button-dark" to="/courses">مشاهده دوره‌ها <ArrowLeft size={18} /></Link><Sparkles className="cta-sparkle" size={100} /></div></section>
  </>;
}

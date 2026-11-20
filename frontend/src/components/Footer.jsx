import { ArrowUpLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer"><div className="container-page">
    <div className="footer-main"><div><Link className="brand footer-brand" to="/"><span className="brand-mark"><Sparkles size={21} /></span><span dir="ltr">techno<span>learn.</span></span></Link><p>اینجا ایده‌ها با هوش مصنوعی به واقعیت تبدیل می‌شوند. یاد بگیر، تجربه کن و بساز.</p></div>
      <div><h3>دسترسی سریع</h3><Link to="/">صفحه اصلی</Link><Link to="/courses">همه دوره‌ها</Link><Link to="/#categories">دسته‌بندی‌ها</Link></div>
      <div><h3>مسیر یادگیری</h3><p>آموزش‌های کاربردی برای دنیایی که هر روز در حال تغییر است.</p><Link className="footer-link" to="/courses">کاوش دوره‌ها <ArrowUpLeft size={16} /></Link></div></div>
    <div className="footer-bottom"><span>© {new Intl.NumberFormat("fa-IR", {useGrouping:false}).format(new Date().getFullYear())} تکنولرن. همه حقوق محفوظ است.</span><span dir="ltr">Made for curious minds ✳</span></div>
  </div></footer>;
}

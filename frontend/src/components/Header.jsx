import { useState } from "react";
import { ArrowUpLeft, Menu, Sparkles, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container-page header-inner">
    <Link className="brand" to="/" onClick={() => setOpen(false)} aria-label="تکنولرن، صفحه اصلی"><span className="brand-mark"><Sparkles size={21} /></span><span dir="ltr">techno<span>learn.</span></span></Link>
    <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="ناوبری اصلی">
      <NavLink to="/" end onClick={() => setOpen(false)}>خانه</NavLink>
      <NavLink to="/courses" onClick={() => setOpen(false)}>همه دوره‌ها</NavLink>
      <Link to="/#categories" onClick={() => setOpen(false)}>دسته‌بندی‌ها</Link>
      <Link to="/#why-us" onClick={() => setOpen(false)}>درباره تکنولرن</Link>
    </nav>
    <Link className="header-cta" to="/courses">شروع یادگیری <ArrowUpLeft size={16} /></Link>
    <button className="menu-toggle" type="button" aria-label={open ? "بستن منو" : "باز کردن منو"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div></header>;
}

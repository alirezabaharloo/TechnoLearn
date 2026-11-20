import { useState } from "react";
import { Clock3, Layers3, Sparkles, Star, UserRound } from "lucide-react";
import { formatDuration, formatNumber, formatPrice, formatRating } from "../utils/format.js";

export default function CourseCard({ course }) {
  const [imageFailed, setImageFailed] = useState(false);
  const rating = formatRating(course.rating);
  const hasDiscount = course.discount_price != null && Number(course.discount_price) < Number(course.price);
  return <article className="course-card">
    <div className="card-image">{course.thumbnail && !imageFailed ? <img src={course.thumbnail} alt="" loading="lazy" onError={() => setImageFailed(true)} /> : <div className="card-fallback"><Sparkles size={38} /><span>{course.category?.name}</span></div>}
      <span className="card-category">{course.category?.name || "آموزش"}</span>
    </div>
    <div className="card-body"><h3>{course.title}</h3><p className="card-description">{course.short_description}</p>
      <div className="card-instructor"><UserRound size={16} /> {course.instructor_name}</div>
      <div className="card-meta"><span><Clock3 size={15} /> {formatDuration(course.duration)}</span><span><Layers3 size={15} /> {formatNumber(course.lesson_count)} جلسه</span>{rating && <span className="rating"><Star size={15} fill="currentColor" /> {rating}</span>}</div>
      <div className="card-price"><span>هزینه دوره</span><div>{hasDiscount && <del>{formatPrice(course.price)}</del>}<strong>{formatPrice(hasDiscount ? course.discount_price : course.price)}</strong></div></div>
    </div>
  </article>;
}

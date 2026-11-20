import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Layers, Star } from "lucide-react";

import { formatDuration, formatPrice, formatRating, thumbnailGradient } from "../utils/format.js";

/**
 * A single course card with thumbnail, title, description, category,
 * instructor, price, duration, lesson count, and rating.
 */
export default function CourseCard({ course }) {
  const [imageFailed, setImageFailed] = useState(false);
  const rating = formatRating(course.rating);
  const categoryName = course.category?.name ?? "Uncategorized";
  const showImage = course.thumbnail && !imageFailed;

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-navy-200 hover:shadow-card-hover focus:outline-none focus-visible:ring-4 focus-visible:ring-navy-500/20"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {showImage ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${thumbnailGradient(
              course.title
            )} text-white`}
          >
            <span className="px-3 text-center font-display text-sm font-semibold">
              {categoryName}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy-700 backdrop-blur-sm">
          {categoryName}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-slate-900 group-hover:text-navy-700">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {course.short_description}
        </p>

        <p className="mt-4 text-xs font-medium text-slate-600">
          {course.instructor_name}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {formatDuration(course.duration)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-slate-400" />
            {course.lesson_count} lessons
          </span>
          {rating && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-500">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {rating}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="font-display text-lg font-bold text-slate-900">
            {formatPrice(course.price)}
          </span>
          <span className="text-sm font-semibold text-navy-600 group-hover:text-brand-600">
            View course →
          </span>
        </div>
      </div>
    </Link>
  );
}

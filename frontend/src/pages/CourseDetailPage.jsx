import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Layers, Star, Tag, User } from "lucide-react";

import { useCourse } from "../hooks/useCourse.js";
import { formatDuration, formatPrice, formatRating, thumbnailGradient } from "../utils/format.js";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { data: course, isLoading, isError } = useCourse(slug);
  const [imageFailed, setImageFailed] = useState(false);

  if (isLoading) {
    return (
      <div className="container-page py-12">
        <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 aspect-video w-full animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-6 h-8 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="container-page py-16">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
          <h1 className="font-display text-xl font-semibold text-slate-900">
            Course not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            The course you’re looking for doesn’t exist or is no longer available.
          </p>
          <Link
            to="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const rating = formatRating(course.rating);
  const categoryName = course.category?.name ?? "Uncategorized";
  const showImage = course.thumbnail && !imageFailed;

  return (
    <div className="container-page py-8 sm:py-10">
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-600 transition-colors hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        All courses
      </Link>

      <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
        {/* Thumbnail */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 sm:aspect-[21/9]">
          {showImage ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${thumbnailGradient(
                course.title
              )} text-white`}
            >
              <span className="px-4 text-center font-display text-lg font-semibold">
                {course.title}
              </span>
            </div>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
              {categoryName}
            </span>
            {rating && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {rating}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {course.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {course.short_description}
          </p>

          {/* Key facts */}
          <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-slate-100 py-6 sm:grid-cols-4">
            <Detail icon={<User className="h-4 w-4" />} label="Instructor" value={course.instructor_name} />
            <Detail icon={<Clock className="h-4 w-4" />} label="Duration" value={formatDuration(course.duration)} />
            <Detail icon={<Layers className="h-4 w-4" />} label="Lessons" value={`${course.lesson_count}`} />
            <Detail icon={<Tag className="h-4 w-4" />} label="Price" value={formatPrice(course.price)} />
          </dl>

          {/* Full description */}
          <div className="mt-6">
            <h2 className="font-display text-lg font-semibold text-slate-900">
              About this course
            </h2>
            <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-slate-600">
              {course.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-slate-900">{value}</dd>
    </div>
  );
}

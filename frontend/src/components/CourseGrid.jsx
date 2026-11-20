import CourseCard from "./CourseCard.jsx";

function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-video animate-pulse bg-slate-200" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

/**
 * Responsive grid of course cards.
 *
 * Props:
 *  - courses: array of course objects
 *  - loading: show skeleton placeholders while loading
 */
export default function CourseGrid({ courses, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, index) => (
        <div
          key={course.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
        >
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
}

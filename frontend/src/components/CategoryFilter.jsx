import { useCategories } from "../hooks/useCategories.js";

function SkeletonChips() {
  return (
    <div className="flex flex-wrap gap-2" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-9 w-32 animate-pulse rounded-full bg-slate-200/80"
        />
      ))}
    </div>
  );
}

/**
 * Horizontal category filter. Categories are loaded dynamically from the
 * backend. Renders an "All Courses" chip plus one chip per category.
 *
 * Props:
 *  - activeCategory: slug of the active category, or null for "All Courses"
 *  - onSelect: called with the chosen slug, or null for "All Courses"
 */
export default function CategoryFilter({ activeCategory, onSelect }) {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
          Browse by category
        </h2>
      </div>

      {isLoading ? (
        <SkeletonChips />
      ) : isError ? (
        <p className="text-sm text-slate-500">Categories are unavailable right now.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Chip
            label="All Courses"
            active={!activeCategory}
            onClick={() => onSelect?.(null)}
          />
          {categories.map((category) => (
            <Chip
              key={category.slug}
              label={category.name}
              active={activeCategory === category.slug}
              onClick={() => onSelect?.(category.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-transparent bg-gradient-to-r from-navy-600 to-brand-600 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-navy-300 hover:text-navy-700",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

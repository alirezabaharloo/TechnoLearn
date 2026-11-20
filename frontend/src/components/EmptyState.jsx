import { Inbox, SearchX } from "lucide-react";

/**
 * A friendly empty state shown when no courses match the current filters.
 *
 * Props:
 *  - title
 *  - message
 *  - onReset: optional callback to clear filters
 *  - resetLabel: label for the reset button
 */
export default function EmptyState({
  title = "No courses found",
  message = "Try adjusting your search or category to find what you're looking for.",
  onReset,
  resetLabel = "Clear filters",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-navy-500">
        <SearchX className="h-7 w-7" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500">{message}</p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-navy-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
        >
          <Inbox className="h-4 w-4" />
          {resetLabel}
        </button>
      )}
    </div>
  );
}

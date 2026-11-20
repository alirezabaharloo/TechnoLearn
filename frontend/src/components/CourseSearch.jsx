import { Search } from "lucide-react";

/**
 * A reusable search input. It is fully controlled: the parent owns the value
 * and decides what happens on change and on submit.
 *
 * Props:
 *  - value: current search term
 *  - onChange: called with the next value on every keystroke
 *  - onSubmit: called with the current value on submit
 *  - placeholder
 *  - variant: "hero" (large) or "default" (compact)
 *  - autoFocus
 */
export default function CourseSearch({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search courses",
  variant = "default",
  autoFocus = false,
}) {
  const isHero = variant === "hero";

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
      className={[
        "flex items-center gap-2 rounded-2xl border border-slate-200 bg-white",
        "focus-within:border-navy-400 focus-within:ring-4 focus-within:ring-navy-500/10",
        isHero
          ? "mx-auto w-full max-w-xl px-4 py-3 shadow-xl shadow-navy-950/30 sm:px-5"
          : "px-3.5 py-2.5 shadow-sm",
      ].join(" ")}
    >
      <Search
        className={[
          "shrink-0 text-slate-400",
          isHero ? "h-5 w-5" : "h-4 w-4",
        ].join(" ")}
      />
      <input
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        className={[
          "w-full bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none",
          isHero ? "py-1 text-base" : "py-0.5 text-sm",
        ].join(" ")}
      />
      <button
        type="submit"
        className={[
          "inline-flex shrink-0 items-center justify-center rounded-xl font-semibold text-white transition-colors",
          isHero
            ? "bg-gradient-to-r from-navy-600 to-brand-600 px-5 py-2.5 text-sm hover:from-navy-500 hover:to-brand-500"
            : "bg-navy-700 px-3.5 py-1.5 text-xs hover:bg-navy-600",
        ].join(" ")}
      >
        Search
      </button>
    </form>
  );
}

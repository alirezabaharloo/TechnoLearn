import { Search } from "lucide-react";

import CourseSearch from "./CourseSearch.jsx";

const HIGHLIGHTS = [
  "Project-based learning",
  "Tools you can use today",
  "Built for working professionals",
];

export default function HeroSection({ searchValue, onSearch }) {
  return (
    <section className="hero-glow relative overflow-hidden bg-navy-950 text-white">
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <div className="container-page relative py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-brand-100">
            <Search className="h-3.5 w-3.5" />
            Practical AI education, built around real outcomes
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Learn to build with AI,
            <br className="hidden sm:block" />{" "}
            <span className="bg-gradient-to-r from-brand-300 to-navy-200 bg-clip-text text-transparent">
              one project at a time
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            TechnoLearn teaches practical, project-based AI skills across creative
            and technical fields. Go from tools to finished work — fast.
          </p>

          <div className="mt-8">
            <CourseSearch
              value={searchValue}
              onChange={onSearch}
              onSubmit={onSearch}
              placeholder="Search for a course, e.g. motion graphics"
              variant="hero"
            />
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-600 to-brand-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display font-bold text-slate-900">
            Techno<span className="gradient-text">Learn</span>
          </span>
        </div>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} TechnoLearn. Practical AI education.
        </p>
      </div>
    </footer>
  );
}

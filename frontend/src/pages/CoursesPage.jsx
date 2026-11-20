import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HeroSection from "../components/HeroSection.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import CourseGrid from "../components/CourseGrid.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Pagination from "../components/Pagination.jsx";
import { useCourses } from "../hooks/useCourses.js";
import { useCategories } from "../hooks/useCategories.js";

const PAGE_SIZE = 9;

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || null;
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  const [input, setInput] = useState(search);
  const initialized = useRef(false);

  const { data, isLoading, isError, refetch } = useCourses({
    search,
    category,
    page,
    pageSize: PAGE_SIZE,
  });
  const { data: categories } = useCategories();

  // Merge URL updates without clobbering the other query parameters.
  const updateParams = (updates) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    });
  };

  // Debounced search: update the URL (and reset to page 1) shortly after typing.
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    const timer = setTimeout(() => {
      updateParams({ search: input || null, page: 1 });
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // Keep the input in sync when the search term changes via navigation.
  useEffect(() => {
    setInput(search);
  }, [search]);

  const handleSearch = (value) => {
    setInput(value);
    updateParams({ search: value || null, page: 1 });
  };

  const handleCategorySelect = (slug) => {
    updateParams({ category: slug, page: 1 });
  };

  const handlePageChange = (nextPage) => {
    updateParams({ page: nextPage });
  };

  const handleReset = () => {
    setInput("");
    updateParams({ search: null, category: null, page: 1 });
  };

  const results = data?.results ?? [];
  const total = data?.count ?? 0;
  const categoryName =
    category && categories?.find((c) => c.slug === category)?.name ?? null;

  const heading = search
    ? `Results for “${search}”`
    : categoryName
    ? categoryName
    : "All courses";

  return (
    <>
      <HeroSection searchValue={input} onSearch={handleSearch} />

      <section className="container-page py-10 sm:py-12">
        <CategoryFilter activeCategory={category} onSelect={handleCategorySelect} />

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
              {heading}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isLoading && data
                ? "Updating…"
                : `${total} course${total === 1 ? "" : "s"} found`}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {isError && !data ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
              <p className="font-medium text-red-700">
                We couldn’t load courses right now.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
              >
                Try again
              </button>
            </div>
          ) : results.length === 0 && !isLoading ? (
            <EmptyState onReset={handleReset} />
          ) : (
            <CourseGrid courses={results} loading={isLoading && !data} />
          )}
        </div>

        {data && total > PAGE_SIZE && (
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={total}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
}

import { useQuery } from "@tanstack/react-query";

import { fetchCourses } from "../api/client.js";

/**
 * Loads a page of published courses.
 *
 * @param {object} options
 * @param {string} [options.search]   Case-insensitive title search term.
 * @param {string} [options.category] Category slug filter.
 * @param {number} [options.page]     1-based page number.
 * @param {number} [options.pageSize] Number of courses per page.
 */
export function useCourses({ search, category, page, pageSize } = {}) {
  return useQuery({
    queryKey: [
      "courses",
      {
        search: search || null,
        category: category || null,
        page: page || 1,
        pageSize: pageSize || 9,
      },
    ],
    queryFn: () => fetchCourses({ search, category, page, pageSize }),
    // Keep the previous page visible while the next one loads for smooth UX.
    placeholderData: (previous) => previous,
  });
}

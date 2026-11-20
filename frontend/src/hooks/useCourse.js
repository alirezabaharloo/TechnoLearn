import { useQuery } from "@tanstack/react-query";

import { fetchCourse } from "../api/client.js";

/** Loads a single published course by slug. */
export function useCourse(slug) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => fetchCourse(slug),
    enabled: Boolean(slug),
  });
}

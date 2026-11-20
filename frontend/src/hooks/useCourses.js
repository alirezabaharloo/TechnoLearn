import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../api/client.js";

export function useCourses({ search, category, page = 1, pageSize = 9, sort = "newest" } = {}) {
  return useQuery({
    queryKey: ["courses", { search: search || "", category: category || "", page, pageSize, sort }],
    queryFn: () => fetchCourses({ search, category, page, page_size: pageSize, sort }),
  });
}

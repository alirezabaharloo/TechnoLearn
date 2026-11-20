import axios from "axios";

// API base URL comes from the environment; defaults to the relative "/api"
// path which is proxied to the Django backend by the Vite dev server.
const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

/** GET /api/categories/ */
export async function fetchCategories() {
  const { data } = await apiClient.get("/categories/");
  return data;
}

/** GET /api/courses/ with optional search/category/pagination params. */
export async function fetchCourses(params = {}) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
  const { data } = await apiClient.get("/courses/", { params: clean });
  return data;
}

/** GET /api/courses/{slug}/ */
export async function fetchCourse(slug) {
  const { data } = await apiClient.get(`/courses/${slug}/`);
  return data;
}

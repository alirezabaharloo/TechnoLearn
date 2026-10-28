const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  return res.json();
}

export const api = {
  getCategories: () => request('/categories/'),
  getCourses: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') searchParams.append(k, v);
    });
    const qs = searchParams.toString();
    return request(`/courses/${qs ? `?${qs}` : ''}`);
  },
  getFeatured: () => request('/courses/featured/'),
  getCourse: (slug) => request(`/courses/${slug}/`),
};

export function formatPrice(price) {
  if (price === null || price === undefined) return '';
  return Number(price).toLocaleString('fa-IR') + ' تومان';
}

export function truncate(text, n = 100) {
  if (!text) return '';
  return text.length > n ? text.slice(0, n) + '...' : text;
}

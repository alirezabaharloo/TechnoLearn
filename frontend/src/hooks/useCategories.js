import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "../api/client.js";

/** Loads the list of categories from the backend. */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
}

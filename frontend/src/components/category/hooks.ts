import { fetchCategories } from "./api";
import { useQuery } from "@tanstack/react-query";

export const CATEGORY_KEY = "CATEGORY_KEY";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORY_KEY],
    queryFn: fetchCategories,
  });
};

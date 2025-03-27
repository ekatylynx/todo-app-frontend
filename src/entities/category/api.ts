import { call } from "@/shared/api/api";

import { Categories } from "./model";
import { CATEGORY_ENDPOINTS } from "@/shared/config/api";

// Categories Get All Queryset
export const allCategoriesUser = async (): Promise<Categories[]> =>
  call({ path: CATEGORY_ENDPOINTS.ALL_CATEGORIES, method: "GET", re: false});

// Categories Get Filtered Queryset
export const allFilteredCategories = async (id: number): Promise<Categories[]> =>
  call({ path: CATEGORY_ENDPOINTS.ALL_FILTERED_CATEGORIES(id), method: "GET", re: false});

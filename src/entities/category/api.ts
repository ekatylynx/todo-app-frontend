import { call } from "@/shared/api/api";

import { Categories } from "./model";
import { CATEGORY_ENDPOINTS } from "@/shared/config/api";
import { Todo } from "../todo/model";

// Categories Get All Queryset
export const allCategoriesUser = async (): Promise<Categories[]> =>
  call({ path: CATEGORY_ENDPOINTS.ALL_CATEGORIES, method: "GET", re: false});

// Categories Get Filtered Queryset
// TODO: Возможно необходимо перенести в entity Todo
export const allFilteredCategories = async (id: number): Promise<Todo[]> =>
  call({ path: CATEGORY_ENDPOINTS.ALL_FILTERED_CATEGORIES(id), method: "GET", re: false});

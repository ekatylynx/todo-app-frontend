import { User } from "./model";
import { call } from "@/shared/api/api";
import { USER_ENDPOINTS } from "@/shared/config/api";

// Todo Get All Queryset
export const getUserData = async (): Promise<User> =>
  call<User>({ path: USER_ENDPOINTS.GET_USER_DATA, method: "GET", re: false});

import axios, { AxiosResponse } from "axios";
import { setToken, getToken } from "./local-storage-service";
import { API_URL, ITEM_ROUTE, RECIPE_ROUTE, USER_ROUTE } from "../environment";
import { User } from "../types";
import { BOOKMARKS_ROUTE } from "./../environment";

const axiosApiInstance = axios.create();

axiosApiInstance.defaults.baseURL = API_URL;

//auth interceptor
axiosApiInstance.interceptors.request.use(async (config: any) => {
  try {
    const token = getToken();
    config.headers.authorization = token;
    return config;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axiosApiInstance.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axiosApiInstance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axiosApiInstance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) =>
    axiosApiInstance.delete<T>(url).then(responseBody),
};

const user = {
  register: (user: User) => requests.post<any>(`${USER_ROUTE}/signup`, user),

  login: (user: User) => requests.post<any>(`${USER_ROUTE}/login`, user),

  update: (user: User) => requests.put<any>(`${USER_ROUTE}/profile`, user),

  delete: (user: User) => requests.post<any>(`${USER_ROUTE}`, user),

  getProfile: () => requests.get<any>(`${USER_ROUTE}/profile`),

  getBookmarkedRecipes: () => requests.get<any>(`${USER_ROUTE}/bookmarks`),

  addBookmarkRecipe: (id: number) =>
    requests.post<any>(`${USER_ROUTE}/bookmarks`, { id }),

  removeBookmarkRecipe: (id: number) =>
    requests.delete<any>(`${USER_ROUTE}/bookmarks/${id}`),
};

const recipe = {
  list: () => requests.get<any>(`${RECIPE_ROUTE}`),

  getByName: (name: string) =>
    requests.get<any>(`${RECIPE_ROUTE}/name/${name}`),

  getById: (id: number) => requests.get<any>(`${RECIPE_ROUTE}/id/${id}`),

  getTree: (recipe_id: number, quantity: number) =>
    requests.get<any>(`${RECIPE_ROUTE}/tree/${recipe_id}/${quantity}`),
};

const bookmarks = {
  list: () => requests.get<any>(`${BOOKMARKS_ROUTE}`),

  add: (recipe_id: number) =>
    requests.post<any>(`${BOOKMARKS_ROUTE}`, { recipe_id }),

  remove: (recipe_id: number) =>
    requests.delete<any>(`${BOOKMARKS_ROUTE}/${recipe_id}`),
};

const item = {};

const apiService = {
  user,
  recipe,
  item,
  bookmarks,
};

export default apiService;

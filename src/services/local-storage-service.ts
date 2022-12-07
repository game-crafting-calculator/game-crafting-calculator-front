import { User } from "../types";
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setProfile = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const getProfile = () => {
  return JSON.parse(localStorage.getItem("profile") || "");
};

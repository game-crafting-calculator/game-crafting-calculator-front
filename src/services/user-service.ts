import axios from "axios";
import { API_URL, USER_ROUTE } from "../environment";
import { User } from "../types";

const URL = `${API_URL}/${USER_ROUTE}`;

const register = (user: User) => {
  return axios.post(`${URL}/register`, { user });
};

const login = (email: string, password: string) => {
  return axios.post(`${URL}/login`, { email, password });
};

const updateProfile = (user: User) => {
  return axios.put(`${URL}/update`, { user });
};

const deleteAccount = (user: User) => {
  return axios.delete(`${URL}/delete`);
};

export default { register, login, updateProfile, deleteAccount };

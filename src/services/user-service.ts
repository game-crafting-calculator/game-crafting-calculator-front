import axios from "axios";
import { API_URL, USER_ROUTE } from "../environment";
import { User } from "../types";
import { setToken, getToken } from "./local-storage-service";

const URL = `${API_URL}/${USER_ROUTE}`;

const config = {
  headers: {
    authorization: getToken(),
  },
};

const register = async (user: User) => {
  let response = await axios.post(`${URL}/signup`, user, config);

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
};

const login = async (user: User) => {
  let response = await axios.post(`${URL}/login`, user, config);

  if (response.status === 200) {
    setToken(response.data.token);
    return true;
  } else {
    return false;
  }
};

const updateProfile = async (user: User) => {
  return axios.put(`${URL}/update`, user, config);
};

const deleteAccount = async (user: User) => {
  return axios.delete(`${URL}/delete`, config);
};

//Auth
const isLoggedIn = () => {
  return getToken() ? true : false;
};
export default { register, login, updateProfile, deleteAccount, isLoggedIn };

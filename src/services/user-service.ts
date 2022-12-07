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
    return [true, response.data];
  } else {
    return [false];
  }
};

const updateProfile = async (user: User) => {
  const response = await axios.put(`${URL}/profile`, user, config);

  if (response.status === 200) {
    return [true, response.data];
  } else {
    return [false];
  }
};

const deleteAccount = async (user: User) => {
  const response = await axios.delete(`${URL}/delete`, config);

  if (response.status === 200) {
    return [true, response.data];
  } else {
    return [false];
  }
};

const getProfile = async (user: User) => {
  const response = await axios.get(`${URL}/profile`, config);

  if (response.status === 200) {
    return [true, response.data];
  } else {
    return [false];
  }
};

//Auth
const isLoggedIn = () => {
  return getToken() ? true : false;
};
export default {
  register,
  login,
  updateProfile,
  deleteAccount,
  isLoggedIn,
  getProfile,
};

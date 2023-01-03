import axios from "axios";
import { API_URL, RECIPE_ROUTE } from "../environment";
import { User } from "../types";

const URL = `${API_URL}/${RECIPE_ROUTE}`;

const request: any = {};

request.getAllRecipes = async () => {
  let response = await axios.get(`${URL}/`);

  if (response.status === 200) {
    return [true, response.data];
  } else {
    return [false];
  }
};

export default request;

import { API_URL } from "../../routes/consts";
import axios from "axios";

export const fetchCategories = () =>
  axios.get(`${API_URL}/categories`).then((response) => response.data);

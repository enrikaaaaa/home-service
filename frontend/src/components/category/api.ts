import { API_URL } from "../../routes/consts";
import axiosInstance from "../../config/axios";

export const fetchCategories = () =>
  axiosInstance.get(`${API_URL}/categories`).then((response) => response.data);

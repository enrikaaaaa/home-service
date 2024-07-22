import { API_URL } from "../../routes/consts";
import axios from 'axios';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized, redirecting to login...');
      } else if (error.response.status === 403) {
        console.error('Forbidden, you do not have the necessary permissions.');
      } else if (error.response.status === 500) {
        console.error('Internal server error, please try again later.');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

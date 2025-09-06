import axios from "axios";

export const API_BASE_URL = "http://localhost:7079/api/v1/";

// Basic axios config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to add authentication token

/*
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bk_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default api;
import axios from "axios";
import { clearSession } from "../utils/auth";

const api = axios.create({ baseURL: import.meta.env.APIlocal });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("/auth/login");

    if ((status === 401 || status === 403) && !isLoginRequest) {
      clearSession();
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);

export default api;

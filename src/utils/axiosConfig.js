import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuthContext from "../hooks/useAuthContext";

const useAxios = () => {
  const { refreshAccessToken } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          token = await refreshAccessToken();
        }
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      config.headers["Content-Type"] = "application/json, charset=utf-8";
      config.headers["Allow-Control-Allow-Origin"] = "*";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshAccessToken();
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;

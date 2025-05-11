import { store } from "@/redux/store";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://closing-dinosaur-apt.ngrok-free.app/api",
    timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "asklaksl993",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

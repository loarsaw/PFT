import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://316c-103-41-38-82.ngrok-free.app",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "asklaksl993",
  },
});

export default axiosInstance;

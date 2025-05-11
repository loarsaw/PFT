import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://closing-dinosaur-apt.ngrok-free.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "asklaksl993",
  },
});

export default axiosInstance;

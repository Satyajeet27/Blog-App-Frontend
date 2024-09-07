import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosClient;

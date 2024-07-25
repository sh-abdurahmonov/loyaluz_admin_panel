import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.dezinfeksiyatashkent.uz/api/",
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ACCESS_TOKEN"); // or any other way you store the token
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

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.dezinfeksiyatashkent.uz/api/",
  headers: {
    "content-type": "application/json; charset=UTF-8",
  },
});
export default axiosClient;

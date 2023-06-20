import axios from "axios";
import dashBoardConfig from "../blogDashboard";


function getAxios() {
  const instance = axios.create({
    timeout: 3000000,
    baseURL: dashBoardConfig.host
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

export default getAxios;
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:80",
  //   baseURL: "https://chatapp-backend-2mf4.onrender.com",
});

export default instance;

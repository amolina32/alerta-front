import axios from "axios";

axios.interceptors.request.use(async (request) => {
  request.headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
  return request;
});

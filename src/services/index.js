import axios from "axios";
import authService from "./auth";

const API_ENVS = {
  production: "",
  developement: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const canThrowError =
      error.request.status === 0 || error.request.status === 500;

    if (canThrowError) {
      throw new Error(error.message);
    }

    return error;
  }
);

export default {
  auth: authService(httpClient),
};

import axios from "axios";
import { URL_API, getToken } from ".";

const timeout = 1000 * 120;
const createRequest = axios.create({
  baseURL: URL_API,
  timeout,
});

//Create an interceptor to add Authorization header (Embedded isToken())
createRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default createRequest;

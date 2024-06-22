import axios from "axios";
import config from "../config/config";

import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: config.baseUrl,
  // timeout: 1000,
});
instance.interceptors.request.use(function (config) {
  const token = getAuthorizationHeader().Authorization;
  if (!isEmpty(token)) {
    config.headers.Authorization = token;
  }
  return config;
});

function getAuthorizationHeader() {
  const userToken = Cookies.get("userToken");
  return {
    Authorization: userToken,
  };
}
export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default instance;

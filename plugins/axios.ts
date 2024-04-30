//plugin for axios interceptors add token in request if token exist in cookie

import axios from "axios";

export default defineNuxtPlugin(async () => {
  //define default backend url
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
  axios.interceptors.request.use(function (config) {
    const access_token = useCookie("token");
    config.headers.Authorization = `Bearer ${access_token.value}`;
    return config;
  });
  return {
    provide: {
      axios: axios,
    },
  };
});

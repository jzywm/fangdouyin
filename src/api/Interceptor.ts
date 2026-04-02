import axios from "axios";
import isLogin from "@/hooks/isLogin";


const islongin = isLogin

// 设置请求基础URL - 使用相对路径，通过 Vite 代理转发
axios.defaults.baseURL = '/api/v1/';

axios.interceptors.request.use(function (config) {

  console.log("Request Interceptor:", config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

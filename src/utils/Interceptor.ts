import axios from "axios";

// 设置请求基础URL - 使用相对路径，通过 Vite 代理转发
// const service = axios.defaults.baseURL = '/api/v1/';

const service = axios.create({
  baseURL: '/api/v1/', // 基础路径
  timeout: 5000        // 超时时间
});
service.interceptors.request.use(
  function (config) {
  const token = localStorage.getItem('usertoken')
  if (token) {
      // 常见的格式是 'Bearer <token>'，具体看后端要求
      config.headers.Authorization = `Bearer ${token}`;
    }
  console.log("Request Interceptor:", config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

service.interceptors.response.use(
  function (response) {

  return response;
}, function (error) {

  return Promise.reject(error);
});

export default service

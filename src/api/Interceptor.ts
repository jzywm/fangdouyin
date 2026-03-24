import axios from "axios";
import useUserStore from "@/stores/user";
import { useModalStore } from "@/stores/module";
import router from "@/router";
import isLogin from "@/hooks/isLogin";


const islongin = isLogin

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log("Request Interceptor:", config);

  if (config.url === "/recommend" || config.url === "/follow" || config.url === "/friends" || config.url === "/profile" || config.url === "/live") {
    // 从用户存储中获取token并设置到请求头
    if (!islongin) {
      const moduleStore = useModalStore();
      moduleStore.getModelOption("7");
      return Promise.reject(new Error("请先登录"));
    }
    config.headers["Authorization"] = useUserStore().token;
    return config;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

import { defineStore } from "pinia";
import { useModalStore } from "./module";
import verifyToken from "../api/verifyToken";
import isLogin from "@/hooks/isLogin";

interface ApiResponse {
  code: number;      // 状态码，例如 200, 404, 500
  message: string;   // 返回的消息，例如 "成功", "用户不存在"
  data: {
    _id: string;
    username: string;
    tel: string;
    Image: string;
    createAT: string;
    updateAT: string;
    __v: number;
    avatarImage: string;
    code: string;
    codeExpiresAt: string;
    iat: number;
    exp: number;
  }
}

export const useUserStore = defineStore("user", {
  state: () => ({
    islodin: false,
    userid: '',
    token: 'null',
    username: '假装有网名',
    avatar: '',
    guanzhunum: 0,
    fensinum: 0,
    likenum: 0,
    collectnum: 0,
    myworknum: 0,
    likelist: [],
    collectlist: [],
    historylist: [],
    waitlist: [],
    myworklist: [],

  }),
  actions: {
    login() {
      useModalStore().getModelOption('1')
    }
  }
})
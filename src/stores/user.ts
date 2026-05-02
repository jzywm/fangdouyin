import { defineStore } from "pinia";
import { useModalStore } from "./module";
import verifyToken from "../api/verifyToken";

export const useUserStore = defineStore("user", {
  state: () => ({
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
    islodin: false

  }),
  actions: {
    login() {
      useModalStore().getModelOption('1')
    },
    async validatetoken(token: string) {
      const data = await verifyToken(token);
      if (data === false) {
        this.token = 'null';
        this.userid = '';
        this.username = '';
        this.avatar = '';
      }
      return data;
    }
  }
})
import { defineStore } from "pinia";
import { useModalStore } from "./module";

export const useUserStore = defineStore("user", {
  state: () => ({
    userid: '',
    token: 'null',
  }),
  actions: {
    login() {
      useModalStore().getModelOption('1')
    }
  }
})
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    modeloption: '0'
  }),
  actions:{
    getModelOption(modoulsid: string) {
      this.modeloption = modoulsid
      console.log(this.modeloption)
    }
  }
})
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({
    userid: '',
    token: " null ",
  }),
  actions: {

  }
})

export default useUserStore
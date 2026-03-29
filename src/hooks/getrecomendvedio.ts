import { useUserStore } from "@/stores/user";
import router from "@/router";
import { ref } from "vue";

const isLogin = ref(false)

function getcommvedio(userid: string) {
  if (userid.trim() === '') {
    router.push("/login");
    isLogin.value = false
    return isLogin.value
  } else {
    isLogin.value = true
    return isLogin.value
  }
}

export default getcommvedio;

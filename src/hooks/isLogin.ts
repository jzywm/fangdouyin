import useUserStore from "@/stores/user";
export default function isLogin() {
  if (!useUserStore().userid) {
    alert("请先登录");
    return false;
  }
  return true;
}

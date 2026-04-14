import { defineStore } from "pinia"
import { useUserStore } from "./user";
import getCode from "../api/getCode"
import postpassword from "@/api/postpassword";
import postCode from "@/api/postcode";
import getRegisterCode from "@/api/getRegisterCode";
import postRegister from "@/api/postRegister";
import validateToken from "@/api/verifyToken"
import { ElMessage } from "element-plus";
import { useModalStore } from "@/stores/module"
import { storeToRefs } from 'pinia'

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

export const useLoginstore = defineStore('login', {
    state: () => ({
        rightcode: " ",
        rightpassword: " ",
        LoginIn: ' ',
        userid: " ",
        usertoken: " ",
        totalSecond: 5,
        second: 5,
        timer: 0,
        register: false
    }),
    actions: {
        async getregistercode(phone: string, username: string) {
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (phone.trim() === "") {
                ElMessage.error("手机号不能为空");
                return false;
            }
            if (phoneRegex.test(phone) === false) {
                ElMessage.error("请输入正确的手机号码");
                return false;
            }
            try {
                const response = await getRegisterCode(phone, username);
                this.rightcode = response.code;
                ElMessage.success(`验证码已发送，请注意查收${response.data.code}`);
                return true;
            } catch (error) {
                console.error("Error fetching code:", error);
                console.log(error)
                ElMessage.error(`发送验证码失败，请稍后重试${error}`);
                return false;
            }
        },
        async registeruser(username: string, phone: string, password: string, code: string) {
            if (username.trim() === "") {
                ElMessage.error("用户名不能为空");
                return false;
            }
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (phone.trim() === "") {
                ElMessage.error("手机号不能为空");
                return false;
            }
            if (phoneRegex.test(phone) === false) {
                ElMessage.error("请输入正确的手机号码");
                return false;
            }
            if (password.trim() === "") {
                ElMessage.error("密码不能为空");
                return false;
            }
            if (code.trim() === "") {
                ElMessage.error("验证码不能为空");
                return false;
            }
            try {
                const response = await postRegister(username, phone, password, code);
                ElMessage.success("注册成功，请登录");
                this.register = false;
                return true;
            } catch (error) {
                console.error("Error posting register:", error);
                ElMessage.error("注册失败，请稍后重试");
                return false;
            }
        },
        async getCode(phone: string) {
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (phone.trim() === "") {
                ElMessage.error("手机号不能为空");
                return false;
            }
            if (phoneRegex.test(phone) === false) {
                ElMessage.error("请输入正确的手机号码");
                return false;
            }
            if (!this.timer && this.second === this.totalSecond) {
                this.timer = setInterval(() => {
                    this.second--
                    if (this.second <= 0) {
                        this.second = this.totalSecond
                        clearInterval(this.timer)
                        this.timer = 0
                    }
                }, 1000)
            }
            try {
                const response = await getCode(phone);
                ElMessage.success(`验证码已发送，请注意查收${response.data}`);
                return true;
            } catch (error) {
                console.error("Error fetching code:", error);
                ElMessage.error("发送验证码失败，请稍后重试");
                return false;
            }
        },
        async verifyCode(phone: string, code: string) {
            const userStore = useUserStore();
            try {
                const loginitem = await postCode(phone, code)
                const modalStore = useModalStore()
                if (loginitem.code === 200) {
                    userStore.userid = loginitem.data._id
                    userStore.token = loginitem.data.token
                    userStore.username = loginitem.data.username
                    userStore.islodin = true
                    this.LoginIn = "true";
                    localStorage.setItem("usertoken", loginitem.data.token)
                    localStorage.setItem("userid", loginitem.data._id)
                    ElMessage.success("登录成功");
                    modalStore.modeloption = '新的值'
                    console.log(loginitem.data)
                    return true;
                } else {
                    ElMessage.error(`验证码错误，请重新输入${loginitem.message}`);
                    return false;
                }
            } catch (error) {
                console.error("Error verifying code:", error);
                ElMessage.error("登录失败，请稍后重试");
                return false;
            }
        },
        async verifyPassword(phone: string, password: string) {
            if (phone.trim() === "") {
                ElMessage.error("手机号不能为空");
                return false;
            }
            if (password.trim() === "") {
                ElMessage.error("密码不能为空");
                return false;
            }
            try {
                const response = await postpassword(phone, password);
                if (response.code === 200) {
                    const userStore = useUserStore();
                    this.LoginIn = "true";
                    userStore.token = response.data.token
                    userStore.userid = response.data.user._id
                    localStorage.setItem("usertoken", response.data.token)
                    localStorage.setItem("userid", response.data.user._id)
                    ElMessage.success("登录成功");
                    return true;
                } else {
                    this.LoginIn = "false";
                    ElMessage.error("密码错误，请重新输入");
                    return false;
                }
            } catch (error) {
                console.error("Error posting password:", error);
                ElMessage.error("登录失败，请稍后重试");
                return false;
            }
        },
        async verifylodin(token: string){
            try{
                const data = validateToken(token)
                return data
            }catch (error) {
                console.error("Error verifying code:", error);
                return false;
            }
        }
    }
})
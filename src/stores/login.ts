import { defineStore } from "pinia"
import getCode from "../api/getCode"
import postpassword from "@/api/postpassword";
import { useUserStore } from "./user";



export const useLoginstore = defineStore('login', {
    state: () => ({
        rightcode: " ",
        rightpassword: " ",
        LoginIn: ' ',
        userid: " ",
        usertoken: " ",
        totalSecond: 5,
        second: 5,
        timer: 0
    }),
    actions: {
        async getCode(phone: string) {
            // 验证手机号格式
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (phone.trim() === "") {
                alert("手机号不能为空");
                return false;
            }
            if (phoneRegex.test(phone) === false) {
                alert("请输入正确的手机号码");
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
                const response = await getCode("getcodeurl", phone);
                this.userid = response.data.userid
            } catch (error) {
                console.error("Error fetching code:", error)
            }
        },
        async verifyCode(code: string) {
            const userStore = useUserStore();
            const loginitem = await postcode(this.userid, code)
            if (loginitem.login === true) {
                userStore.userid = loginitem.userid
                userStore.token = loginitem.token
                this.LoginIn = "true";
                return true;
            } else {
                alert("验证码错误，请重新输入");
                return false;
            }
        },
        async verifyPassword(phone: string, password: string) {
            if (phone.trim() === "") {
                alert("手机号不能为空");
                return false;
            }
            if (password.trim() === "") {
                alert("密码不能为空");
                return false;
            }
            try {

                const response = await postpassword("passwordurl", phone, password);
                if (response.login === true) {
                    const userStore = useUserStore();
                    this.LoginIn = "true";
                    userStore.token = response.token
                    userStore.userid = response.userid
                    return true;
                } else {
                    this.LoginIn = "false";
                    alert("密码错误，请重新输入");
                    return false;
                }
            } catch (error) {
                console.error("Error posting password:", error);
                return false;
            }
        }
    }
})

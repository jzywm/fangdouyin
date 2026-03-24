import { defineStore } from "pinia"
import getCode from "../api/getCode"
import getpassword from "@/api/getpassword";
import useUserStore from "./user";
import LoginIn from "@/components/loginIn.vue";

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
        async getCode(url: string, phone: string) {
            // 验证手机号格式
            const phoneRegex = /^1[3-9]\d{9}$/;
            if (!phone.trim()) {
                alert("手机号不能为空");
                return false;
            }
            if (!phoneRegex.test(phone)) {
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
                const response = await getCode(url, phone);
                this.rightcode = response.data;
            } catch (error) {
                console.error("Error fetching code:", error)
            }
        },
        verifyCode(code: string) {
            const loginitem = postcode(this.userid)
            if (loginitem.login === true) {
                useuserstore.userid = loginitem.userid
                useuserstore.token = loginitem.token
                this.LoginIn = "true";
                return true
            } else {
                alert("验证码错误，请重新输入");
                return false;
            }
        },
        async verifyPassword(phone: number, password: string) {
            if (password.trim() === "") {
                alert("密码不能为空");
                return false;
            }
            if (!verifyCodevedio(this.userid)) {
                return false;
            }
            try {
                const response = await getpassword('your_api_url_here', phone);
                this.rightpassword = response.data;
                if (this.rightpassword === password) {
                    this.LoginIn = "true";
                    return true;
                } else {
                    this.LoginIn = "false";
                    alert("密码错误，请重新输入");
                    return false;
                }
            } catch (error) {
                console.error("Error fetching password:", error);
                return false;
            }
        }
    }
})

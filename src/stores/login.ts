import { defineStore } from "pinia"
import getCode from "../api/getCode"
import getpassword from "@/api/getpassword";
import { Phone } from "@element-plus/icons-vue";

export const useLoginstore = defineStore('login', {
    state: () => ({
        rightcode: " ",
        LoginIn: "false",
        rightpassword: " ",
    }),
    actions: {
        async getCode(url: string, phone: string) {
            try {
                const response = await getCode(url, phone);
                this.rightcode = response.data;
            } catch (error) {
                console.error("Error fetching code:", error);
            }
        },
        verifyCode ( code: string) {
            if (code === this.rightcode) {
                this.LoginIn = "true";
                return true;
            } else {
                this.LoginIn = "false";
                alert("验证码错误，请重新输入");
                return false;

            }
        },
        async verifyPassword(phone: number, password: string) {
            if (password.trim() === "") {
                alert("密码不能为空");
                return false;
            }
            try {
                const response = await getpassword('your_api_url_here', phone );
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
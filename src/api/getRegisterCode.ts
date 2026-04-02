import axios from "axios";

export default async function getRegisterCode(phone: string, username: string) {
    try {
        const response = await axios('/user/register', {
            method: 'GET',
            params: {
                username,
                tel: phone
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error sending code:", error);
        return { code: 500, message: "发送验证码失败，请稍后重试" };
    }
}

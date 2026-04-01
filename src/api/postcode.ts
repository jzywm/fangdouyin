import axios from "axios";

export default async function postCode(phone: string, code: string) {
    const data = await axios('/api/v1/user/send_code', {
        method: 'post',
        data: {
            tel: phone,
            code: code
        }
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error("Error sending code:", error);
        return { code: 500, message: "发送验证码失败，请稍后重试" };
    });
    return data;
}
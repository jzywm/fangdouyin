import request from '@/utils/Interceptor'

export default async function postCode(phone: string, code: string) {
    try {
        const response = await request('/user/login/code/verify', {
            method: 'post',
            data: {
                tel: phone,
                code: code
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error verifying code:", error);
        return { code: 500, message: "验证码验证失败，请稍后重试" };
    }
}

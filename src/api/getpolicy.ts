import request from '@/utils/Interceptor'
interface data {
    host: string;
    policy: string;
    x_oss_signature_version: string;
    x_oss_credential: string;
    x_oss_date: string;
    signature: string;
    x_oss_signature: string;
    dir: string;
    security_token: string
    url: string
}
export const getPolicy = async () => {
    try {
        const res = await request('/user/getpolicy', {
            method: 'get',
        });
        const data = res.data as data
        return res;
    } catch (error) {
        console.error("Error sending code:", error);
        return { code: 500, message: "获取凭证失败，请稍后重试" };
    }
}
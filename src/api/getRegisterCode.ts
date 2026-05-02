import request from '@/utils/Interceptor'
import { ElMessage } from "element-plus";

export default async function getRegisterCode(phone: string, username: string) {
    try {
        const response = await request('/user/register', {
            method: 'GET',
            params: {
                username,
                tel: phone
            }
        });

        // 假设请求成功（200），直接返回数据
        return response.data;

    } catch (error: any ) {
        // 1. 从 error 对象中提取响应数据
        // 通常 axios 或封装后的 request 错误对象结构为 error.response.data
        const errorData = error.response?.data;

        // 2. 判断是否存在 errors 数组
        if (errorData && Array.isArray(errorData.errors) && errorData.errors.length > 0) {
            // 3. 解构出第一条错误信息
            const errorMsg = errorData.errors[0].msg;
            console.log("验证失败:", errorMsg);
            // 你可以选择抛出错误，或者返回特定格式
            ElMessage.error(`发送验证码失败，请稍后重试${errorMsg}`);
            return { code: 400, message: errorMsg };
        }

        // 处理其他未知错误
        console.error("Error sending code:", error);
        return { code: 500, message: "发送验证码失败，请稍后重试" };
    }
}
import request from '@/utils/Interceptor'

export default async function getCode(phone: string) {
    try {
        const response = await request('/user/login/code', {
            method: 'post',
            data: {
                'tel': `${phone}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching code:", error);
        throw error;
    }
}

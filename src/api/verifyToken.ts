import request from '@/utils/Interceptor'

export default async function validateToken(token: string) {
    try{
        const data = await request.post('/user/validatetoken', { token })   
        return data 
    }catch (error) {
    console.error("Error registering:", error);
    return { code: 404, message: "获取失败" };
  }
}
import request from '@/utils/Interceptor'

export async function postAiXin(videoId: string){
  try {
    const response = await request(`/video/postlikevideo`, {
      method: 'post',
      data: {
        videoId: videoId
      }
    }
    )
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error sending code:", error);
    return { code: 500, message: "点赞失败，请稍后重试" };
  }
}
import request from '@/utils/Interceptor'

export async function postCollection(videoId: string){
  try {
    const response = await request(`/video/postcollectvideo`, {
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
    return { code: 500, message: "收藏失败，请稍后重试" };
  }
}
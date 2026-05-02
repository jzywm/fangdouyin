import request from '@/utils/Interceptor'

export async function postDanMu(videoId: string, content: string){
  try {
    const response = await request(`/video/postdanmu`, {
      method: 'post',
      data: {
        videoId: videoId,
        content: content
      }
    }
    )
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error sending code:", error);
    return { code: 500, message: "发送弹幕失败，请稍后重试" };
  }
}
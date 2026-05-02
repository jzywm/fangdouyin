import request from '@/utils/Interceptor'

export async function getDetailVideo(videoId: string) {
  try {
    const response = await request(`/video/getdetailvideo`, {
      method: 'get',
      params: {
        videoID: videoId
      }
    }
    )
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error sending code:", error);
    return { code: 500, message: "获取视频详情失败，请稍后重试" };
  }
}
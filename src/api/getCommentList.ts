import request from '@/utils/Interceptor'

export async function getCommentList(videoId: string){
  try {
    const response = await request(`/video/getcommentlist`, {
      method: 'get',
      params: {
        id: videoId
      }
    }
    )
    const data = response.data
    return data;
  } catch (error) {
    console.error("Error sending code:", error);
    return { code: 500, message: "获取视频弹幕详情失败，请稍后重试" };
  }
}

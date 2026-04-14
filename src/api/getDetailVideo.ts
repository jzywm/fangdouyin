import request from '@/utils/Interceptor'

export async function getDetailVideo(videoId: number) {
  const response = await request.get(`/video/detail?videoId=${videoId}`);
  return response.data
}

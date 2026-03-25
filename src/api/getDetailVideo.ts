import axios from "axios";

export async function getDetailVideo(videoId: string) {
  const response = await axios.get(`/video/detail?videoId=${videoId}`);
  return response.data;
}

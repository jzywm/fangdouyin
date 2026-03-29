import axios from "axios";

export const postCollect = (videoId: number, token: string) => {
  return axios.post(`/collect/${videoId}`, {
    videoId,
    token,
  })
}
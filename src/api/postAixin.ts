import axios from "axios";

export const postAixin = (videoId: number, token: string) => {
  return axios.post(`/aixin/${videoId}`, {
    videoId,
    token,
  })
}
import axios from 'axios'

export const postComment = (content: string, videoId: number, token: string) => {
  return axios.post('/comment', {
    content,
    videoId,
    token,
  })
}


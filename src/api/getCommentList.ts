import axios from 'axios'

export default function getCommentList(vedioid: number){
  return axios.get(`/comment/${vedioid}`)
}

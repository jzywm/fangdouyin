import request from '@/utils/Interceptor'

export default function getCommentList(vedioid: number){
  return request.get(`/comment/${vedioid}`)
}

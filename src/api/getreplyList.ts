import axios from "axios";

export default async function getreplyList(id: number) {
  const res = await axios.get(`/comment/reply/${id}`)
  return res.data
}

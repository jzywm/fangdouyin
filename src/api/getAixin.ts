import axios from "axios";

export const postAixin = (id: number) => {
  return axios.post(`/aixin/${id}`, {
    id
  })
}
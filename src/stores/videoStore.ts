import { defineStore } from 'pinia'
import { getVideoList } from '@/api/getVideolist'

export const useVideoStore = defineStore('Video', {
  
  state: () => ({
  videolist: ;
  }),
  
  actions: () =>({
    async getvideostore(tab:number, pages:number = 1, pageSize:number = 12) {
      const videolist = await getVideoList(tab, pages, pageSize)
    },
  })
})
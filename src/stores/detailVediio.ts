import { defineStore } from 'pinia'
import { getDetailVideo } from '@/api/getDetailVideo'

export const useDetailVideoStore = defineStore('detailVideo', {
  state: () => ({
    pause: true,
    time: "0:0",
    isLogin: false,
    continueplay: true,
    clear: true,
    soundnum: 10,
    detailVideo: {
      id: 1,
      title: '视频标题一',
      cover: '封面',
      description: '视频的描述一',
      likenum: 1234,
      commentnum: 1234,
      collectnum: 1231,
      sharenum: 2131,
      videourl: '',
      time: '2:00',
      posttime: '2月1日',
      userid: 1232,
      authername: '假装有网名',
      username: '假装有网名',
      useravatarurl: '123',
    },
  }),
  actions: {
    async getdetailvideo(id: number) {
      const res = await getDetailVideo(id)
      this.detailVideo = res
    }
  }
})

import { defineStore } from 'pinia'
import { getDetailVideo } from '@/api/getDetailVideo'
import getCommentList from '@/api/getCommentList'
import { postAixin } from '@/api/postAixin'
import { postCollect } from '@/api/postCollect'
import { useUserStore } from './user'
import { postComment } from '@/api/postComment'
import getreplyList from '@/api/getreplyList'

export const useDetailVideoStore = defineStore('detailVideo', {
  state: () => ({
    pause: true,
    time: "0:0",
    commentallnumber: 1234,
    commentreplyshowid: 0,
    activeid: 3,
    isShowCommentList: false,
    isLogin: false,
    continueplay: true,
    clear: true,
    soundnum: 10,
    isLike: false,
    isCollect: false,
    commentcontent: '',
    commentlist: [
      {
        id: 1,
        content: '评论是一',
        userid: 1232,
        username: '假装有网名',
        useravatarurl: '123',
        likenum: 1234,
        posttime: '2月1日',
        ip: '广东',
        isLike: false,
        nolike: false,
        replyNum: 1234,
        isAuthor:false,
        images:[],
        replylist: [
          {
            isAuthor: true,
            id: 2,
            content: '评论二',
            userid: 1232,
            username: '假装有网名',
            useravatarurl: '123',
            likenum: 1234,
            images:[

            ],
            posttime: '2月1日',
            ip: '广东',
            isLike: false,
            nolike: false,
            replyNum: 1234,
          }
        ],
      }
    ],

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
    handleTabclick(id: number) {
      this.activeid = id
    },
    async getdetailvideo(id: number) {
      const res = await getDetailVideo(id)
      this.detailVideo = res
    },
    async getcommentList(id: number) {
      const res = await getCommentList(id)
      this.commentlist = res.data
    },
    async likeVideo(videoId: number, token: string) {
      const user = useUserStore()
      if (user.token) {
        const res = await postAixin(videoId, token)
        this.detailVideo.likenum = res.data.data.likenum
        this.isLike = res.data.data.isLike
      } else {
        // 如果用户没有登录，提示用户登录
        alert('请先登录')
        return
      }
    },
    async collectVideo(videoId: number, token: string) {
      const user = useUserStore()
      if (user.token) {
        const res = await postCollect(videoId, token)
        this.detailVideo.collectnum = res.data.data.collectnum
        this.isCollect = res.data.data.isCollect

      } else {
        // 如果用户没有登录，提示用户登录
        alert('请先登录')
        return
      }
    },
    async getreplyList(id: number) {
      const res = await getreplyList(id)
      this.commentlist = res.data
    },
    async postComment(content: string) {
      console.log(123)
      const user = useUserStore()
      const res = await postComment(content, this.detailVideo.id, user.token)
      this.commentlist.push(res.data.data)
      this.commentcontent = ''
      this.detailVideo.commentnum = res.data.data.commentnum
      this.commentallnumber = res.data.data.commentallnumber
    },
  },
})

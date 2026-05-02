import { defineStore } from 'pinia'
import { getDetailVideo } from '@/api/getDetailVideo'
import { getCommentList } from '@/api/getCommentList'
import { postAiXin } from '@/api/postAixin'
import { postDanMu } from '@/api/postComment'
import { postCollection } from '@/api/postCollect'
import { useUserStore } from './user'
import  formatDuration  from '@/hooks/tolonger'
import { watch } from 'vue'

interface DetailVideo {
  _id: string,
  videoID: {
    __v: number,
    _id: string,
    coverurl: string,
    createAT: string,
    description: string,
    hostID: string,
    hostName: string,
    avatar:string,
    longer: number,
    title: string,
    updateAT: string,
    videourl: string,
  },
  likeCount: number,
  commentCount: number,
  collectionCount: number,
  shareCount: number,
  playCount: number,
  danmuCount: number,
  tab: number,
  createAT: string,
  updateAT: string,
  __v: number,
}
interface ReplyItem {
  id: number;
  content: string;
  userid: number;
  username: string;
  useravatarurl: string; // 注意：回复里是 useravatarurl
  likenum: number;
  images: string[]; // 假设图片是字符串数组
  posttime: string;
  ip: string;
  isLike: boolean;
  nolike: boolean;
  replyNum: number;
  isAuthor: boolean;
}
interface CommentItem {
  id: number;
  avatar:string
  videourl: string;
  coverurl: string;
  content: string;
  userid: number;
  username: string;
  likenum: number;
  posttime: string;
  ip: string;
  isLike: boolean;
  nolike: boolean;
  replyNum: number;
  isAuthor: boolean;
  images: string[];
  replylist: ReplyItem[]; // 核心：嵌套了回复数组
}

interface VideoControl {
  playVideo(): void;
  pauseVideo(): number;
  setVolume(volume: number): void;
  setPlaybackRate(rate: number): void;
  setCurrentTime(time: number): void;
  getCurrentTime(): number;
  getDuration(): number;
  videoRef?: { value: HTMLVideoElement | null };
}

declare global {
  interface Window {
    videoControl?: VideoControl;
  }
}


export const useDetailVideoStore = defineStore('detailVideo', {
  state: () => ({
    lasttime: 0,
    isLoading: false,
    danmuplay: true,
    danmuplayheight: 50,
    pause: false,
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
    isdisLike: false,
    isCollect: false,
    isdisCollect:false,
    commentcontent: '',
    longer: '',
    commentlist: [
      {
        id: 1,
        videourl: '',
        coverurl: '',
        content: '评论是一',
        userid: 1232,
        username: '假装有网名',
        // hostavatarurl: '123',
        likenum: 1234,
        posttime: '2月1日',
        ip: '广东',
        isLike: false,
        nolike: false,
        replyNum: 1234,
        isAuthor: false,
        images: [],
        replylist: [
          {
            isAuthor: true,
            id: 2,
            content: '评论二',
            userid: 1232,
            username: '假装有网名',
            useravatarurl: '123',
            likenum: 1234,
            images: [

            ],
            posttime: '2月1日',
            ip: '广东',
            isLike: false,
            nolike: false,
            replyNum: 1234,
          }
        ],
      },
      {
        id: 1,
        videourl: '',
        coverurl: '',
        content: '评论是一',
        userid: 1232,
        username: '假装有网名',
        hostavatarurl: '123',
        likenum: 1234,
        posttime: '2月1日',
        ip: '广东',
        isLike: false,
        nolike: false,
        replyNum: 1234,
        isAuthor: false,
        images: [],
        replylist: [
          {
            isAuthor: true,
            id: 2,
            content: '评论二',
            userid: 1232,
            username: '假装有网名',
            useravatarurl: '123',
            likenum: 1234,
            images: [

            ],
            posttime: '2月1日',
            ip: '广东',
            isLike: false,
            nolike: false,
            replyNum: 1234,
          }
        ],
      }
    ] as CommentItem[] 
    ,
    detailVideo: {
      // _id: '69e60a634b31a916cd0bd8b7',
      // videoID: {
      //   __v: 0,
      //   _id: '69e60a634b31a916cd0bd8b6',
      //   coverurl: 'https://jiaruihangdouyin.oss-cn-beijing.aliyuncs.com//douyin/works/cover/2026/04/20/9dfa89b5-3ff8-4700-9068-7169309b84c9',
      //   createAT: '2026-04-20T11:13:39.112Z',
      //   description: '1111111111',
      //   hostID: '69ce63675e633c8cf40a92fd',
      //   hostName: 'jiaqwe1231',
      //   longer: 295.310998,
      //   title: '111111111',
      //   updateAT: '2026-04-20T11:13:39.112Z',
      //   videourl: 'https://jiaruihangdouyin.oss-cn-beijing.aliyuncs.com//douyin/works/video/2026/04/20/31673c1b-bf2b-436e-bee9-5a3525ed2a81',
      // },
      // likeCount: 0,
      // commentCount: 0,
      // collectionCount: 0,
      // shareCount: 0,
      // playCount: 0,
      // danmuCount: 0,
      // tab: 2,
      // createAT: '2026-04-20T11:13:39.116Z',
      // updateAT: '2026-04-20T11:13:39.116Z',
      // __v: 0,
    } as DetailVideo
  }),
  actions: {
    handleTabclick( id: number ) {
      this.activeid = id
    },
    async getdetailvideo( videoId: string ) {
      try{
        this.isLoading = true
        const res = await getDetailVideo( videoId )
        console.log(666666,res?.data[0])
        this.detailVideo = res?.data[0]
        this.isLike = res?.type.islike
        this.isdisLike = res?.type.isdislike
        this.isCollect = res?.type.iscollect
        this.isdisCollect = res?.type.isdiscollect
        console.log(this.detailVideo)
        if (res) {
          const time = formatDuration(this.detailVideo.videoID?.longer as number) as string
          this.longer = time
          }
        }catch (error) {
      // 3. 处理请求失败的情况
      console.error('获取视频详情失败:', error)
    } finally {
      this.isLoading = false
    }
    },
    async getcommentList( videoId: string ) {
      const res = await getCommentList(videoId)
      this.commentlist = res.data as CommentItem[]
    },
    async likeVideo( videoId: string ) {
      const user = useUserStore()
      if (user.islodin) {
        const res = await postAiXin(videoId)
        console.log(res)
        this.detailVideo.likeCount = res?.likecount
        this.isLike = res?.type.islike
        this.isdisLike = res?.type.isdislike
        console.log(res?.likecount)
      } else {
        // 如果用户没有登录，提示用户登录
        alert('请先登录')
        return
      }
    },
    async collectVideo( videoId: string ) {
      const user = useUserStore()
      if (user.islodin) {
        const res = await postCollection(videoId)
        console.log(11111111111111111111111,res)
        this.detailVideo.collectionCount = res?.collectcount
        this.isCollect = res?.type.iscollect
        this.isdisCollect = res?.type.isdiscollect
      } else {
        // 如果用户没有登录，提示用户登录
        alert('请先登录')
        return
      }
    },
    async postComment(content: string) {
      console.log(123)
      const user = useUserStore()
      const res = await postDanMu ( this.detailVideo._id , content)
      this.commentlist = res.data.commentlist
      this.commentcontent = ''
      this.detailVideo.commentCount = res.data.commentCount
      this.commentallnumber = res.data.commentallnumber
    },
    
    // ========== 视频控制方法 ==========
    pauseVideo() {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        const currentTime:string = formatDuration(videoControl.currentTime as number) as string
        this.time = currentTime
        videoControl.pause()
        this.pause = true
        console.log(this.pause)
        return videoControl.currentTime
      }
    },
    
    playVideo(time:number) {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        this.time = formatDuration(time as number) as string
        videoControl.play()
        this.pause = false
      }
    },

    // togglePlayPause() {
    //   if (this.pause) {
    //     const time = this.playVideo()
    //   } else {
    //     this.pauseVideo()
    //   }
    // },
    setVolume(volume: number) {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        // volume 参数范围是 0-100，需要转换为 0-1
        videoControl.volume = Math.max(0, Math.min(1, volume / 100))
        this.soundnum = volume
      }
    },
    
    setPlaybackRate(rate: number) {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        videoControl.playbackRate = rate
      }
    },
    
    setCurrentTime(time: number) {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        console.log(11111111,time)
        videoControl.currentTime = time
      }
    },
    
    getCurrentTime(): number {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        return videoControl.currentTime
      }
      return 0
    },
    
    getDuration(): number {
      const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
      if (videoControl) {
        return videoControl.duration
      }
      return 0
    },
    
    toggleFullscreen() {
      const videoControl = window.videoControl
      if (videoControl && videoControl.videoRef) {
        const video = videoControl.videoRef.value
        if (video) {
          if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
              console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
          } else {
            document.exitFullscreen()
          }
        }
      }
    },
    
    updateCurrentTime(time: string) {
      this.time = time
      // 保存播放进度
      if (this.detailVideo._id) {
        localStorage.setItem(`pausetime,${this.detailVideo._id}`, time)
      }
    },
    
    toggleDanmu() {
      this.danmuplay = !this.danmuplay
    },
    
    toggleContinuePlay() {
      this.continueplay = !this.continueplay
    },
    
    toggleClear() {
      this.clear = !this.clear
    },
  },
  getters: {
    
  }
})

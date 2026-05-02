import { defineStore } from "pinia"
import { getVideoList } from "../api/getVideolist"
import  formatDuration  from '@/hooks/tolonger'
import router from "@/router";

interface data {

}

export const useMainVideoStore = defineStore('mainVideo', {
    state: () => ({
        activecardId: 1,
        tablist: [
            { id: 1, title: '全部' },
            { id: 2, title: '公开课' },
            { id: 3, title: '游戏' },
            { id: 4, title: '二次元' },
            { id: 5, title: '音乐' },
            { id: 6, title: '影视' },
            { id: 7, title: '美食' },
            { id: 8, title: '知识' },
            { id: 9, title: '小剧场' },
            { id: 10, title: '生活vlog' },
            { id: 11, title: '体育' },
            { id: 12, title: '旅行' },
            { id: 13, title: '亲子' },
            { id: 14, title: '动物' },
            { id: 15, title: '三农' },
            { id: 16, title: '汽车' },
            { id: 17, title: '美妆' },
        ],
        activedVideo: [

        ] 
    }),
    actions: {
        async getactivedVideo(activecarId: number, pages: number, pageSize:number) {
            // 即使是同一个标签，也获取数据（确保初始加载时能获取数据）
            this.activecardId = activecarId;
            try {
                // 调用 getVideo 函数，传入 tabcar 参数
                const response = await getVideoList(activecarId, pages, pageSize);
                console.log(response.data)
                response.data.map(item =>{
                    console.log(item.videoID.longer)
                    item.videoID.longer = formatDuration(item.videoID.longer)
                })
                this.activedVideo = response.data
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        },
        enterVideo(videoId: number) {
            router.push(`/detailvideo/${videoId}`);
        }
    }
})
import { defineStore } from "pinia"
import getVideo from "../api/getVideo"
import router from "@/router";

interface IVideoData {
    id: number,
    hostName: string,
    hostAvatar: string,
    hostId: number,
    hosttoken: string,
    title: string,
    videoUrl: string,
    coverUrl: string,
    loveCount: number,
    fensiCount: number,
    timer: string,
    longer: string,
    alt: string,
    commentCount: number,
}

export const useMainVideoStore = defineStore('mainVideo', {
    state: () => ({
        activeId: 1,
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
            {
                id: 1,
                hostName: '主播1',
                hostAvatar: 'https://example.com/avatar1.jpg',
                hostId: 1,
                hosttoken: 'token1',
                title: '视频标题1',
                videoUrl: 'https://example.com/video1.mp4',
                coverUrl: 'https://example.com/cover1.jpg',
                loveCount: 100,
                fensiCount: 50,
                timer: '2024-06-01 12:00:00',
                longer: '10:00',
                alt: '视频封面1',
                commentCount: 10,   
            }
        ]
    }),
    actions: {
        async getactivedVideo(activeId: number) {
            if (this.activeId === activeId) {
                return;
            }
            activeId = activeId || 1;
            const response = await getVideo(`https://example.com/api/videos?categoryId=${activeId}`);
            this.activedVideo = response.data as IVideoData[];
        },
        enterVideo(videoId: number) {
            router.push(`/video/${videoId}`);
        }
    }
})
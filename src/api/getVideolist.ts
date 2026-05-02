import request from '@/utils/Interceptor'

interface VideoData {
    id: number,
    hostName: string,
    hostAvatar: string,
    hostId: number,
    hosttoken: string,
    title: string,
    content: string,
    videoUrl: string,
    coverUrl: string,
    loveCount: number,
    fensiCount: number,
    timer: string,
    longer: string,
    alt: string,
    commentCount: number,
}

// 根据 tabcar 获取对应的数据
// 获取视频数据函数

// 保留原有的 axios 请求方式，用于真实 API 调用
export const getVideoList = async (tab: number, pages: number, pageSize: number) => {
    try {
        const res = await request(`/video/getvideolist`, {
            method: 'get',
            params: {
                tab: tab,
                pages: pages,
                pageSize: pageSize
            }
        });
        const data = res.data
        return data;
    } catch (error) {
        console.error("Error sending code:", error);
        return { code: 500, message: "获取视频列表，请稍后重试" };
    }
}

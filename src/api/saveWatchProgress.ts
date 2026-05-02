import request from '@/utils/Interceptor'

// 保存观看进度到后端
export const saveWatchProgress = (videoID: string, currentTime: number, duration: number, playbackRate: number = 1) => {
    const res = request({
        url: '/video/savewatchprogress',
        method: 'POST',
        data: {
            videoID,
            currentTime,
            duration,
            playbackRate
        }
    }).then((response) => {
    if (response.status === 200) {
      console.log(response);
      return response.data;  // 解析回调信息
    } else {
      console.log("上传失败", response);
    }
  })
  return res;
}
// 获取观看进度
export const getWatchProgress = (videoID: string) => {
    return request({
        url: '/video/getwatchprogress',
        method: 'GET',
        params: { videoID }
    })
}

// 获取最近观看的视频列表
export const getRecentWatchedVideos = (limit: number = 10, skip: number = 0) => {
    return request({
        url: '/video/getrecentwatched',
        method: 'GET',
        params: { limit, skip }
    })
}

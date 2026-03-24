<template>
    <div class="mainVideo">
        <div class="tabcar">
            <div v-for="tab in mainVideoStore.tablist" :key="tab.id" class="tabCaritem"
                :class="{ active: tab.id === mainVideoStore.activecardId }" @click="getactivedVideo(tab.id)">
                {{ tab.title }}
            </div>
            <div class="transform">
                <el-icon>
                    <ArrowLeft />
                </el-icon>
                <el-icon>
                    <ArrowRight />
                </el-icon>
            </div>
        </div>
        <div class="videolist">
            <div v-for="value in activedVideo" :key="value.id" class="videoItem" @click="enterVideo(value.id)">
                <div class="video-cover">
                    <img :src="value.coverUrl" :alt="value.alt" class="cover-img">
                    <div class="play-button">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path d="M8 5v14l11-7z" fill="white"></path>
                        </svg>
                    </div>
                    <div class="video-duration">{{ value.longer }}</div>
                </div>
                <div class="video-info">
                    <div class="video-title">{{ value.title }}</div>
                    <div class="video-author-time">
                        <span class="video-author">@{{ value.hostName }}</span>
                        <span class="video-time">{{ formatTime(value.timer) }}</span>
                    </div>
                    <div class="video-stats">
                        <span class="likes">
                            <svg viewBox="0 0 24 24" width="14" height="14">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="currentColor"></path>
                            </svg>
                            {{ formatCount(value.loveCount) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainVideoStore } from '@/stores/mainvedio'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const mainVideoStore = useMainVideoStore()
const { activedVideo } = storeToRefs(mainVideoStore)
const { getactivedVideo, enterVideo } = mainVideoStore

// 格式化时间
const formatTime = (time: string): string => {
    const now = new Date()
    const videoTime = new Date(time)
    const diff = now.getTime() - videoTime.getTime()
    
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) {
        return `${minutes}分钟前`
    } else if (hours < 24) {
        return `${hours}小时前`
    } else if (days < 30) {
        return `${days}天前`
    } else {
        return videoTime.toLocaleDateString('zh-CN')
    }
}

// 格式化数字
const formatCount = (count: number): string => {
    if (count >= 10000) {
        return (count / 10000).toFixed(1) + '万'
    }
    return count.toString()
}
</script>
<style scoped>
.mainVideo {
    height: calc(100vh - 64px);
    overflow-y: auto;
    box-sizing: border-box;
    padding: 16px 24px;
    background: #161823;
}

.mainVideo::-webkit-scrollbar {
    width: 8px;
}

.mainVideo::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.mainVideo::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.tabcar {
    display: flex;
    gap: 16px;
    color: #929398;
    align-items: center;
    width: 100%;
    max-width: calc(100vw - 240px);
    overflow: auto;
    padding: 8px 0;
    white-space: nowrap;
    margin-bottom: 16px;
}

.tabcar::-webkit-scrollbar {
    height: 4px;
}

.tabcar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

.tabCaritem {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    cursor: pointer;
    color: #929398;
    font-size: 14px;
    position: relative;
    transition: all 0.2s ease;
    border-radius: 16px;
    white-space: nowrap;
}

.tabCaritem:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
}

.tabCaritem.active {
    color: #fff;
    font-weight: 600;
    background: rgba(255, 0, 80, 0.1);
}

.tabCaritem.active::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 2px;
    background: #ff0050;
    border-radius: 1px;
}

.transform {
    display: flex;
    gap: 8px;
    margin-left: 12px;
    color: #929398;
    cursor: pointer;
    flex-shrink: 0;
    padding: 4px 8px;
    border-radius: 12px;
    transition: background 0.2s ease;
}

.transform:hover {
    background: rgba(255, 255, 255, 0.05);
}

.videolist {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    margin-top: 12px;
    max-width: calc(100vw - 240px);
}

.videoItem {
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
    position: relative;
}

.videoItem:hover {
    transform: translateY(-4px);
}

.video-cover {
    position: relative;
    width: 100%;
    padding-top: 133.33%;
    overflow: hidden;
    border-radius: 8px;
    background: #000;
    margin-bottom: 12px;
}

.cover-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.videoItem:hover .cover-img {
    transform: scale(1.05);
}

.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s ease;
    backdrop-filter: blur(2px);
    z-index: 10;
}

.videoItem:hover .play-button {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
}

.video-duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    backdrop-filter: blur(2px);
    z-index: 5;
}

.video-info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 4px;
}

.video-title {
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: color 0.2s ease;
}

.videoItem:hover .video-title {
    color: #ff0050;
}

.video-author-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.video-author {
    color: #929398;
    font-size: 12px;
    transition: color 0.2s ease;
}

.videoItem:hover .video-author {
    color: #fff;
}

.video-time {
    color: #929398;
    font-size: 12px;
}

.video-stats {
    display: flex;
    align-items: center;
    gap: 4px;
}

.likes {
    color: #929398;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
}

@media (max-width: 1440px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 14px;
        max-width: calc(100vw - 200px);
    }
    
    .tabcar {
        max-width: calc(100vw - 200px);
    }
}

@media (max-width: 1200px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 12px;
        max-width: calc(100vw - 180px);
    }
    
    .tabcar {
        max-width: calc(100vw - 180px);
        gap: 12px;
    }
    
    .mainVideo {
        padding: 14px 20px;
    }
}

@media (max-width: 992px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 12px;
        max-width: calc(100vw - 160px);
    }
    
    .tabcar {
        max-width: calc(100vw - 160px);
        gap: 10px;
    }
    
    .play-button {
        width: 40px;
        height: 40px;
    }
    
    .play-button svg {
        width: 20px;
        height: 20px;
    }
}

@media (max-width: 768px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
        max-width: calc(100vw - 140px);
    }
    
    .tabcar {
        max-width: calc(100vw - 140px);
        gap: 8px;
    }
    
    .mainVideo {
        padding: 12px 16px;
    }
    
    .tabCaritem {
        font-size: 13px;
        padding: 4px 12px;
    }
    
    .video-title {
        font-size: 13px;
    }
    
    .video-author, .video-time, .likes {
        font-size: 11px;
    }
}

@media (max-width: 576px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 8px;
        max-width: calc(100vw - 100px);
    }
    
    .tabcar {
        max-width: calc(100vw - 100px);
        gap: 6px;
        padding: 6px 0;
    }
    
    .mainVideo {
        padding: 10px 12px;
    }
    
    .tabCaritem {
        font-size: 12px;
        padding: 3px 10px;
    }
    
    .play-button {
        width: 36px;
        height: 36px;
    }
    
    .play-button svg {
        width: 18px;
        height: 18px;
    }
    
    .video-duration {
        font-size: 11px;
        padding: 1px 4px;
    }
    
    .video-title {
        font-size: 12px;
    }
    
    .video-author, .video-time, .likes {
        font-size: 10px;
    }
}

@media (max-width: 480px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 8px;
        max-width: calc(100vw - 80px);
    }
    
    .tabcar {
        max-width: calc(100vw - 80px);
        gap: 4px;
    }
    
    .mainVideo {
        padding: 8px 10px;
    }
    
    .tabCaritem {
        font-size: 11px;
        padding: 2px 8px;
    }
    
    .play-button {
        width: 32px;
        height: 32px;
    }
    
    .play-button svg {
        width: 16px;
        height: 16px;
    }
    
    .video-duration {
        font-size: 10px;
    }
}

@media (max-width: 360px) {
    .videolist {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 6px;
        max-width: calc(100vw - 60px);
    }
    
    .tabcar {
        max-width: calc(100vw - 60px);
        gap: 3px;
    }
    
    .mainVideo {
        padding: 6px 8px;
    }
    
    .tabCaritem {
        font-size: 10px;
        padding: 2px 6px;
    }
    
    .video-title {
        font-size: 11px;
    }
    
    .video-author, .video-time, .likes {
        font-size: 9px;
    }
}
</style>

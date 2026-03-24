<template>
    <div class="mainVideo">
        <div class="tabcar">
            <div v-for="tab in mainVideoStore.tablist" :key="tab.id" class="tabCaritem"
                :class="{ active: tab.id === mainVideoStore.activecardId }" @click="getactivedVideo(tab.id)">
                {{ tab.title }}
            </div>
        </div>
        <div class="videolist">
            <div v-for="value in activedVideo" :key="value.id" class="videoItem" @click="enterVideo(value.id)">
                <div class="videoalt">
                    <div class="vedio">
                        <img :src="value.coverUrl" :alt="value.alt">
                        <div class="play-button">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M8 5v14l11-7z" fill="white"></path>
                            </svg>
                        </div>
                        <div class="video-duration">
                            {{ value.longer }}
                        </div>
                    </div>
                </div>
                <div class="videomessage">
                    <div class="title">
                        {{ value.title }}
                    </div>
                    <div class="vediohost">
                        <div class="hostname">
                            @{{ value.hostName }}
                        </div>
                        <div class="timer">
                            {{ value.timer }}
                        </div>
                        <div class="more">
                            <span class="iconfont icon-gengduo"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMainVideoStore } from '@/stores/mainvedio'

const mainVideoStore = useMainVideoStore()
const { activedVideo } = storeToRefs(mainVideoStore)
const { getactivedVideo, enterVideo } = mainVideoStore

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

.videolist {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
    margin-top: 12px;
    max-width: calc(100vw - 240px);
}

.videoItem {
    background: transparent;
    height: 200px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: auto;
    position: relative;
}

.videoItem:hover {
    transform: translateY(-4px);
}

.videoalt {
    position: relative;
    width: 100%;
    height: 70%;
    overflow: hidden;
    border-radius: 8px;
    background: #000;
    margin-bottom: 12px;
}

.vedio {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.vedio img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.videoItem:hover .vedio img {
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

.play-button svg {
    margin-left: 2px;
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

.videomessage {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 4px;
}

.videomessage .title {
    color: #fff;
    font-size: 14px;
    width: 100%;
    white-space: wrap;
    font-weight: 500;
    line-height: 1.4;
    word-break: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 限制标题最多显示2行 */
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* 设置盒子方向为垂直，用于多行文本省略 */
    transition: color 0.2s ease;
}

.videoItem:hover .videomessage .title {
    color: #ff0050;
}

.vediohost {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0 4px;
}

.hostname {
    color: #929398;
    font-size: 12px;
    transition: color 0.2s ease;
}

.videoItem:hover .hostname {
    color: #fff;
}

.timer {
    color: #929398;
    font-size: 12px;
}

.more {
    color: #929398;
    font-size: 12px;
    margin-top: 2px;
}
</style>

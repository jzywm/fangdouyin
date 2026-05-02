<template>
    <div class="video" id="detailVideoSrc">
        <div class="content">
            <canvas id="canvas" class="main-canvas" ref="canvasRef">
            </canvas>
            <video v-if="detailVideoStore.detailVideo.value?.videoID?.videourl" class="video-play" id="main-video" ref="videoRef" autoplay>
                <source :src="detailVideoStore.detailVideo.value?.videoID?.videourl" 
                type="video/mp4">
            </video>
        </div>
    </div>
</template>

<script lang="ts" setup name="detailVideoSrc">

import { ref, onMounted, onUnmounted, watch, } from "vue";

import { storeToRefs } from 'pinia'
import { useDetailVideoStore } from '@/stores/detailVediio'

const detailVideoStore = storeToRefs(useDetailVideoStore())
const store = useDetailVideoStore()
const i = ref(1)
// Video 和 Canvas 引用
const videoRef = ref<HTMLVideoElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationId = ref<number | null>(null)

const timer = ref(0)

let width = 0    
let height = 0

const startx = window.innerWidth

const danmuList: { text: string; color: string; fontSize: number; x: number; y: number; speed: number; width: number }[] = [
{
    text: '这是一条测试弹幕',
    color: '#fff',
    fontSize: 24,
    x: startx,
    y: 0,
    speed: 1,
    width: 0
}
]

const trackHeight = ref(40)
const trackCount = Math.floor(400 / trackHeight.value)

const initCanvas = () => {
    const canvas = canvasRef.value as HTMLCanvasElement | null
    if (!canvas) return false
    
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    if (!rect || !rect.width || !rect.height) return false

    width = rect.width
    height = rect.height

    canvas.width = width * dpr
    canvas.height = height * dpr

    ctx.value = canvas.getContext("2d")
    if (!ctx.value) return false
    
    ctx.value.scale(dpr, dpr)
    ctx.value.font = "24px Arial"
    return true
}
const draw = () => {
    if (!ctx.value) return
    
    ctx.value.clearRect(0, 0, width, height)

    for (let i = danmuList.length - 1; i >= 0; i--) {
        const danmu = danmuList[i]
        danmu!.x -= danmu!.speed

        const textWidth = ctx.value.measureText(danmu!.text).width
        danmu!.width = textWidth

        ctx.value.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.value.fillRect(danmu!.x, danmu!.y, danmu!.width + 10, trackHeight.value)

        ctx.value.fillStyle = danmu!.color
        ctx.value.fillText(danmu!.text, danmu!.x + 5, danmu!.y + trackHeight.value - 10)

        if (danmu!.x + danmu!.width < 0) {
            danmuList.splice(i, 1)
        }
    }
    animationId.value = requestAnimationFrame(draw)
}
const addDanmu = (text: string, color: string) => {
    const trackIndex = Math.floor(Math.random() * trackCount)
    const y = trackIndex * trackHeight.value
    danmuList.push({
        text,
        color,
        fontSize: 24,
        x: width,
        y,
        speed: 1,
        width: 0
    })
}
const clearCanvas = () => {
    initCanvas()
    clearInterval(timer.value)
}
watch([detailVideoStore.danmuplay, detailVideoStore.pause],
    ([newDanmu, newPause]) => {
    if(newDanmu && !newPause){
        draw() // 启动动画循环
        console.log(1)
        timer.value = setInterval(() => {
            i.value++
            addDanmu('这是新的一条弹幕', '#fff')
            console.log(3,i.value)
        }, 2000)
    }else{
        clearCanvas()
        console.log(timer.value)
        if (animationId.value) cancelAnimationFrame(animationId.value)
    }
})

// 视频控制方法
const playVideo = () => {
    if (videoRef.value) {
        videoRef.value.play()
        store.pause = false
    }
}

const pauseVideo = () => {
    if (videoRef.value) {
        videoRef.value.pause()
        store.pause = true
    }
}

const setVolume = (volume: number) => {
    if (videoRef.value) {
        videoRef.value.volume = Math.max(0, Math.min(1, volume / 100))
    }
}

const setPlaybackRate = (rate: number) => {
    if (videoRef.value) {
        videoRef.value.playbackRate = rate
    }
}

const setCurrentTime = (time: number) => {
    if (videoRef.value) {
        videoRef.value.currentTime = time
    }
}

const getCurrentTime = () => {
    return videoRef.value?.currentTime || 0
}

const getDuration = () => {
    return videoRef.value?.duration || 0
}

// 暴露方法到全局，供其他组件调用
if (typeof window !== 'undefined') {
    (window as any).videoControl = {
        playVideo,
        pauseVideo,
        setVolume,
        setPlaybackRate,
        setCurrentTime,
        getCurrentTime,
        getDuration,
        videoRef
    }
}

onMounted(() => {
    if (initCanvas() && !detailVideoStore.pause.value) {
        draw() // 启动动画循环
        timer.value = setInterval(() => {
            i.value++
            addDanmu('这是新的一条弹幕', '#fff')
            // console.log(3,i.value)
        }, 2000)
    }
    if(detailVideoStore.danmuplay?.value && !detailVideoStore.pause?.value){
        console.log(1,detailVideoStore.danmuplay?.value)
        console.log(2,!detailVideoStore.pause?.value)
        draw() // 启动动画循环
        timer.value = setInterval(() => {
            i.value++
            addDanmu('这是新的一条弹幕', '#fff')
            console.log(3,timer.value)
        }, 2000)
    }else{
        clearCanvas()
        if (animationId.value) cancelAnimationFrame(animationId.value)
    }
})
onUnmounted(() => {
    // 取消动画帧请求，防止内存泄漏
    clearCanvas()
    if (animationId.value) cancelAnimationFrame(animationId.value)
})
</script>

<style scoped>
.video-play{
    width:auto;
    height:calc(100vh - 48px)
}

.content {
    width: 100%;
    position: relative;

}

.main-canvas {
    position: absolute;
    width: 100vw;
    height: 50vh;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
}

#main-video {
    position: absolute;
    width: 100vw;
    height: calc(100vh - 48px);
    top: 0;
    left: 0;
    z-index: 0;
}
video::-webkit-media-controls {
    display: none !important;
}
video::-webkit-media-controls-start-playback-button {
    display: none !important;
}
video::-webkit-media-controls-fullscreen-button {
    display: none !important;
}
</style>
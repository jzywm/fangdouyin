<template>
    <div class="video">
        <div class="content">
            <canvas id="canvas" class="main-canvas" ref="canvasRef">
            </canvas>
            <video width="auto" height="100vh" controls id="main-video" class="video">
                <source src="" type="video/mp4">
            </video>
        </div>
    </div>
</template>

<script lang="ts" setup name="detailVideoSrc">

import { ref, onMounted, onUnmounted, } from "vue";

const canvasRef = ref(null)

const ctx = ref<CanvasRenderingContext2D | null>(null)
const animationId = ref<number | null>(null)

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
    const canvas = canvasRef.value! as HTMLCanvasElement
    const dpr = window.devicePixelRatio || 1
    const rect = canvas?.getBoundingClientRect()

    width = rect.width
    height = rect.height


    canvas.width = width * dpr
    canvas.height = height * dpr


    ctx.value = canvas.getContext("2d")
    ctx.value!.scale(dpr, dpr)

    ctx.value!.font = "24px Arial"
}
const draw = () => {
    ctx.value!.clearRect(0, 0, width, height)

    for (let i = danmuList.length - 1; i >= 0; i--) {
        const danmu = danmuList[i]
        danmu!.x -= danmu!.speed

        const textWidth = ctx.value!.measureText(danmu!.text).width
        danmu!.width = textWidth

        ctx.value!.fillStyle = 'rgba(0,0,0,0.1)'
        ctx.value!.fillRect(danmu!.x, danmu!.y, danmu!.width + 10, trackHeight.value)

        ctx.value!.fillStyle = danmu!.color
        ctx.value!.fillText(danmu!.text, danmu!.x + 5, danmu!.y + trackHeight.value - 10)

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
onMounted(() => {
    initCanvas()
    draw() // 启动动画循环
    
    setInterval(() => {
        addDanmu('这是新的一条弹幕', '#fff')
    }, 2000)
    
})
onUnmounted(() => {
    // 取消动画帧请求，防止内存泄漏
    if (animationId.value) cancelAnimationFrame(animationId.value)
})
</script>

<style scoped>
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
}
</style>
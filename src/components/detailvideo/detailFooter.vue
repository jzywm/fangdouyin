<template>
  <div class="footer">
    <div class="footer-left">
      <!-- 播放/暂停按钮 -->
      <div class="control-btn play-pause">
        <div class="pause pause-pause" @click="pausevideo()" v-if="!detailVideoStore.pause.value">
          <span class="pause-iconfont iconfont icon-zanting1"></span>
        </div>
        <div class="pause pause-play" @click="playvideo()" v-else>
          <span class="pause-iconfont iconfont icon-zanting"></span>
        </div>
      </div> <!-- 视频时长 -->
      <div class="time">
        <p>{{ detailVideoStore.time.value }} / {{ detailVideoStore.longer.value }}</p>
      </div> <!-- 弹幕控制 -->
      <div class="danmaku-control" @click="playdanmu()">
        <span class="iconfont icon-danmu"></span>
        <el-icon class="danmu-icon" v-if="detailVideoStore.danmuplay.value"><Check /></el-icon>
      </div>
      <!-- 弹幕输入框 -->
      <div class="danmaku-input-container">
        <!-- <div class="danmaku-post-biaoping">
          <span class="iconfont icon-biaoqing" ></span>
        </div> -->
        <div class="href" v-if="user.islodin.value == false">
          <div class="islongin">
            <h3>登录</h3>
            <p>后可发布弹幕</p>
          </div>
        </div>
        <input class="put-danmaku" type="text" placeholder=" 请输入弹幕 " :disabled=" !user.islodin.value " v-model="danmaku">
        <button class="put-danmaku-btn" @click="postDanMu(danmaku)">发送</button>
      </div>
    </div>
    <div class="footer-right">
      <!-- 右侧控制按钮 -->
      <div class="control-btn">
        <el-switch v-model="detailVideoStore.continueplay.value"></el-switch>
        <p>连播</p>
      </div>
      <div class="control-btn">
        <el-switch v-model="detailVideoStore.clear.value"></el-switch>
        <p>清屏</p>
      </div>
      <div class="control-btn speed-control">
        <el-dropdown @command="handleSpeedChange">
          <p>{{ currentSpeed }}x <span class="el-icon-arrow-down"></span></p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="0.5">0.5x</el-dropdown-item>
              <el-dropdown-item command="0.75">0.75x</el-dropdown-item>
              <el-dropdown-item command="1">1x</el-dropdown-item>
              <el-dropdown-item command="1.25">1.25x</el-dropdown-item>
              <el-dropdown-item command="1.5">1.5x</el-dropdown-item>
              <el-dropdown-item command="2">2x</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="control-btn">
        <span class="iconfont icon-shaohouzaikan"></span>
      </div>
      <div class="control-btn">
        <span class="iconfont icon-quanpingqiehuanxiaoping"></span>
      </div>
      <div class="control-btn sound">
        <div class="nosound" v-if="detailVideoStore.soundnum.value === 0" @click="soundshow = !soundshow">
          <span class="iconfont icon-shengyinjingyin"></span>
        </div>
        <div class="havesound" v-else @click="soundshow = !soundshow">
          <span class="iconfont icon-shengyin"></span>
        </div>
        <el-slider v-if='soundshow' vertical="true" v-model="detailVideoStore.soundnum.value" class="sound-slider"></el-slider>
      </div>
      <div class="control-btn bigger" @click="toggleFullscreen">
        <span class="iconfont icon-24gl-fullScreenEnter2"></span>
      </div>
    </div>
  </div>
</template>

<script setup name="detailFooter" lang="ts">
import { storeToRefs } from 'pinia'
import { useDetailVideoStore } from '@/stores/detailVediio'
import { useUserStore } from '@/stores/user'
import { ref, watch, onMounted, onUnmounted } from 'vue'
import formatDuration from '@/hooks/tolonger'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { saveWatchProgress, getWatchProgress } from '@/api/saveWatchProgress'

const fangfa = useDetailVideoStore()
const detailVideoStore = storeToRefs(useDetailVideoStore())
const user = storeToRefs(useUserStore())
const danmaku = ref('')
const soundshow = ref(false)
const currentSpeed = ref('1')

// 观看进度相关状态
const timeinterval = ref<number | null>(null)
const saveProgressInterval = ref<number | null>(null)
const lastSavedTime = ref<number>(0) // 上次保存的进度
let isComponentUnmounted = false // 标记组件是否已卸载

/**
 * 更新时间显示 - 直接从video元素获取currentTime
 * 重要：video.currentTime 已正确处理倍速，总是表示内容的实际时长（秒数）
 * 倍速不会影响currentTime的值，只会影响真实播放的耗时
 */
function updateTimeDisplay() {
  const currentTime = fangfa.getCurrentTime()
  const current = formatDuration(currentTime as number) as string
  detailVideoStore.time.value = current
}

/**
 * 启动时间更新和进度保存
 */
function startTimeTracking() {
  // 每500ms更新一次时间显示
  if (timeinterval.value) clearInterval(timeinterval.value)
  timeinterval.value = setInterval(() => {
    updateTimeDisplay()
  }, 500) as number

  // 每5秒自动保存一次观看进度（只在播放时）
  if (saveProgressInterval.value) clearInterval(saveProgressInterval.value)
  saveProgressInterval.value = setInterval(() => {
    if (!detailVideoStore.pause.value && user.islodin.value) {
      autoSaveProgress()
    }
  }, 5000) as number
}

/**
 * 停止时间追踪
 */
function stopTimeTracking() {
  // 分别清除每个interval，确保都能被正确清除
  if (timeinterval.value) {
    clearInterval(timeinterval.value)
    timeinterval.value = null
  }
  if (saveProgressInterval.value) {
    clearInterval(saveProgressInterval.value)
    saveProgressInterval.value = null
  }
}

/**
 * 自动保存观看进度
 * 核心逻辑：只保存video.currentTime（内容时长）和倍速
 */
async function autoSaveProgress() {
  try {
    // 防护1：检查组件是否已卸载
    if (isComponentUnmounted) {
      return
    }
    
    // 防护2：检查数据是否存在
    if (!detailVideoStore.detailVideo.value?.videoID?._id) {
      return
    }
    
    const currentTime = fangfa.getCurrentTime()
    const duration = fangfa.getDuration()
    const rate = parseFloat(currentSpeed.value)
    const videoID = detailVideoStore.detailVideo.value.videoID._id
    
    // 防止频繁保存同一位置的进度
    if (Math.abs(currentTime - lastSavedTime.value) < 1) {
      return
    }
    
    await saveWatchProgress(videoID, currentTime, duration, rate)
    lastSavedTime.value = currentTime
    
  } catch (error) {
    console.error('保存观看进度失败:', error)
  }
}

/**
 * 手动保存进度（暂停时调用）
 */
async function manualSaveProgress() {
  try {
    // 防护：检查组件是否已卸载
    if (isComponentUnmounted) {
      return
    }
    
    // 重要：获取 video 的实际当前播放位置，而不是 lastSavedTime
    const currentTime = fangfa.getCurrentTime()
    const duration = detailVideoStore.detailVideo.value.videoID?.longer
    const rate = parseFloat(currentSpeed.value)
    const videoID = detailVideoStore.detailVideo.value.videoID?._id
    
    if (videoID && currentTime > 0) {
      await saveWatchProgress(videoID, currentTime, duration, rate)
      lastSavedTime.value = currentTime
      console.log(`观看进度已保存: ${currentTime}秒 (${rate}x倍速)`)
    }
  } catch (error) {
    console.error('手动保存进度失败:', error)
  }
}

async function restoreWatchProgress() {
  try {
    const videoID = detailVideoStore.detailVideo.value.videoID?._id
    if(videoID){
      const res = await getWatchProgress(videoID)
      const response = res?.data
      const { currentTime, playbackRate } = response?.data
      console.log('获取观看进度:', currentTime)
      if (currentTime > 0) {
        // 恢复进度位置
        console.log('准备恢复进度:', currentTime)
        lastSavedTime.value = currentTime

        // 等待 video 元素的 loadedmetadata 事件再设置进度
        // 这确保 video 已经加载元数据，currentTime 设置才有效
        const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
        if (videoControl) {
          if (videoControl.readyState >= 1) {
            // video 已加载元数据，直接设置
            fangfa.setCurrentTime(currentTime)
          } else {
            // 等待 loadedmetadata 事件
            await new Promise((resolve) => {
              const handler = () => {
                fangfa.setCurrentTime(currentTime)
                videoControl.removeEventListener('loadedmetadata', handler)
                resolve(null)
              }
              videoControl.addEventListener('loadedmetadata', handler)
              // 超时后也执行（防止卡住）
              setTimeout(() => {
                videoControl.removeEventListener('loadedmetadata', handler)
                fangfa.setCurrentTime(currentTime)
                resolve(null)
              }, 2000)
            })
          }
        }

        // 恢复倍速设置
        if (playbackRate && playbackRate !== 1) {
          fangfa.setPlaybackRate(playbackRate)
          currentSpeed.value = playbackRate.toString()
        }

        console.log(`已恢复观看进度: ${currentTime}秒 (${playbackRate}x倍速)`)
      }
    }
  } catch (error) {
    console.error('恢复观看进度失败:', error)
  }
}

watch(() => detailVideoStore.soundnum.value, (newVolume) => {
  if(newVolume){
    const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
    if(videoControl){
    videoControl.muted = false
    }
  }
  fangfa.setVolume(newVolume)
})



const handleSpeedChange = (speed: string) => {
  fangfa.setPlaybackRate(parseFloat(speed))
  currentSpeed.value = speed
  // 立即保存新的倍速设置
  autoSaveProgress()
}

const postDanMu = (content: string): void => {
  if (content.trim() == '') {
    return
  } else {
    fangfa.postComment(content)
    danmaku.value = ' '
  }
}

/**
 * 暂停视频 - 保存进度
 */
const pausevideo = () => {
  fangfa.pauseVideo()
  stopTimeTracking()
  // 暂停时立即保存进度
  manualSaveProgress()
}

/**
 * 播放视频 - 恢复进度（如果有的话）
 */
const playvideo = (): void => {
  
  fangfa.playVideo(lastSavedTime.value)
  startTimeTracking()
}

const playdanmu = (): void => {
  detailVideoStore.danmuplay.value = !detailVideoStore.danmuplay.value
}

const toggleFullscreen = () => {
  const videoControl = (window as any).videoControl
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
}


/**
 * 生命周期：挂载时
 */
onMounted(async () => {
  // 等待DOM更新完成
  await new Promise(resolve => setTimeout(resolve, 200))
  // 初始化音量（0-100转换为0-1）
  fangfa.setVolume(detailVideoStore.soundnum.value)
  // 先恢复观看进度（包括倍速）
  if (user.islodin.value ) {
    await restoreWatchProgress()
  }
  
  const videoControl = document.querySelector('#detailVideoSrc')?.querySelector('video')
  if(videoControl){
    // 设置初始音量状态
    videoControl.muted = true
    setTimeout(async() => {
      if (videoControl.readyState >= 2) {
      // canplay 状态：video 已可以播放
      console.log(111111,videoControl.readyState)
      videoControl.muted = true
      await playvideo()
      if(detailVideoStore.soundnum){
      videoControl.muted = false
      videoControl.volume = detailVideoStore.soundnum.value / 10
    }
    } else {
      console.log(22222,videoControl.readyState)
      // 等待 canplay 事件
      await new Promise((resolve) => {
        const handler = () => {
          playvideo()
          videoControl.removeEventListener('canplay', handler)
          resolve(null)
        }
        videoControl.addEventListener('canplay', handler)
        // 超时保护
        setTimeout(() => {
          videoControl.removeEventListener('canplay', handler)
          playvideo()
          resolve(null)
        }, 3000)
      })
    }
    }, 300);
    // 等待 video 完全加载后再播放
    
    // 恢复音量
    if(detailVideoStore.soundnum.value){
      videoControl.muted = false
    }
  }
  // 注意：playvideo() 中已经调用了 startTimeTracking()，所以这里不需要再调用一次
})

/**
 * 生命周期：卸载时
 */
onUnmounted(async () => {
  // 第一步：立即标记组件已卸载，防止后续异步操作
  isComponentUnmounted = true
  
  // 第二步：停止所有时间追踪
  stopTimeTracking()
  
  // 第三步：页面关闭前保存进度（只在已登录且有有效进度时）
  if (user.islodin.value && lastSavedTime.value > 0) {
    await manualSaveProgress()
  }
})



</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  white-space: nowrap;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 4px;
  border-radius: 4px;
}

.control-btn:hover {
  color: #ff0050;
  background-color: rgba(255, 255, 255, 0.1);
}

.control-btn .iconfont {
  font-size: 22px;
}

.time {
  color: #ffffff;
  font-size: 16px;
  white-space: nowrap;
  min-width: 80px;
}

.danmaku-control {
  position: relative;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 2px 4px;
  border-radius: 4px;
}

.danmaku-control:hover {
  color: #ff0050;
  background-color: rgba(255, 255, 255, 0.1);
}

.danmaku-control .iconfont {
  font-size:30px;
}

.danmaku-control .danmu-icon{
  display: block;
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 10px;
  height: 10px;
  font-size: 10px;
  font-weight: 900;
  background-color: #eb2d53;
  border-radius: 50%;
}

.danmaku-input-container {
  display: flex;
  position: relative;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 400px;
  min-width: 0;
  overflow: hidden;
}

.danmaku-post-biaoping {
  position: absolute;
  left: 13px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;
  border-radius: 4px;
}

.danmaku-post-biaoping:hover {
  color: #ff0050;
  background-color: rgba(255, 255, 255, 0.1);
}

.islongin {
  position: absolute;
  display: flex;
  top: 8px;
  left: 38px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 12px;
  white-space: nowrap;
  margin-right: 8px;
}

.islongin h3 {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: #eb2d53;
}

.islongin p {
  margin: 0;
  font-size: 10px;
  color: #ebecec;
}

.put-danmaku {
  height: 32px;
  width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 0 12px;
  font-size: 14px;
  outline: none;
  overflow: hidden;
  transition: all 0.2s ease;
}

.put-danmaku:focus {
  border-color: #ff0050;
  background: rgba(255, 255, 255, 0.15);
}

.put-danmaku::placeholder {
  color: #999999;
}

.put-danmaku-btn {
  position: absolute;
  right: 5px;
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 16px;
  background: #484d4d;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.put-danmaku-btn:hover {
  background: #ff3366;
  transform: translateY(-1px);
}

.put-danmaku-btn:active {
  transform: translateY(0);
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.right-controls .control-btn p {
  margin: 0;
  font-size: 14px;
}

.sound {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sound-slider {
  position: absolute;
  top: -150%;
  transform: translate(-10px, 0);
  z-index: 9999999;
  margin: 0;
  height: 80px;
}

.sound-slider :deep(.el-slider__runway) {
  background-color: transparent;
}

.sound-slider :deep(.el-slider__bar) {
  background-color: #ff0050;
}

.sound-slider :deep(.el-slider__button) {
  border-color: #ff0050;
}

.control-btn .bigger {
  position: absolute;
  width: 16px;
}

.speed-control {
  cursor: pointer;
}

.speed-control p {
  margin: 0;
  font-size: 14px;
}

.control-btn .bigger .iconfont {
  width: 16px;
}
</style>

<template>
  <div class="footer">
    <div class="footer-left">
      <!-- 播放/暂停按钮 -->
      <div class="control-btn play-pause">
        <div class="pause pause-pause" v-if="detailVideoStore.pause === true">
          <span class="pause-iconfont iconfont icon-zanting"></span>
        </div>
        <div class="pause pause-play" v-else>
          <span class="pause-iconfont iconfont icon-zanting1"></span>
        </div>
      </div> <!-- 视频时长 -->
      <div class="time">
        <p>{{ detailVideoStore.time }} / {{ value.time }}</p>
      </div> <!-- 弹幕控制 -->
      <div class="danmaku-control">
        <span class="iconfont icon-danmu"></span>
      </div> <!-- 弹幕输入框 -->
      <div class="danmaku-input-container">
        <div class="danmaku-post-biaoping">
          <span class="iconfont icon-biaoqing"></span>
        </div>
        <div class="href" v-if="detailVideoStore.isLogin === false">
          <div class="islongin">
            <h3>登录</h3>
            <p>后可发布弹幕</p>
          </div>
        </div>
        <input class="put-danmaku" type="text" placeholder="" v-model="danmaku">
        <button class="put-danmaku-btn">发送</button>
      </div>
    </div>
    <div class="footer-right">
      <!-- 右侧控制按钮 -->
      <div class="control-btn">
        <el-switch v-model="continueplay"></el-switch>
        <p>连播</p>
      </div>
      <div class="control-btn">
        <el-switch v-model="clear"></el-switch>
        <p>清屏</p>
      </div>
      <div class="control-btn">
        <p>倍速</p>
      </div>
      <div class="control-btn">
        <span class="iconfont icon-shaohouzaikan"></span>
      </div>
      <div class="control-btn">
        <span class="iconfont icon-quanpingqiehuanxiaoping"></span>
      </div>
      <div class="control-btn sound">
        <div class="nosound" v-if="soundnum === 0">
          <span class="iconfont icon-shengyinjingyin"></span>
        </div>
        <div class="havesound" v-else>
          <span class="iconfont icon-shengyin"></span>
        </div>
        <el-slider v-if='soundshow' vertical="true" v-model="soundnum" class="sound-slider"></el-slider>
      </div>
      <div class="control-btn bigger">
        <span class="iconfont icon-24gl-fullScreenEnter2"></span>
      </div>
    </div>
  </div>
</template>

<script setup name="detailFooter" lang="ts">
import { storeToRefs } from 'pinia'
import { useDetailVideoStore } from '@/stores/detailVediio'
import { ref } from 'vue'


const detailVideoStore = useDetailVideoStore()
const { continueplay, clear, soundnum } = storeToRefs(detailVideoStore)
const value = detailVideoStore.detailVideo
const danmaku = ref('')
const soundshow = ref(false)
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 10;
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
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;
}

.danmaku-control:hover {
  color: #ff0050;
  background-color: rgba(255, 255, 255, 0.1);
}

.danmaku-control .iconfont {
  font-size: 28px;
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

.control-btn .bigger .iconfont {
  width: 16px;
}
</style>

<template>
  <div class="left">
    <div class="auther">
      <p class="authername">@{{ detailVideo.videoID?.hostName }}</p>
      <p class="posttime">{{ newdate }}</p>
    </div>
    <div class="info">
      <div class="title">
        {{ detailVideo.videoID?.title }}
      </div>
      <div class="description">
        {{ detailVideo.videoID?.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="detailLeft">

import { useDetailVideoStore } from '@/stores/detailVediio'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const detailVideoStore = storeToRefs(useDetailVideoStore())
const detailVideo = detailVideoStore.detailVideo

const newdate = computed(() => {
  // 安全访问：如果 detailVideo 或 videoID 不存在，返回空字符串或默认值
  const createAT = detailVideo.value?.videoID?.createAT
  
  if (!createAT) return '--' 

  const date = new Date(createAT)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${month}-${day}`
})
// const time = ref(value.value.videoID.createAT)
// console.log(123,time)
// const date = new Date(time.value)
// const month = String(date.getMonth() + 1).padStart(2, '0');
// const day = String(date.getDate()).padStart(2, '0');
// const newdate = month + '-' + day 

</script>

<style scoped>
.left {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 60px;
  left: 16px;
  width: 220px;
}

.left .auther {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 30px;
}

.left .auther .authername {
  color: #f4f4f3;
  font-weight: 600;
  font-size: 18px;
}

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
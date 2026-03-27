<template>
  <div class="detail-vedio" :id:number="detailVideoStore.detailVideo.id">
    <detailHrader />
    <detailLeft />
    <detailRight />
    <detailFooter />
  </div>
</template>

<script lang="ts" setup name="detailVideo">
import detailHrader from './detailHrader.vue'
import detailLeft from './detailLeft.vue'
import detailRight from './detailRight.vue'
import detailFooter from './detailFooter.vue'

import { useDetailVideoStore } from '@/stores/detailVediio'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const detailVideoStore = useDetailVideoStore()


// 组件挂载时获取视频详情
onMounted(() => {
  const id = Number(route.params.id)
  if (id) {
    detailVideoStore.getdetailvideo(id)
  }
})
</script>

<style scoped>
:root {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.detail-vedio {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
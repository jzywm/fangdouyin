<template>
  <div class="left">
    <div class="auther">
      <p class="authername">@{{ value.authername }}</p>
      <p class="posttime">{{ value.posttime }}</p>
    </div>
    <div class="info">
      <div class="title">
        {{ value.title }}
      </div>
      <div class="description">
        {{ value.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="detailLeft">

import { useDetailVideoStore } from '@/stores/detailVediio'

const detailVideoStore = useDetailVideoStore()

const value = detailVideoStore.detailVideo

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
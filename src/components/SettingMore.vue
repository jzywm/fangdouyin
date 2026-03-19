<template>
  <div class="setting">
    <ul class="setting-list">
      <li>
        设置
        <ul class="setting-sub-list">
          <li v-for="(item, index) in settingMoreShow" @click="sideCarStore.getAlert(item.id)" :key="item.id ?? index">
            {{ item.title }}
          </li>
        </ul>
      </li>
      <li>
        关于
        <ul class="setting-sub-list">
          <li v-for="(item, index) in aboutShow" @click="sideCarStore.getAlert(item.id)" :key="item.id ?? index">
            {{ item.title }}
          </li>
        </ul>
      </li>
      <li>
        帮助
        <ul class="setting-sub-list">
          <li v-for="(item, index) in questionShow" @click="sideCarStore.getAlert(item.id)" :key="item.id ?? index">
            {{ item.title }}
          </li>
        </ul>
      </li>
    </ul> 
  </div>
</template>

<script setup lang="ts">
import { useSideCarStore,  } from '@/stores/sideCar'

const sideCarStore = useSideCarStore()
const settingMoreShow = sideCarStore.settingMoreShow
const aboutShow = sideCarStore.aboutShow
const questionShow = sideCarStore.questionShow
sideCarStore.getAlert(1)
</script>

<style scoped>
.setting {
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
  box-sizing: border-box;
}
.setting-list {
  list-style: none;
  display: relative;
  padding: 0;
  margin: 0;
}

.setting-list li {
  padding: 8px 0;
  cursor: pointer;
  display: block;
  position: relative;
  transition: all 0.2s ease;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.setting-list li:hover {
  color: #fff;
}
.setting-sub-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: -50%;
  left: 50%;
  min-width: 160px;
  background-color: #252632;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  visibility: hidden;
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
  z-index: 40;
}
.setting-list li:hover .setting-sub-list {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}
.setting-sub-list li {
  padding: 8px 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
<template>
  <div class="side-car">
    <div class="logo">
      <img src="../../public/favicon.ico" alt="logo">
      <span>抖音</span>
    </div>
    <div class="nav">
      <ul class="nav-list">
        <li v-for="item in sideCarStore.sideCarShow" :key="item.id" :class="{ 'active-index': sideCarStore.activeId === item.id }" @click="activited(item.id)">{{ item.title }}</li>
      </ul>
    </div>
    <div class="foot">
      <div>
        <Setting />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSideCarStore } from '../stores/sideCar'
import { onMounted } from 'vue'
import Setting from './SettingMore.vue'

const sideCarStore = useSideCarStore()

onMounted(() => {
})

function activited(id: number) {
  sideCarStore.getcomponent(id)
}
</script>

<style scoped>
.side-car {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 240px;
  height: 100vh;
  background-color: #161823;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.active-index {
  background-color: #2d2f38;
  color: #dadadc;
}

.logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
}

.logo img {
  height: 30px;
}

.logo span {
  font-size: 18px;
  font-weight: 600;
}

.nav {
  flex: 1;
  overflow-y: auto;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 4px 10px;
  font-size: 14px;
}

.nav-list li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.foot {
  padding: 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
}

.foot > div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.foot > div > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.foot > div > div > ul {
  display: none;
}
.foot > div > div {
  position: relative;
  border-radius: 8px;
}
.foot > div > div:hover > ul {
  display: block;
  position: absolute;
  left: 30%;
  background-color: #2d2f38;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.foot span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

/* Scrollbar styles */
.nav::-webkit-scrollbar {
  width: 4px;
}

.nav::-webkit-scrollbar-track {
  background: transparent;
}

.nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
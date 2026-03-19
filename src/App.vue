<script setup lang="ts">
// 抖音网页版首页组件
import sideCar from '@/components/sideCar.vue'
import headerSerach from '@/components/headerSerach.vue'
import mainVedio from './components/mainVedio.vue';
</script>

<template>
  <div class="app">
    <div class="sidebar"><sideCar /></div>
    <div class="main">
      <headerSerach />
      <mainVedio />
    </div>

  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #161823
}

body {
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #161823;
}

.app {
  height: 100;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.sidebar {
  flex: 0 0 240px;
}

.main {
  flex: 1 1 auto;
  min-width: 0;
  overflow: auto;
}
</style>

<script setup lang="ts">
// 抖音网页版首页组件
import sideCar from '@/components/sideCar.vue'
import headerSearch from '@/components/headerSearch.vue'  
import loginIn from '@/components/loginIn.vue'
import mainView from '@/components/mainView.vue'

</script>

<template>
  <div class="app">
    <div class="sidebar" v-if="!$route.meta.fullScreen"><sideCar /></div>
    <div class="main">
      <headerSearch v-if="!$route.meta.fullScreen"/>
      <mainView />
    </div>
  </div>

  <loginIn />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #161823
}


html,body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  background-color: #161823;
}

.app {
  height: 100%;
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

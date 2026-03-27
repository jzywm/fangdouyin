<template>
  <div class="header">
    <div class="close-button" @click="router.back()">
      <span class="iconfont icon-cuocha_kuai"></span>
    </div>
    <div class="search">
      <input class="search-ipt" type="text" placeholder="搜索你感兴趣的内容">
      <div class="serach-button">
        <div class="iconfont">
          <span class="iconfont icon-sousuo"></span>
        </div>
        <div class="search-btn-message">搜索</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="detailHrader">

import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<style scoped>
.header {
  position: absolute;
  display: flex;
  align-items: center;
  top: 30px;
  left: 30px;
  gap: 25px;
  width: calc(100% - 40px);
  z-index: 10;
}

.close-button {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.close-button .iconfont {
  font-size: 18px;
  color: #ffffff;
}

.search {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 380px;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  border-radius: 12px;
  padding: 5px 10px;
}

.search-ipt {
  flex: 1;
  height: 30px;
  border: none;
  outline: none;
  background: transparent;
  color: #ffffff;
  padding: 0 10px;
  font-size: 14px;
}

.search-ipt::placeholder {
  color: #999;
}

.serach-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 15px;
  transition: background-color 0.2s ease;
}

.serach-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.serach-button .iconfont {
  font-size: 16px;
}

.search-btn-message {
  font-size: 16px;
}
</style>
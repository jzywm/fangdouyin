<template>
  <div class="right">
    <div class="right-item-author author">
      <div class="author-avatar">
        <el-avatar :src="value.useravatarurl" :size="45" />
      </div>
      <div class="guanzhu">
        <span class="iconfont icon-jiahao"></span>
      </div>
    </div>
    <div class="right-item like" @click="detailVideoStore.likeVideo(value.id, user.token)">
      <div class="icon" :class="{ 'active-like': detailVideoStore.isLike }">
        <span class="iconfont icon-aixin"></span>
      </div>
      <div class="num">{{ value.likenum }}</div>
    </div>
    <div class="right-item comment" @click="detailVideoStore.isShowCommentList = !detailVideoStore.isShowCommentList">
      <div class="icon">
        <span class="iconfont icon-sixin"></span>
      </div>
      <div class="num">{{ value.commentnum }}</div>
    </div>
    <div class="right-item right-item-collect collect" @click="detailVideoStore.collectVideo(value.id, user.token)">
      <div class="icon" :class="{ 'active-collect': detailVideoStore.isCollect }">
        <span class="iconfont icon-shoucang-yishoucang"></span>
      </div>
      <div class="num">{{ value.collectnum }}</div>
    </div>
    <div class="right-item share">
      <div class="icon">
        <span class="iconfont icon-a-fenxiangweifenxiang"></span>
      </div>
      <div class="num">{{ value.sharenum }}</div>
    </div>
    <div class="right-item more">
      <div class="icon">
        <span class="iconfont icon-gengduo1"></span>
      </div>
    </div>
  </div>
  <div class="comment-list" v-show="detailVideoStore.isShowCommentList === true">

    <div v-for="item in detailVideoStore.commentList" :key="item.id">
      {{ item.content }}
    </div>
  </div>
</template>

<script setup name="detailRight" lang="ts">

import { useDetailVideoStore } from '@/stores/detailVediio'
import { useUserStore } from '@/stores/user'

const user = useUserStore()

const detailVideoStore = useDetailVideoStore()
const value = detailVideoStore.detailVideo

</script>

<style scoped>
.right {
  position: absolute;
  display: flex;
  align-items: center;
  justify-items: auto;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
  right: 16px;
  bottom: 60px;
  height: auto;
  width: 35px;
  z-index: 9;
}

.right .right-item-author {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

.guanzhu {
  position: absolute;
  top: 32px;
  color: #ff0050;
  width: auto;
  height: auto;
  border-radius: 50%;
  border: rgba(255, 255, 255, 0.05), 2px;
}

.right .right-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.active-like {
  color: #fe2c55 !important;
}

.active-collect {
  color: #ffb802 !important;
}

.right-item:hover {
  transform: translateY(-2px) scale(1.05);
  background-color: rgba(255, 255, 255, 0.05);
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.right-item-collect:hover {
  color: #ffb802 !important;
}

.right-item:active {
  transform: translateY(-1px) scale(1.02);
}

.right .right-item .icon {
  width: auto;
  height: auto;
  font-size: 22px;
  color: #eaebea;
  transition: all 0.2s ease;
}

.right-item:hover .icon {
  color: #ff0050;
  transform: scale(1.05);
}

.right .right-item .icon .iconfont {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: auto;
  transition: all 0.2s ease;
}

.right .right-item .num {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.right-item:hover .num {
  color: #ff0050;
  transform: scale(1.05);
}

/* 关注按钮特殊效果 */
.right-item.author .guanzhu {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ff0050;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
}

.right-item.author .guanzhu:hover {
  background-color: #ff3366;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(255, 0, 80, 0.3);
}

.right-item.author .guanzhu .iconfont {
  color: #ffffff;
  font-size: 18px;
}

/* 作者头像效果 */
.right-item.author .author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  overflow: hidden;
}

.right-item.author:hover .author-avatar {
  border-color: #ff0050;
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(255, 0, 80, 0.3);
}
</style>
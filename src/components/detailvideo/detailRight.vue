<template>
  <div class="right">
    <div class="right-item-author author">
      <div class="author-avatar">
        <el-avatar :src="value.videoID?.avatar" :size="45" />
      </div>
      <div class="guanzhu">
        <span class="iconfont icon-jiahao"></span>
      </div>
    </div>
    <div 
      class="right-item like" 
      :class="{ 'active-like': detailVideoStore.isLike.value }"
      @click="fangfa.likeVideo(value.videoID._id)"
      >
        <div class="icon">
          <span class="iconfont icon-aixin"></span>
        </div>
      <div class="num">{{ value.likeCount }}</div>
    </div>
    <div class="right-item comment" @click="detailVideoStore.isShowCommentList.value = !detailVideoStore.isShowCommentList.value">
      <div class="icon">
        <span class="iconfont icon-sixin"></span>
      </div>
      <div class="num">{{ value.commentCount }}</div>
    </div>
    <div class="right-item right-item-collect collect"
    :class="{ 'active-collect': detailVideoStore.isCollect.value }"
     @click="fangfa.collectVideo(value.videoID._id)">
      <div class="icon">
        <span class="iconfont icon-shoucang-yishoucang"></span>
      </div>
      <div class="num">{{ value.collectionCount }}</div>
    </div>
    <div class="right-item share">
      <div class="icon">
        <span class="iconfont icon-a-fenxiangweifenxiang"></span>
      </div>
      <div class="num">{{ value.shareCount }}</div>
    </div>
    <div class="right-item more">
      <div class="icon">
        <span class="iconfont icon-gengduo1"></span>
      </div>
    </div>
  </div>
</template>

<script setup name="detailRight" lang="ts">

import { useDetailVideoStore } from '@/stores/detailVediio'
import { storeToRefs } from 'pinia'

const fangfa = useDetailVideoStore()
const detailVideoStore = storeToRefs(useDetailVideoStore())
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
  width: auto;
  height: auto;
  font-size: 22px;
  color: #fe2c55;
  transition: all 0.2s ease;
}

.active-like .iconfont {
  color: #fe2c55 ;
  animation: pulse 0.6s ease-in-out;
}

.active-collect {
  width: auto;
  height: auto;
  font-size: 22px;
  color: #ffb802;
  transition: all 0.2s ease;

}
.active-collect .iconfont {
  color: #ffb802 ;
  animation: pulse 0.6s ease-in-out;
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
  transform: scale(1.1);
}

.right-item.like:hover .icon {
  color: #fe2c55;
}

.right-item.collect:hover .icon {
  color: #ffb802;
}

.right-item.comment:hover .icon {
  color: #00c4ff;
}

.right-item.share:hover .icon {
  color: #00ff88;
}

.right .right-item .icon .iconfont {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: auto;
  transition: all 0.2s ease;
}

.right .right-item .num {
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: center;
  min-width: 30px;
}

.right-item:hover .num {
  transform: scale(1.1);
}

.right-item.like:hover .num {
  color: #fe2c55;
}

.right-item.collect:hover .num {
  color: #ffb802;
}

.right-item.comment:hover .num {
  color: #00c4ff;
}

.right-item.share:hover .num {
  color: #00ff88;
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
  margin-top: 4px;
  box-shadow: 0 2px 8px rgba(255, 0, 80, 0.3);
}

.right-item.author .guanzhu:hover {
  background-color: #ff3366;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 0, 80, 0.4);
}

.right-item.author .guanzhu .iconfont {
  color: #ffffff;
  font-size: 18px;
}

/* 作者头像效果 */
.right-item.author .author-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.right-item.author:hover .author-avatar {
  border-color: #ff0050;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 0, 80, 0.4);
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .right {
    right: 10px;
    bottom: 50px;
    width: 40px;
    gap: 16px;
    padding: 8px;
  }

  .right .right-item .icon .iconfont {
    font-size: 22px;
  }

  .right .right-item .num {
    font-size: 10px;
  }

  .right-item.author .author-avatar {
    width: 44px;
    height: 44px;
  }

  .right-item.author .guanzhu {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 480px) {
  .right {
    right: 8px;
    bottom: 40px;
    width: 36px;
    gap: 12px;
    padding: 6px;
  }

  .right .right-item .icon .iconfont {
    font-size: 20px;
  }

  .right .right-item .num {
    font-size: 9px;
  }

  .right-item.author .author-avatar {
    width: 40px;
    height: 40px;
  }

  .right-item.author .guanzhu {
    width: 28px;
    height: 28px;
  }

  .right-item.author .guanzhu .iconfont {
    font-size: 16px;
  }
}
</style>
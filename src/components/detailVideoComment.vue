<template>
  <div class="detail-video-comment" :class="{ 'show': detailVideoStore.isShowCommentList }">
    <div class="tab">
      <div class="tab-item" :id:number=1 :class="{ active: detailVideoStore.activeid === 1 }"
        @click="detailVideoStore.handleTabclick(1)">
        <p>详情</p>
      </div>
      <div class="tab-item" :id:number="2" :class="{ active: detailVideoStore.activeid === 2 }"
        @click="detailVideoStore.handleTabclick(2)">
        <p>TA的作品</p>
      </div>
      <div class="tab-item" :id:number="3" :class="{ active: detailVideoStore.activeid === 3 }"
        @click="detailVideoStore.handleTabclick(3)">
        <p>评论</p>
      </div>
      <div class="tab-item" :id:number="4" :class="{ active: detailVideoStore.activeid === 4 }"
        @click="detailVideoStore.handleTabclick(4)">
        <p>相关推荐</p>
      </div>
      <div class="tab-item" @click="detailVideoStore.isShowCommentList = false">
        <span class="iconfont icon-cuocha_kuai"></span>
      </div>
    </div>
    <div class="comment-header">
      <div class="comment-num">
        <p>全部评论({{ detailVideoStore.commentallnumber }})</p>
      </div>
    </div>
    <div class="comment-list">
      <div v-for="item in detailVideoStore.commentlist" :key="item.id" class="comment-item">
        <div class="comment-avatar">
          <img :src="item.useravatarurl" alt="">
        </div>
        <div class="comment-content-wrapper">
          <div class="comment-header-info">
            <div class="comment-author">
              <span class="author-name">{{ item.username }}</span>
              <span v-if="item.isAuthor" class="author-tag">作者</span>
            </div>
          </div>
          <div class="comment-content">
            <p>{{ item.content }}</p>
            <div v-if="item.images && item.images.length > 0" class="comment-images">
              <img v-for="(image, index) in item.images" :key="index" :src="image" class="comment-image">
            </div>
          </div>
          <div class="comment-footer">
            <div class="comment-time">
              <span>{{ item.posttime }}·{{ item.ip }}</span>
            </div>
            <div class="comment-actions">
              <div class="comment-action-top">
                <span class="iconfont icon-sixin"></span>
                <span class="action-text">回复</span>
                <span class="iconfont icon-a-fenxiangweifenxiang"></span>
                <span class="action-text">分享</span>
                <span class="iconfont icon-aixin"></span>
                <span class="action-text">{{ item.likenum }}</span>
              </div>
              <div class="comment-action">
                <div class="comment-reply-toggle"
                  v-if="detailVideoStore.commentreplyshowid != item.id && item.replyNum > 0">
                  <span class="reply-toggle-text" @click="detailVideoStore.commentreplyshowid = item.id">—— 展开{{
                    item.replyNum
                  }}条回复</span>
                </div>
                <div class="comment-replies" v-if="detailVideoStore.commentreplyshowid == item.id">
                  <div class="reply-item" v-for="value in item.replylist" :key="value.id">
                    <div class="reply-avatar">
                      <img :src="value.useravatarurl" alt="">
                    </div>
                    <div class="reply-content-wrapper">
                      <div class="reply-header-info">
                        <div class="reply-author">
                          <span class="author-name">{{ value.username }}</span>
                          <span v-if="value.isAuthor === true " class="author-tag">作者</span>
                        </div>
                      </div>
                      <div class="reply-content">
                        <p>{{ value.content }}</p>
                        <div v-if="value.images && value.images.length > 0" class="reply-images">
                          <img v-for="(image, index) in value.images" :key="index" :src="image" class="reply-image">
                        </div>
                      </div>
                      <div class="reply-footer">
                        <div class="reply-time">
                          <span>{{ value.posttime }}·{{ value.ip }}</span>
                        </div>
                        <div class="reply-actions">
                          <div class="reply-action">
                            <span class="iconfont icon-sixin"></span>
                            <span class="action-text">回复</span>
                          </div>
                          <div class="reply-action">
                            <span class="iconfont icon-aixin"></span>
                            <span class="action-text">{{ value.likenum }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="comment-input-area" v-if="!token" @click="user.login()">
        <div class="input-wrapper">
          <span class="input-placeholder">请先<span>登录</span>后发表评论</span>
        </div>
      </div>
      <div class="comment-input-area" v-else>
        <div class="input-wrapper">
          <input type="text" placeholder="请输入评论内容" v-model="detailVideoStore.commentcontent"
            @keyup.enter="detailVideoStore.postComment(detailVideoStore.commentcontent)">
          <button @click="detailVideoStore.postComment(detailVideoStore.commentcontent)" class="send-btn">
            <p>发送</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="detailVideoComment">

import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const user = useUserStore()
const { token } = storeToRefs(user)

import { useDetailVideoStore } from '@/stores/detailVediio'

const detailVideoStore = useDetailVideoStore()

</script>

<style scoped>
.detail-video-comment {
  position: absolute;
  right: -100%;
  width: 300px;
  height: 100vh;
  background-color: #111111;
  color: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: right 0.3s ease;
  z-index: 20;
}

/* 顶部标签栏 */
.detail-video-comment.show {
  right: 0;
}

.tab {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #333333;
  background-color: #111111;
  position: sticky;
  top: 0;
  z-index: 10;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-item p {
  font-size: 13px;
  color: #999999;
  margin: 0;
}

.active {
  position: relative;
}

.active p {
  color: #ffffff;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
}

.tab-close {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.tab-close .iconfont {
  font-size: 20px;
  color: #999999;
  transition: color 0.2s ease;
}

.tab-close:hover .iconfont {
  color: #ffffff;
}

.comment-header {
  padding: 6px;
}

.comment-num p {
  font-size: 14px;
  font-weight: 600;
}

.comment-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  padding: 0 12px;
}

.comment-item {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #333333;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.comment-header-info {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.comment-author {
  display: flex;
  align-items: center;
}

.author-name {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-right: 8px;
}

.author-tag {
  font-size: 12px;
  color: #ff0050;
  background-color: rgba(255, 0, 80, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
}

.comment-content {
  margin-bottom: 8px;
}

.comment-content p {
  font-size: 14px;
  line-height: 1.5;
  color: #ffffff;
}

.comment-images {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.comment-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin: 0;
  word-break: break-word;
}

.comment-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: left;
}

.comment-time {
  font-size: 12px;
  color: #999999;
}

.comment-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-action-top {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #8f9192;
  cursor: pointer;
  transition: all 0.2s ease;
}

.comment-action .iconfont {
  font-size: 14px;
  color: #999999;
  transition: color 0.2s ease;
}

.comment-action .action-text {
  font-size: 12px;
  color: #999999;
  transition: color 0.2s ease;
}

.comment-reply-toggle {
  margin-top: 8px;
}

.reply-toggle-text {
  font-size: 12px;
  color: #999999;
  cursor: pointer;
  transition: color 0.2s ease;
}

.reply-toggle-text:hover {
  color: #ffffff;
}

/* 回复列表 */
.comment-replies {
  margin-top: 12px;
  margin-left: 8px;
  border-top: 1px solid #333333;
  padding-top: 12px;
}

.reply-item {
  display: flex;
  margin-bottom: 12px;
}

.reply-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
  flex-shrink: 0;
}

.reply-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.reply-content-wrapper {
  flex: 1;
  min-width: 0;
}

.reply-header-info {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.reply-author {
  display: flex;
  align-items: center;
}

.reply-content {
  margin-bottom: 4px;
}

.reply-content p {
  font-size: 12px;
  line-height: 1.4;
  color: #ffffff;
  margin: 0;
  word-break: break-word;
}

.reply-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: left;
  justify-content: center;
}

.reply-time {
  font-size: 10px;
  color: #999999;
}

.reply-actions {
  display: flex;
  gap: 12px;
}

.reply-action {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reply-action .iconfont {
  font-size: 12px;
  color: #999999;
  transition: color 0.2s ease;
}

.reply-action .action-text {
  font-size: 10px;
  color: #999999;
  transition: color 0.2s ease;
}

.reply-action:hover .iconfont,
.reply-action:hover .action-text {
  color: #ffffff;
}

/* 评论输入区域 */
.comment-input-area {
  padding: 16px;
  border-top: 1px solid #333333;
  background-color: #111111;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.input-wrapper {
  background-color: #333333;
  border-radius: 20px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-placeholder {
  font-size: 14px;
  color: #999999;
}

.input-placeholder span {
  color: #ff0050;
  cursor: pointer;
  transition: color 0.2s ease;
}

.input-placeholder span:hover {
  color: #ff3366;
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 14px;
  padding: 0 12px;
}

.send-btn {
  padding: auto;
  background: linear-gradient(135deg, #ff0050, #ff6a85);
  color: #fff;
  height: 30px;
  width: 60px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.3s ease;
}

.send-btn p {
  margin: 0;
}

.send-btn:hover {
  background-color: #ff3366;
}

/* 滚动条样式 */
.comment-list::-webkit-scrollbar {
  width: 4px;
}

.comment-list::-webkit-scrollbar-track {
  background: #111111;
}

.comment-list::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 2px;
}

.comment-list::-webkit-scrollbar-thumb:hover {
  background: #444444;
}

.comment-action:hover .iconfont,
.comment-action:hover .action-text {
  color: #ffffff;
}
</style>
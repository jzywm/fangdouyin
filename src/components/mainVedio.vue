<template>
    <div class="tabCar">
        <div 
            v-for="tab in mainVideoStore.tablist" 
            :key="tab.id"
            :class="{ active: mainVideoStore.activeId === tab.id }"
            @click="getactivedVideo(tab.id)"
        >
            {{ tab.title }}
        </div>
        <div v-for="value in activedVideo" :key="value.id" class="videoItem" @click="enterVideo(value.id)">
            <video :src="value.videoUrl" controls autoplay loop></video>
            <h3>{{ value.title }}</h3>
            <p>{{ value.hostName }}</p>
            <p>点赞: {{ value.loveCount }}</p>
            <p>评论: {{ value.commentCount }}</p>
            
        </div>
    </div>
        
</template>
<script setup lang="ts">
import { useMainVideoStore } from '@/stores/mainvedio'

const mainVideoStore = useMainVideoStore()
const activedVideo = mainVideoStore.activedVideo
const getactivedVideo = mainVideoStore.getactivedVideo
const enterVideo = mainVideoStore.enterVideo

</script>
<style scoped>

</style>
<template>
    <div class="header">
        <div class="search">
            <div class="search-box">
                <span class="iconfont icon-sousuo search-icon"></span>
                <input class="search-input" type="text" placeholder="搜索你感兴趣的内容" />
            </div>
            <button class="search-btn">搜索</button>
        </div>
        <div class="user">
            <div v-for="option in headerOptionList" :key="option.id" class="userOption"
                @click="onUserOptionClick(option)">
                <span :class="`iconfont userIcon ${option.icon}`"></span>
                <div class="userTitle">{{ option.title }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useHeaderOptionStore } from '../stores/headeroption'
import { useModalStore } from '@/stores/module'

const headerOptionStore = useHeaderOptionStore()
const headerOptionList = headerOptionStore.headerOptionList

const modalStore = useModalStore()

function onUserOptionClick(option: { id: number; title: string; icon: string }) {
    if (option.title === '登录' || option.id === 7) {
        modalStore.modeloption = '1'
        console.log('open login modal ->', modalStore.modeloption)
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #161823;
    color: #929398;
    height: 64px;
    box-sizing: border-box;
}

.search {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-box {
    position: relative;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9aa0a6;
    pointer-events: none;
}

.search-input {
    width: 300px;
    max-width: 40vw;
    background: #232430;
    color: #fff;
    padding: 8px 12px 8px 36px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.03);
    outline: none;
    transition: width 200ms ease;
}

.search-input:focus {
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.6);
}

.search-btn {
    background: linear-gradient(180deg, #3b82f6, #2b66d6);
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(43, 102, 214, 0.12);
    white-space: nowrap;
    transition: transform 120ms ease, box-shadow 120ms ease;
}

.search-btn:active {
    transform: translateY(1px);
}

.user {
    display: flex;
    gap: 2px;
    align-items: center;
    margin-left: auto;
}

.userOption {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 2px 0px;
    border-radius: 8px;
    color: #bfbfc4;
    cursor: pointer;
    min-width: 44px;
    transition: background 160ms ease, color 160ms ease, transform 120ms ease;
}

.userOption:hover {
    background: rgba(255, 255, 255, 0.03);
    color: #fff;
    transform: translateY(-2px);
}

.userIcon {
    font-size: 16px;
}

.userTitle {
    font-size: 8px;
    white-space: nowrap;
}

/* Responsive: hide titles on small screens to save space */
@media (max-width: 600px) {
    .search-input {
        width: 160px;
        max-width: 50vw;
    }

    .userTitle {
        display: none;
    }

    .userIcon {
        font-size: 20px;
    }
}
</style>

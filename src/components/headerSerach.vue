<template>
    <div class="header">
        <div class="search">
            <div class="search-box">
                <input class="search-input" type="text" placeholder="搜索你感兴趣的内容" />
            </div>
            <button class="search-btn">搜索</button>
        </div>
        <div class="user">
            <div class="userOption">充钻石</div>
            <div class="userOption">客户端</div>
            <div class="userOption">壁纸</div>
            <div class="userOption">通知</div>
            <div class="userOption">私信</div>
            <div class="userOption">投稿</div>
            <div class="userOption">设置</div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 纯展示组件，无额外逻辑
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
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
    width: 420px;
    max-width: 60vw;
    background: #232430;
    color: #fff;
    padding: 8px 12px 8px 36px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.03);
    outline: none;
}
.search-input:focus {
    box-shadow: 0 6px 20px rgba(59,130,246,0.12);
    border-color: rgba(59,130,246,0.6);
}
.search-btn {
    background: linear-gradient(180deg,#3b82f6,#2b66d6);
    color: #fff;
    border: none;
    padding: 8px 14px;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(43,102,214,0.12);
}
.user {
    display: flex;
    align-items: center;
    gap: 10px;
}
.userOption {
    padding: 6px 10px;
    border-radius: 8px;
    color: #bfbfc4;
    cursor: pointer;
    white-space: nowrap;
}
.userOption:hover {
    background: rgba(255,255,255,0.03);
    color: #fff;
}
.user .userOption { margin: 0 6px; }
</style>

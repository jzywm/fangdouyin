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
            <div class="userOption">
                <div class="login-container">
                    <div class="login" @click="onUserOptionClick({ id: 7, title: '登录', icon: 'icon-denglu' })"
                        @mouseenter="validatetoken">
                        <el-avatar :size="28" :src="user.avatar.value" fit="cover">

                        </el-avatar>
                        <div class="loginText" v-if="user.islodin.value === false">
                            <p class="loginTextp">登录/注册</p>
                        </div>
                        <div class="useravatar" v-else>
                            <p>{{ user.username }}</p>
                        </div>
                    </div>
                    <div class="my">
                        <div class="about-my">
                            <div class="avatar" @click="inputAvatar">
                                <el-Avatar :size="50" @click="triggerAvatarUpload" :src="user.avatar.value" fit="cover">
                                </el-Avatar>
                                <input v-if="user.avatar.value == ''" type="file" ref="avatarInputRef"
                                    style="display: none" @change="handleAvatarSelect">
                            </div>
                            <div class="about-detail-my">
                                <div class="name">
                                    <p class="about-detail-name">{{ user.username || '未登录' }}</p>
                                </div>
                                <div class="love" v-if="user.username">
                                    <p class="about-detail-love">关注 {{ user.guanzhunum || '233' }}</p>
                                    <p class="about-detail-fensi">粉丝 {{ user.fensinum || '105' }}</p>
                                </div>
                                <div class="love" v-if="!user.username">未登录</div>
                            </div>
                        </div>
                        <div class="more-about-my">
                            <div class="more-item my-like">
                                <div class="item-left">
                                    <span class="iconfont icon-aixin" color="#fe2c55"></span>
                                    <p class="item-text">我的喜欢</p>
                                </div>
                                <div class="item-right">
                                    <p class="number">3127</p>
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-collect">
                                <div class="item-left">
                                    <span class="iconfont icon-shoucang-yishoucang"></span>
                                    <p class="item-text">我的收藏</p>
                                </div>
                                <div class="item-right">
                                    <p class="number">114</p>
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-history">
                                <div class="item-left">
                                    <span class="iconfont icon-guankanlishi"></span>
                                    <p class="item-text">观看历史</p>
                                </div>
                                <div class="item-right">
                                    <p class="number">30天内</p>
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-later">
                                <div class="item-left">
                                    <span class="iconfont icon-shaohouzaikan-personal"></span>
                                    <p class="item-text">稍后再看</p>
                                </div>
                                <div class="item-right">
                                    <p class="number">1</p>
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-works">
                                <div class="item-left">
                                    <span class="iconfont icon-wodezuopin"></span>
                                    <p class="item-text">我的作品</p>
                                </div>
                                <div class="item-right">
                                    <p class="number">0</p>
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-subscribe">
                                <div class="item-left">
                                    <span class="iconfont icon-tongzhi"></span>
                                    <p class="item-text">我的预约</p>
                                </div>
                                <div class="item-right">
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                            <div class="more-item my-order">
                                <div class="item-left">
                                    <span class="iconfont icon-tougao"></span>
                                    <p class="item-text">我的订单</p>
                                </div>
                                <div class="item-right">
                                    <el-icon>
                                        <ArrowRightBold color="#787980" />
                                    </el-icon>
                                </div>
                            </div>
                        </div>
                        <div class="logout-section">
                            <div class="logout">
                                <span class="iconfont icon-tuichu"></span>
                                <p class="logout-text">退出登录</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue'
import { useHeaderOptionStore } from '../stores/headeroption'
import { useModalStore } from '@/stores/module'
import { useUserStore } from '@/stores/user'
import uploadAvatar from '@/hooks/upLoadAvatar'
import { useLoginstore } from '@/stores/login'
import { storeToRefs } from 'pinia'

interface ApiResponse {
    code: number;      // 状态码，例如 200, 404, 500
    message: string;   // 返回的消息，例如 "成功", "用户不存在"
    data: {
        _id: string;
        username: string;
        tel: string;
        Image: string;
        createAT: string;
        updateAT: string;
        __v: number;
        avatarImage: string;
        code: string;
        codeExpiresAt: string;
        iat: number;
        exp: number;
    }
}

const headerOptionStore = useHeaderOptionStore()
const headerOptionList = headerOptionStore.headerOptionList
const user = storeToRefs(useUserStore())
const modalStore = useModalStore()
const verifylodin = useLoginstore().verifylodin

function onUserOptionClick(option: { id: number; title: string; icon: string }) {
    if (option.title === '登录' || option.id === 7) {
        if (user.islodin.value === false) {
            modalStore.modeloption = '1'
        }
    }
}
let time: number = 0

async function validatetoken() {
    if (time == 0) {
        const token: string | null = localStorage.getItem('usertoken')
        if (token === null) {
            return false
        }
        if (token && token.trim() !== '') {
            const data = await verifylodin(token)
            if (data && typeof data === 'object' && 'code' in data && data.code === 400) {
                user.islodin.value = false,
                    user.userid.value = ''
                user.username.value = '假装有网名'
                user.avatar.value = ''
                console.log("sadasofjaofafawd")
            } if (data && typeof data === 'object' && 'code' in data && data.code === 200) {
                console.log(data)
                user.islodin.value = true,
                user.userid.value = (data as ApiResponse).data._id
                user.username.value = (data as ApiResponse).data.username
                user.avatar.value = (data as ApiResponse).data.avatarImage
                console.log(user.avatar.value)
            }
        }
        time = setTimeout(async () => {
            time = 0
        }, 3600000);
    }
}

function inputAvatar() {
    // 当用户未登录时，点击头像触发登录
    console.log(123);

    if (!user.token) {
        modalStore.modeloption = '1'
        console.log(123456)
    }
}

// 触发头像上传
function triggerAvatarUpload() {
    // 当用户已登录且avatar为空时，触发文件选择
    if (user.token && user.avatar.value === '') {
        avatarInputRef.value?.click()
    }
}

// 处理头像选择
function handleAvatarSelect(event: Event) {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    console.log(123456789)
    if (file) {
        // 这里可以添加上传逻辑
        console.log('选择的文件:', file)
        // 调用上传函数
        uploadAvatar(file)
    }
}

onBeforeMount(async () => {
    const token: string | null = localStorage.getItem('usertoken')
    if (token === null) {
        return false
    }
    if (token && token.trim() !== '') {
        const response  = await verifylodin(token)
        const data = response.data
        console.log(data)
        if (data && typeof data === 'object' && 'code' in data && data.code === 400) {
            user.islodin.value = false,
                user.userid.value = ''
            user.username.value = '假装有网名'
            user.avatar.value = ''
            console.log("jairuihang")
        } if (data && typeof data === 'object' && 'code' in data && data.code === 200) {
            user.islodin.value = true,
                user.userid.value = (data as ApiResponse).data._id
            user.username.value = (data as ApiResponse).data.username
            user.avatar.value = (data as ApiResponse).data.avatarImage
            console.log("jairuihangdedouyin")
        }
    }
})

onUnmounted(() => {
    // 组件卸载后的清理逻辑
    if (time !== null)
        clearInterval(time);
})
const avatarInputRef = ref<HTMLInputElement | null>(null)
</script>

<style scoped>
.header {
    width: 100%;
    height: 56px;
    background: #161823;
    border-bottom: 1px solid #2c2e38;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 100;
}

.search {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    max-width: 600px;
    margin: 0 20px;
}

.search-box {
    flex: 1;
    display: flex;
    align-items: center;
    background: #2c2e38;
    border-radius: 18px;
    padding: 0 16px;
    height: 36px;
}

.search-icon {
    color: #999;
    font-size: 14px;
    margin-right: 8px;
}

.search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 14px;
}

.search-input::placeholder {
    color: #999;
}

.search-btn {
    padding: 8px 16px;
    background: #ff0050;
    color: #fff;
    border: none;
    border-radius: 16px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.search-btn:hover {
    background: #ff1a60;
    transform: translateY(-1px);
}

.user {
    display: flex;
    align-items: center;
    gap: 16px;
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

.userOption:last-child {
    box-sizing: border-box;
    width: 120px;
}

.login-container {
    position: relative;
    width: 100%;
    padding-bottom: 8px;
    z-index: 1000;
}

.login-container:hover .my {
    display: flex;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.my:hover {
    display: flex;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.userOption .login {
    display: flex;
    flex-direction: row;
    padding: auto;
    width: 100%;
    height: 48px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background-color: #d21b46;
    margin-left: 6px;
    border-radius: 12px;
    color: #ffe9ed;
    cursor: pointer;
}

.my {
    position: absolute;
    top: 50px;
    right: 0;
    padding: 18px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;
    background-color: #252632;
    border-radius: 16px;
    width: 270px;
    height: 500px;
    z-index: 999999;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    margin-top: 4px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
}

.about-my {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 999;
}

.about-detail-my {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
}

.about-detail-name {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.love {
    display: flex;
    gap: 16px;
}

.about-detail-love,
.about-detail-fensi {
    font-size: 12px;
    color: #999;
    margin: 0;
}

.more-about-my {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    z-index: 999999;
}

.more-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #33343f;
    cursor: pointer;
    transition: background 160ms ease;
    border-radius: 12px;
    padding: 10px 10px;
}

.more-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.item-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.item-left .iconfont {
    font-size: 16px;
    color: #fff;
    width: 20px;
    text-align: center;
}

.item-text {
    font-size: 14px;
    color: #fff;
    margin: 0;
}

.item-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.number {
    font-size: 12px;
    color: #999;
    margin: 0;
}

.item-right .iconfont {
    font-size: 12px;
    color: #999;
}

.logout-section {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.logout {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 8px;
    transition: background 160ms ease;
}

.logout:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.logout .iconfont {
    font-size: 16px;
    color: #ff4757;
    width: 20px;
    text-align: center;
}

.logout-text {
    font-size: 14px;
    color: #ff4757;
    margin: 0;
}
</style>
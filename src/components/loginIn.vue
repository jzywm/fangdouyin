<template>
    <div v-if="modeloption === '1'" class="modal-overlay" @click.self="closeModal">
        <div class="login" role="dialog" aria-modal="true">
            <div class="header">
                <div class="logo">
                    <span class="iconfont icon-douyin"></span>
                </div>
                <div class="title">
                    <h2>登录后免费畅享高清视频</h2>
                </div>
                <div class="cancle" @click="closeModal">
                    <el-icon color="#b9b9bd">
                        <Close />
                    </el-icon>
                </div>
            </div>
            <main class="login-fangfa">
                <div class="login-fangfa-left">
                    <div class="login-fangfa-left-header">
                        <h3>扫码登录</h3>
                    </div>
                    <div class="login-fangfa-left-content">
                        <div class="qrcode-placeholder">
                            <el-icon size="64">
                                <Camera />
                            </el-icon>
                            <p>扫码登录</p>
                        </div>
                    </div>
                    <div class="content">
                        <p>打开 <span class="gaoliang">抖音APP</span> 点击左上角<el-icon>
                                <Expand />
                            </el-icon> 扫一扫</p>
                    </div>
                    <div class="footer">
                        <el-button type="text" round="true" link="true">如何扫码
                        </el-button>
                    </div>
                </div>
                <div class="middle">

                </div>
                <div class="login-fangfa-right">
                    <div class="login-fangfa-right-header">
                        <button class="login-fangfa-right-header-left" :class="{ active: method === 'code' }"
                            @click="method = 'code'">验证码登录</button>
                        <button class="login-fangfa-right-header-right" :class="{ active: method === 'password' }"
                            @click="method = 'password'">密码登录</button>
                    </div>
                    <form v-if="method === 'code'" action="">
                        <input type="tel" placeholder="请输入手机号" v-model="phone1" class="inputtel" />
                        <div class="get">
                            <input type="password" placeholder="请输入验证码" v-model="code" class="inputpwd" />
                            <button type="button" class="get-code-btn" @click="getCode('your_api_url_here', phone1)">{{
                                second === totalSecond ? "获取验证码" :
                                loginIn.second + "后获取" }}</button>
                        </div>
                        <button type="button" class="login-btn" :disabled="!code || !phone1"
                            @click="verifyCode(code)">登录</button>
                    </form>
                    <form v-if="method === 'password'" action="123">
                        <input type="tel" placeholder="请输入手机号" v-model="phone2" class="inputtel" />
                        <input type="password" placeholder="请输入密码" v-model="password" class="inputpwd" />
                        <button type="button" class="login-btn" :disabled="!phone2 || !password"
                            @click="verifyPassword(Number(phone2), password)">登录</button>
                    </form>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup name="LoginIn">
import { useModalStore } from '@/stores/module';
import { ref } from 'vue';
import { useLoginstore } from '@/stores/login';
import { storeToRefs } from 'pinia';
import { Close, Expand, Camera } from '@element-plus/icons-vue';

const modalStore = useModalStore();
const { modeloption } = storeToRefs(modalStore);

function closeModal() {
    modalStore.modeloption = '0';
}

const phone1 = ref('');
const phone2 = ref('')
const code = ref('');
const method = ref('code');
const password = ref('');

const loginIn = useLoginstore();
const { getCode, verifyCode, verifyPassword } = loginIn;
const { second, totalSecond } = storeToRefs(loginIn);

</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px) brightness(0.6);
    z-index: 1200;
    padding: 24px;
}

.login {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    width: 620px;
    max-width: 100%;
    background: #fdfdfd;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    color: #222;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.logo .iconfont {
    font-size: 36px;
    color: #111111;
}

.title h2 {
    margin: 0;
    font-size: 18px;
    color: #111;
}

.cancle {
    cursor: pointer;
}

.login-fangfa {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 20px;
    align-items: start;
    margin-top: 16px;
}

.login-fangfa .login-fangfa-left,
.login-fangfa .login-fangfa-right {
    display: flex;
    background: #f5f5f5;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: transparent;
}

.gaoliang {
    color: #fe7b95;
    font-weight: 500;
}

.qrcode-placeholder {
    width: 180px;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f8f8f9;
}

.qrcode-placeholder p {
    margin-top: 12px;
    font-size: 14px;
    color: #666;
}

.login-fangfa .middle {
    width: 1px;
    background: #eee;
    height: 320px;
    margin: 0 12px;
}

.login-fangfa-right-header-left,
.login-fangfa-right-header-right {
    background-color: #ffffff;
    border: none;
    color: #b0b0b4;
    padding: 10px 18px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 2px 0px;
    cursor: pointer;
    border-radius: 12px;
}

.active {
    background-color: #2c2e38;
    border: none;
    color: #ffffff;
    padding: 10px 18px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 2px 0px;
    border-radius: 12px;
}

.inputtel,
.inputpwd {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
    outline: none;
    background-color: #f8f8f9;
    margin: 5px 0 20px;
}

.get {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #f8f8f9;

}

.get-code-btn {
    background-color: #f8f8f9;
    border: 1px solid #ddd;
    padding: 8px 16px;
    margin: 5px 0;
    border-radius: 14px;
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    color: #666;
    transition: all 0.3s ease;
}

.get-code-btn:hover {
    background-color: #f0f0f0;
}

.countdown {
    background-color: #f8f8f9;
    border: 1px solid #ddd;
    padding: 8px 16px;
    margin: 5px 0;
    border-radius: 14px;
    white-space: nowrap;
    font-size: 12px;
    color: #999;
    text-align: center;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.login-btn {
    width: 100%;
    padding: 12px;
    border-radius: 24px;
    background: linear-gradient(135deg, #ff0050, #ff6a85);
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(255, 0, 80, 0.3);
    margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 0, 80, 0.4);
    background: linear-gradient(135deg, #ff1a60, #ff7a95);
}

.login-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(255, 0, 80, 0.3);
}

.login-btn:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
}

.login-btn:hover:not(:disabled)::before {
    left: 100%;
}

@media (max-width: 900px) {
    .login {
        width: 720px;
    }

    .login-fangfa {
        grid-template-columns: 1fr 1px 1fr;
    }
}

@media (max-width: 640px) {
    .login {
        width: 100%;
        padding: 16px;
    }

    .login-fangfa {
        grid-template-columns: 1fr;
    }

    .login-fangfa .middle {
        display: none;
    }
}
</style>

<template>
<div class="login" v-if="isMoudalOpen === '1'">
    <div class="header">
        <div class="logo">
            <img src="../assets/logo.png" alt="logo">
        </div>
        <div class="title">
            <h2>登录后免费畅享高清视频</h2>
        </div>
        <div class="cancle">
            <el-icon color="#b9b9bd" ><Close /></el-icon>
        </div>
    </div>
    <main class="login-fangfa">
        <div class="login-fangfa-left">
            <div class="login-fangfa-left-header">
                <h3>扫码登录</h3>
            </div>
            <div class="login-fangfa-left-content">
                <img src="../assets/erweima.png" alt="erweima">
            </div>
            <div class="content">
                <p>打开 <span>抖音APP</span> 点击左上角<el-icon><Expand /></el-icon> 扫一扫</p>
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
                <span class="login-fangfa-right-header-left" @click="method = 'code'">
                    <h3>验证码登录</h3>
                </span>
                <span class="login-fangfa-right-header-right" @click="method = 'password'">
                    <h3>密码登录</h3>
                </span>
            </div>
            <form v-if="method === 'code'" action="">
                <el-input
                  class="inputtel"
                  placeholder="请输入手机号"
                  v-model="phone"
                />
                <div class="get">
                    <el-input placeholder="请输入验证码" v-model="code" />
                    <el-button type="primary" @click="getCode('your_api_url_here', phone)">获取验证码</el-button>
                </div>
                <button class="login-btn" :disabled="!code" @click="verifyCode(code)">登录</button>
            </form>
            <form v-if="method === 'password'" action="123">
                <el-input
                  class="inputtel"
                  placeholder="请输入手机号"
                  v-model="phone"
                />
                <el-input
                  class="inputpwd"
                  placeholder="请输入密码"
                  type="password"
                  v-model="password"
                />
                <button class="login-btn" :disabled="!phone" @click="verifypassword(Number(phone), password)">登录</button>
            </form>
        </div>
    </main>
</div>
</template>

<script lang="ts" setup name="LoginIn">
import { useModalStore } from '@/stores/Modal';
import { ref } from 'vue';
import { useLoginstore } from '@/stores/login';

const phone = ref('');
const code = ref('');
const method =ref('code'); // 'code' 或 'password'
const password = ref('');

const modalStore = useModalStore();
const isMoudalOpen = modalStore.modeloption;

const loginIn = useLoginstore();
const getCode = loginIn.getCode;
const verifyCode = loginIn.verifyCode;
const verifypassword = loginIn.verifyPassword;

// const wangzhi = 'your_api_url_here';

</script>

<style scoped>

</style>
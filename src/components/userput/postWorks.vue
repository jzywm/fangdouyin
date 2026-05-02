<template>
    <div class="vedio" v-if="modeloption === '2'">
        <div class="filter" @click="closeModal"></div>
        <div class="postvideo" @click.stop>
            <div class="title">
                <h3>上传作品</h3>
                <button class="close-btn" @click="closeModal"></button>
            </div>
            <div class="detail">
                <div class="left">
                    <div class="left_post">
                        <label class="upload-btn">
                            <input type="file" accept="video/*" id="videoInput" @change="handleFileSelect"
                                ref="fileInput">
                            <div class="upload-icon">+</div>
                            <span>选择视频</span>
                        </label>
                    </div>
                    <video ref="videoPlayer" style="display:none;" playsinline webkit-playsinline></video>
                    <div v-if="showyulan" class="yulan">
                        <div class="yulan-text">
                            <p>预览</p>
                        </div>
                    </div>
                    <div v-else class="progress-area">
                        <div class="left-works-view">
                            <img id="coverPreview" src="" alt="视频封面预览" ref="coverPreview" />
                            <canvas id="coverCanvas" ref="canvas"></canvas>
                        </div>
                        <p class="progress-text">上传进度：{{ uploadProgress }}%</p>
                        <div class="progress-bar">
                            <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="form-label">标题</label>
                        <input type="text" class="form-input" placeholder="请输入视频的标题" v-model="title">
                    </div>
                    <div class="form-group">
                        <label class="form-label">视频描述</label>
                        <textarea class="form-textarea" placeholder="请描述一下视频的主要内容" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">标签</label>
                        <el-select v-model="tagvalue" class="form-select">
                            <el-option v-for="item in tags" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="cancel-btn" @click="closeModal">取消</button>
                <button class="submit-btn" @click="submitForm" :disabled="uploadProgress < 100">
                    {{ uploadProgress < 100 ? '上传中...' : '发布' }} </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup name="postWorks">
import { useModalStore } from '@/stores/module';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { upLoadVideo } from '@/hooks/upLoadVideo';


const modalStore = useModalStore();
const { modeloption } = storeToRefs(modalStore);

const fileInput = ref<HTMLInputElement | null>(null);
const title = ref('');
const description = ref('');
const videoPreview = ref('');
const uploadProgress = ref(0);
const showyulan = ref(true)

const tags = [
    { label: '公开课', value: 2 },
    { label: '游戏', value: 3 },
    { label: '二次元', value: 4 },
    { label: '音乐', value: 5 },
    { label: '影视', value: 6 },
    { label: '美食', value: 7 },
    { label: '知识', value: 8 },
    { label: '小剧场', value: 9 },
    { label: '生活vlog', value: 10 },
    { label: '体育', value: 11 },
    { label: '旅行', value: 12 },
    { label: '亲子', value: 13 },
    { label: '动物', value: 14 },
    { label: '三农', value: 15 },
    { label: '汽车', value: 16 },
    { label: '美妆', value: 17 }
];
const tagvalue = ref(2);
const videoPlayer = ref<HTMLVideoElement | null>(null)
const coverPreview = ref<HTMLImageElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const coverFile = ref<File | null>(null)
const videoFile = ref<File | null>(null)
const longer:any = ref(null) 
console.log(canvas.value);

const dataURLToFile = (dataUrl: string, fileName: string): File => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};

const handleFileSelect = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files === null) return
    showyulan.value = false
    const file = target.files[0];
    if (!file) return;
    const videoUrl = URL.createObjectURL(file);
    if (videoPlayer.value === null) return
    videoPlayer.value.src = videoUrl;
    console.log(canvas.value);
    videoPlayer.value.onloadedmetadata = () => {
        if (videoPlayer.value === null) return
        longer.value = videoPlayer.value.duration;
        const randomTime = Math.random() * videoPlayer.value.duration;
        videoPlayer.value.currentTime = randomTime
    }

    videoPlayer.value.onseeked = () => {
        // 设置 canvas 尺寸与视频一致
        if (canvas.value === null) return
        ctx.value = canvas.value.getContext('2d')
        if (videoPlayer.value === null || canvas.value === null || coverPreview.value === null || ctx.value === null) return
        canvas.value.width = videoPlayer.value.videoWidth;
        canvas.value.height = videoPlayer.value.videoHeight;
        // 将视频当前帧绘制到 canvas
        ctx.value.drawImage(videoPlayer.value, 0, 0, canvas.value.width, canvas.value.height);

        // 将 canvas 转为图片 URL（默认格式为 png）
        const coverUrl = canvas.value.toDataURL('image/png');
        // 展示封面预览
        const coverDataUrl = canvas.value.toDataURL('image/png');

        // 2. 生成文件名，例如：my_video_cover.png
        const originalFileName = file.name.replace(/\.[^/.]+$/, "");
        const coverFileName = `${originalFileName}_cover.png`;

        // 3. 将 DataURL 转换为 File 对象
        coverFile.value = dataURLToFile(coverDataUrl, coverFileName);
        videoFile.value = file
        simulateUpload(coverFile.value, videoFile.value)
        coverPreview.value.src = coverUrl;
        URL.revokeObjectURL(videoUrl);
    };
}

// 模拟上传进度
const simulateUpload = (cover: File, video: File) => {
    console.log(cover, video)
    uploadProgress.value = 0;
    const interval = setInterval(() => {
        uploadProgress.value += 5;
        if (uploadProgress.value >= 100) {
            clearInterval(interval);
        }
    }, 200);
};

// 关闭模态框
const closeModal = () => {
    modeloption.value = '0';
    // 重置表单
    resetForm();
};

// 重置表单
const resetForm = () => {
    title.value = '';
    description.value = '';
    videoPreview.value = '';
    uploadProgress.value = 0;
    showyulan.value = true;
    tagvalue.value = 2;
    videoPlayer.value = null
    coverPreview.value === null
    ctx.value === null
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

// 提交表单
const submitForm = () => {
    if (!title.value) {
        ElMessage.error('请输入视频标题');
        return;
    }
    if (!description.value) {
        ElMessage.error('请输入视频描述');
        return;
    }
    if (uploadProgress.value < 100) {
        ElMessage.error('视频上传尚未完成');
        return;
    }
    const form = {
        title: title.value,
        tag: tagvalue.value,
        description: description.value,
        video: videoFile.value,
        cover: coverFile.value,
        longer: longer.value,
    }
    console.log(form.longer)
    console.log(typeof(form.longer))
    upLoadVideo(form)
    // 这里可以添加表单提交逻辑
    ElMessage.success('发布成功！');
    closeModal();
};
</script>
<!-- <script lang="ts" setup name="postWorks">
import { useModalStore } from '@/stores/module';
import { storeToRefs } from 'pinia';
import { ref, nextTick } from 'vue'; // 确保引入 nextTick
import { ElMessage } from 'element-plus';

const modalStore = useModalStore();
const { modeloption } = storeToRefs(modalStore);

const fileInput = ref<HTMLInputElement | null>(null);
const title = ref('');
const description = ref('');
const uploadProgress = ref(0);
const showyulan = ref(true); // 初始为 true，显示上传按钮

// --- Refs ---
const videoPlayer = ref<HTMLVideoElement | null>(null);
const coverPreview = ref<HTMLImageElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null); // 唯一的 canvas ref
const ctx = ref<CanvasRenderingContext2D | null>(null);

const tags = [
    { label: '公开课', value: 2 },
    // ... 其他标签
];
const tagvalue = ref(2);

// 模拟上传
const simulateUpload = () => {
    uploadProgress.value = 0;
    const interval = setInterval(() => {
        uploadProgress.value += 5;
        if (uploadProgress.value >= 100) clearInterval(interval);
    }, 200);
};

const handleFileSelect = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    if (!file) return;

    // 1. 启动上传动画
    simulateUpload();

    // 2. 切换视图：隐藏上传按钮，显示进度条/Canvas
    showyulan.value = false;

    // 3. 等待 DOM 更新，确保 <canvas> 已经被渲染出来
    await nextTick();

    const videoUrl = URL.createObjectURL(file);

    if (!videoPlayer.value) return;
    videoPlayer.value.src = videoUrl;

    videoPlayer.value.onloadedmetadata = () => {
        if (!videoPlayer.value) return;
        // 随机截取时间点
        const randomTime = Math.random() * videoPlayer.value.duration;
        videoPlayer.value.currentTime = randomTime;
    };

    videoPlayer.value.onseeked = () => {
        // --- 关键修复：这里使用的是外部的 canvas ref，而不是内部新建的 ---
        if (!canvas.value || !videoPlayer.value || !coverPreview.value) return;

        console.log('Canvas 元素已获取:', canvas.value);

        // 获取上下文
        ctx.value = canvas.value.getContext('2d');
        if (!ctx.value) return;

        // 设置画布尺寸
        canvas.value.width = videoPlayer.value.videoWidth;
        canvas.value.height = videoPlayer.value.videoHeight;

        // 绘制图像
        ctx.value.drawImage(videoPlayer.value, 0, 0, canvas.value.width, canvas.value.height);

        // 转为图片链接
        const coverUrl = canvas.value.toDataURL('image/png');
        coverPreview.value.src = coverUrl;

        // 释放内存
        URL.revokeObjectURL(videoUrl);
    };
};

const closeModal = () => {
    modeloption.value = '0';
    resetForm();
};

const resetForm = () => {
    title.value = '';
    description.value = '';
    uploadProgress.value = 0;
    showyulan.value = true; // 重置回初始状态
    tagvalue.value = 2;

    // 清理 Refs
    if (videoPlayer.value) videoPlayer.value.src = '';
    if (coverPreview.value) coverPreview.value.src = '';
    if (fileInput.value) fileInput.value.value = '';
};

const submitForm = () => {
    if (!title.value) return ElMessage.error('请输入标题');
    if (!description.value) return ElMessage.error('请输入描述');
    ElMessage.success('发布成功！');
    closeModal();
}; -->
<!-- </script> -->
<style scoped>
.vedio {
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

.postvideo {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 30px;
    width: 800px;
    max-width: 100%;
    background: #fdfdfd;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    color: #222;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.title h3 {
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    color: #333;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    transition: color 0.2s ease;
}

.close-btn:hover {
    color: #333;
}

.detail {
    display: flex;
    flex-direction: row;
    gap: 40px;
    margin-bottom: 30px;
}

@media (max-width: 768px) {
    .detail {
        flex-direction: column;
        align-items: center;
    }
}

.left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    min-width: 200px;
}

.upload-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #fafafa;
}

.upload-btn:hover {
    border-color: #1677ff;
    background-color: #f0f7ff;
}

.upload-icon {
    font-size: 40px;
    color: #999;
    margin-bottom: 10px;
}

.upload-btn span {
    font-size: 14px;
    color: #666;
}

.upload-btn input[type="file"] {
    display: none;
}

.yulan {
    display: flex;
    width: 200px;
    height: 150px;
    align-items: center;
    justify-content: center;
    border: 2px dashed #ddd;
    border-radius: 8px;
    background-color: #fafafa;
}

.yulan-text {
    text-align: center;
}

.yulan-text p {
    font-size: 18px;
    font-weight: 600;
    color: #999;
    margin: 0;
}

.progress-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 200px;
}

.left-works-view {
    width: 200px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ddd;
}

.left-works-view img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.progress-text {
    font-size: 14px;
    color: #666;
    margin: 0;
}

.progress-bar {
    width: 100%;
    height: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background-color: #1677ff;
    border-radius: 4px;
    transition: width 0.3s ease;
}

.right {
    flex: 2;
    min-width: 300px;
}

.form-group {
    margin-bottom: 24px;
}

.form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
}

.form-input,
.form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    font-size: 14px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
    outline: none;
    border-color: #1677ff;
    box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
}

.form-textarea {
    resize: vertical;
    min-height: 100px;
}

.form-select {
    width: 100%;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;
}

.cancel-btn,
.submit-btn {
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid #d9d9d9;
}

.cancel-btn {
    background-color: #fff;
    color: #666;
}

.cancel-btn:hover {
    border-color: #1677ff;
    color: #1677ff;
}

.submit-btn {
    background-color: #1677ff;
    color: #fff;
    border-color: #1677ff;
}

.submit-btn:hover:not(:disabled) {
    background-color: #409eff;
    border-color: #409eff;
}

.submit-btn:disabled {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
    cursor: not-allowed;
    color: #fff;
}
</style>

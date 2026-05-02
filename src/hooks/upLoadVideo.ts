import { getPolicy } from '@/api/getpolicy'
import { postFile } from '@/api/postfile';
import { postVideo } from '@/api/postVideo'
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';
import { useMainVideoStore } from '@/stores/mainvedio'

interface data {
    host: string;
    policy: string;
    x_oss_signature_version: string;
    x_oss_credential: string;
    x_oss_date: string;
    signature: string;
    x_oss_signature: string;
    dir: string;
    security_token: string
    url: string
}
interface form {
    title: string;
    tag: number;
    description: string;
    videourl: string;
    coverurl: string;
    longer: number
}
interface req {
    title: string;
    tag: number;
    description: string;
    video: File;
    cover: File;
    longer: number
}

export const upLoadVideo = async (form: req) => {
    const user = storeToRefs(useUserStore())
    const videokey = uuidv4()
    const coverkey = uuidv4()

    const vedio = await getPolicy()
    const cover = await getPolicy()
    
    if ('data' in vedio && 'data' in cover) {
    // 只有在这里，TS 才知道它们都有 .data
    console.log(vedio)
    const vidiodata = vedio.data
    const coverdata = cover.data
    console.log(132131)
    const time = new Date().toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const videodir = `douyin/works/video/${time}/${videokey}`
    const coverdir = `douyin/works/cover/${time}/${coverkey}`
    const videoformData = new FormData();
    videoformData.append("success_action_status", "200");
    videoformData.append("policy", vidiodata.policy);
    videoformData.append("x-oss-signature", vidiodata.signature);
    videoformData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
    videoformData.append("x-oss-credential", vidiodata.x_oss_credential);
    videoformData.append("x-oss-date", vidiodata.x_oss_date);
    videoformData.append("key", videodir); // 文件名
    videoformData.append("x-oss-security-token", vidiodata.security_token);
    videoformData.append("file", form.video); // file 必须为最后一个表单
    console.log(form.video)
    const coverformData = new FormData();
    coverformData.append("success_action_status", "200");
    coverformData.append("policy", coverdata.policy);
    coverformData.append("x-oss-signature", coverdata.signature);
    coverformData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
    coverformData.append("x-oss-credential", coverdata.x_oss_credential);
    coverformData.append("x-oss-date", coverdata.x_oss_date);
    coverformData.append("key", coverdir); // 文件名
    coverformData.append("x-oss-security-token", coverdata.security_token);
    coverformData.append("file", form.cover); // file 必须为最后一个表单

    const videores = await postFile(vidiodata.host, videoformData)
    const coverres = await postFile(coverdata.host, coverformData)

    const videourl = `https://${vidiodata.url}/${videodir}`
    const coverurl = `https://${coverdata.url}/${coverdir}`

    const detail: form = {
        title: form.title,
        tag: form.tag,
        description: form.description,
        longer: form.longer,
        videourl: videourl,
        coverurl: coverurl
    }
    const content = await postVideo(detail)
    const mainVideoStore = useMainVideoStore()
    const { getactivedVideo } = mainVideoStore
    getactivedVideo(1,1,12)

    return content
}

}   
import { getPolicy } from '@/api/getpolicy'
import { postFile } from '@/api/postfile';
import { postAvatar } from '@/api/postAvatar'
import { v4 as uuidv4 } from 'uuid';
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia';


interface data {   
    host: string;
    policy: string;
    x_oss_signature_version: string;
    x_oss_credential:string;
    x_oss_date:string;
    signature:string;
    x_oss_signature:string;
    dir:string;
    security_token:string
    url:string
}
const uploadAvatar = async (filedata: File) => {
    const user = storeToRefs(useUserStore())
    const key = uuidv4()
    const { data } = await getPolicy( ) 
    console.log(123)
    const time =  new Date().toLocaleString('zh-CN', { 
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});
    const dir = `douyin/avatar/${time}/${key}`
    const formData = new FormData();
        formData.append("success_action_status", "200");
        formData.append("policy", data.policy);
        formData.append("x-oss-signature", data.signature);
        formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        formData.append("x-oss-credential", data.x_oss_credential);
        formData.append("x-oss-date", data.x_oss_date);
        formData.append("key", dir); // 文件名
        formData.append("x-oss-security-token", data.security_token);
        formData.append("file", filedata ); // file 必须为最后一个表单
    console.log(data)
    const res = await postFile(data.host,formData)
    const url = `https://${data.url}${dir}`
    const content = await postAvatar(url)
    user.avatar.value = content.data
    console.log(content)
    localStorage.setItem('usertoken',content.token)
    return content
}

export default uploadAvatar
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
    const { data } = await getPolicy('avatar') 
    console.log(123)
    const formData = new FormData();
        formData.append("success_action_status", "200");
        formData.append("policy", data.policy);
        formData.append("x-oss-signature", data.signature);
        formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        formData.append("x-oss-credential", data.x_oss_credential);
        formData.append("x-oss-date", data.x_oss_date);
        formData.append("key", data.dir + key); // 文件名
        formData.append("x-oss-security-token", data.security_token);
        formData.append("file", filedata ); // file 必须为最后一个表单
    console.log(data)
    const res = await postFile(data.host,formData)
    const url = `https://${data.url}${key}`
    const content = await postAvatar(url)
    console.log(content)
    user.avatar.value = content.data
    return content
}

export default uploadAvatar
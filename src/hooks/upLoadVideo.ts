import { getPolicy } from '@/api/getpolicy'
import { postFile } from '@/api/postfile';
import { postAvatar } from '@/api/postAvatar'
import { v4 as uuidv4 } from 'uuid';
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
export const uploadAvatar = async (file: File) => {
    const key = uuidv4()
    const data = await getPolicy('vedio') as data 
    const formData = new FormData();
        formData.append("success_action_status", "200");
        formData.append("policy", data.policy);
        formData.append("x-oss-signature", data.signature);
        formData.append("x-oss-signature-version", "OSS4-HMAC-SHA256");
        formData.append("x-oss-credential", data.x_oss_credential);
        formData.append("x-oss-date", data.x_oss_date);
        formData.append("key", data.dir + key); // 文件名
        formData.append("x-oss-security-token", data.security_token);
        formData.append("file", file); // file 必须为最后一个表单
    const res = await postFile(data.host,formData)
    const url = `https://${data.url}/key`
    const content = await postAvatar(url)
}

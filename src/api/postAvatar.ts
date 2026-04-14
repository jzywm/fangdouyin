import request from '@/utils/Interceptor'

export const postAvatar = async (avatarurl: string) => {
  const res = await request('/user/uploadAvatar', {
    method: 'post',
    data: {
      avatarurl,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("上传成功");
      alert("文件已上传");
      return response.data;  // 解析回调信息
    } else {
      console.log("上传失败", response);
      alert("上传失败，请稍后再试");
    }
  })
  return res;
}
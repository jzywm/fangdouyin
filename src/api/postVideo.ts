import request from '@/utils/Interceptor'

interface data {
  title: string;
  tag: number;
  description:string;
  videourl: string;
  coverurl:string;
  longer:number
}

export const postVideo = async (data:data) => {
  const res = await request('/video/postvideo', {
    method: 'post',
    data: {
      title : data.title,
      tags : data.tag,
      description : data.description,
      longer: data.longer,
      videourl : data.videourl,
      coverurl : data.coverurl
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
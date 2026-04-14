import axios from 'axios'

export const postFile = async (host :string, form: FormData) => {
  try {
        const res = await axios(host, {
            method: 'POST',
            data: form
        });
        console.log(res)
        return res;
    } catch (error) {
        console.error("Error sending code:", error);
        return { code: 500, message: "上传失败，请稍后重试" };
    }
  }


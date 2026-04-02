import axios from "axios";

export default async function postRegister(username: string, tel: string, password: string, code: string) {
  try {
    const response = await axios('/user/register', {
      method: 'post',
      data: {
        username: username,
        tel: tel,
        password: password,
        code: code,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    return { code: 500, message: "注册失败，请稍后重试" };
  }
}

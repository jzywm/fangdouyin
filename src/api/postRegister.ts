import axios from "axios";

export default async function postRegister(username: string, tel: string, password: string) {
  const data = await axios('/api/v1/user/register', {
    method: 'post',
    data: {
      username: username,
      tel: tel,
      password: password
    }
  }).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.error("Error registering:", error);
    return { code: 500, message: "注册失败，请稍后重试" };
  });
  return data;
}

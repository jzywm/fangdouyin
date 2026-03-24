import axios from "axios";

const verifyCode = (code: string) => {
  const codeRegex = /^\d{6}$/;
  if (codeRegex.test(code)) {
    throw new Error("验证码格式错误");
  } else {
    return axios.post(`/verifyCode`, { code })
      .then((res) => res.data);
  }
}

export default verifyCode
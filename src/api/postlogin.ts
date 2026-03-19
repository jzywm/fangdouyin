import axios from "axios";

const postLoginUrl = "https://example.com/api/login";

export default function postLogin(object: { username: string, password: string }) {
    return axios.post(postLoginUrl, object);
}
  
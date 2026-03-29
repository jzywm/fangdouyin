import axios from "axios";

export default async function postpassword(url: string, phone: string, password: string) {
    const data = await axios({
        method: 'post',
        url: url,
        responseType: 'object',
        data: {
            phone: phone,
            password: password
        }
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error("Error posting password:", error);
    });
    return data;
}
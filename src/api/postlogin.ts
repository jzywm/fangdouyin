import axios from "axios";


export default async function postCodelogin(tel: number, code: string) {
    const data = await axios.post('/login/code', {
        tel,
        code,
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error("Error logging in:", error);
    });

    return data;
}
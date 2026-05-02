import axios from "axios";

export default async function postpassword(tel: string, password: string) {
    try {
        const response = await axios({
            method: 'post',
            url: '/user/login/password',
            responseType: 'json',
            data: {
                tel,
                password
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error posting password:", error);
        throw error;
    }
}

import axios from "axios";

export default async function getCode(url: string, phone: string) {
    const data = await axios({
        method: 'post',
        url: '/getCode',
        responseType: 'stream',
        data: {
            phone: phone
        }
    }).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error("Error fetching code:", error);
    });
    return data;
}
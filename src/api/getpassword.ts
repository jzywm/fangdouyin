import axios from "axios";

export default async function getpassword(url: string, phone: number) {
    const data = await axios({
        method: 'post',
        url: 'url',
        responseType: 'stream',
        data: {
            phone: phone
        }
    }).then(function (response) {
        return  response.data;
    }).catch(function (error) {
        console.error("Error fetching code:", error);
    });
    return data;
}
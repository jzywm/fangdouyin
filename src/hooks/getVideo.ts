import axios from "axios";

const url = "";
axios.get(url)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error("Error fetching video data:", error);
        throw error;
    });
export default function getVideo(url: string) {
    return axios.get(url);
}
import axios from "axios";
interface VideoData {
    id: string,
    hostName: string,
    hostAvatar: string,
    hostId: number,
    hosttoken: string,
    title: string,
    videoUrl: string,
    coverUrl: string,
    loveCount: number,
    fensiCount: number,
    timer: string,
    longer: string,
    alt: string,
    commentCount: number,
}


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
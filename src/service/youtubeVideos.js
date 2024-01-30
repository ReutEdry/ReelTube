import axios from "axios";
import { YOUTUBE_API } from '@env'

export async function getVideos(searchKey = 'noakirel') {
    const youtubeApi = YOUTUBE_API
    // console.log(searchKey);
    // console.log('youtubeApi', youtubeApi);
    const youTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${youtubeApi}&q=${searchKey}`;


    try {
        console.log('getting in');
        const response = await axios.get(youTubeUrl);
        console.log('res:', response);
    } catch (error) {
        console.error(error);
        throw new error
    }
}
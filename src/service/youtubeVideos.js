import axios from "axios";
import { YOUTUBE_API } from '@env'
import { storageService } from "./asyncStorageService";

const STORAGE_KEY = 'videosDB'

export async function getVideos(searchKey) {
    // console.log('searchKey from service', searchKey);
    if (!searchKey) return []
    // const exisitngVideos = await storageService.get(STORAGE_KEY, searchKey)
    // console.log('exisitngVideos', exisitngVideos);
    // if (exisitngVideos.length) return exisitngVideos
    // const youTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API}&q=${searchKey}`;

    try {
        console.log('inside getVideos try ');
        const res = await axios.get(youTubeUrl);
        const data = res.data.items
        const videos = await Promise.all(data.map(item => getVideoInfo(item, searchKey)));
        return videos
    } catch (error) {
        console.error(error);
        throw new error
    }
}

async function getVideoInfo(item, searchKey) {
    const video =
    {
        // searchKey,
        id: item.id.videoId,
        channel: item.snippet.channelTitle,
        name: item.snippet.title,
        img: item.snippet.thumbnails.default.url
    }
    // const savedVideo = await storageService.post(STORAGE_KEY, video)
    // return savedVideo
    return video
}

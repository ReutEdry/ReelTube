import axios from "axios";
import { YOUTUBE_API } from '@env'
import { storageService } from "./asyncStorageService";

const STORAGE_KEY = 'videosDB'

export async function getVideos(searchKey) {
    if (!searchKey) return []

    // in this part I was trying to keep 
    const exisitngVideos = await storageService.get(STORAGE_KEY, searchKey)
    if (exisitngVideos.videos && exisitngVideos.videos.length) return exisitngVideos
    const youTubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API}&q=${searchKey}`;

    try {
        const res = await axios.get(youTubeUrl)
        const data = res.data.items
        const videos = data.map(item => getVideoInfo(item, searchKey))
        const savedVideos = { searchKey, videos: videos }
        await storageService.post(STORAGE_KEY, savedVideos)
        return savedVideos
    } catch (error) {
        console.error(error);
        throw new error
    }
}

function getVideoInfo(item) {
    return {
        id: item.id.videoId,
        channel: item.snippet.channelTitle,
        name: item.snippet.title,
        img: item.snippet.thumbnails.default.url,
        desc: item.snippet.description
    }
}
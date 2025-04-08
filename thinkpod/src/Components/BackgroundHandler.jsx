import React, { useState, useEffect, use } from 'react';

/**
 * A class that uses the Pixabay API to fetch all the videos that the website needs for background settings. 
 */
class BackgroundHandler{

    static API_KEY = "49493386-996644cb7f2c9f25700dce247";

    /**
     * 
     * @returns An array of URLs for AI Ambience videos fetched from the Pixabay API. 
     */
    async getAmbienceVideosAndThumbnail(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q="+encodeURIComponent('cozy ambience');
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
                return data.hits.map(hit=>[hit.videos.medium.url, hit.videos.small.thumbnail]);
        })
    }


    /**
     * 
     * @returns An array of URLs for AI Ambience videos fetched from the Pixabay API. 
     */
    async getSnowVideosAndThumbnail(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q=snow";
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
                return data.hits.map(hit=>[hit.videos.small.url, hit.videos.small.thumbnail]);
        })
    }

    /**
     * 
     * @returns An array of URLs for AI Ambience videos fetched from the Pixabay API. 
     */
    async getSpaceVideosAndThumbnail(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q=galaxy";
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
                return data.hits.map(hit=>[hit.videos.large.url, hit.videos.small.thumbnail]);
        })
    }

    /**
     * 
     * @returns An array of URLs for AI Ambience videos fetched from the Pixabay API. 
     */
    async getOceanVideosAndThumbnail(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q=ocean";
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
                return data.hits.map(hit=>[hit.videos.small.url, hit.videos.small.thumbnail]);
        })
    }

    async getAllThumnailAndVideos(){
        const cozy = await this.getAmbienceVideosAndThumbnail();
        const snow = await this.getSnowVideosAndThumbnail();
        const ocean = await this.getOceanVideosAndThumbnail();
        const space = await this.getSpaceVideosAndThumbnail();
        const combined = [...cozy, ...snow, ...ocean, ...space];
        return combined;
    }


}

const ChangeBackground = ({videoUrl})=>{
    console.log(videoUrl); 
    return(
        <div className="relative screen w-full h-screen overflow-hidden">
            {videoUrl && (
                <video
                className="fixed bottom-0 min-w-full min-h-full z-[-1]  "
                src={videoUrl}
                muted = {true}
                autoPlay= {true}
                loop = {true}>
                </video>)}
        </div>
    );

}



const BackgroundSelection = ({setBackgroundVideo})=>{
    const [videosAndThumbnail, setVideoAndThumbnail] = useState([]);

    useEffect(() => {
        const videoHandler = new BackgroundHandler();
        videoHandler.getAllThumnailAndVideos().then(setVideoAndThumbnail).catch(console.error);
      }, []);
    return(
        <div className="grid grid-cols-4 gap-5">
            {videosAndThumbnail.map(([videoUrl, thumbnailUrl], index) => (
                <img
                className="h-48 w-60 object-cover rounded-md hover:scale-95"
                key={index}
                src={thumbnailUrl}
                width={290}
                height={400}
                onClick={()=> setBackgroundVideo(videoUrl)}>
                </img>
            ))}
        </div>
    );
}

export { ChangeBackground, BackgroundSelection };


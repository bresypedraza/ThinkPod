import React, { useState, useEffect, use } from 'react';

/**
 * A class that uses the Pixabay API to fetch all the videos that the website needs for background settings. 
 */
export default class BackgroundHandler{

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
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q=winter";
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

    async getDefaultBackground(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&id=192283";
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
     * This is called the Fisher-Yates algorithm. It helps shuffle or randomized
     * an array.
     * @param {*} array 
     * @returns a shuffled array
     */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      }
      
    async getAllThumbnailAndVideos(){
        const ogBackground = await this.getDefaultBackground();
        const cozy = await this.getAmbienceVideosAndThumbnail();
        const snow = await this.getSnowVideosAndThumbnail();
        const ocean = await this.getOceanVideosAndThumbnail();
        const space = await this.getSpaceVideosAndThumbnail();
        const combined = [...cozy, ...snow, ...ocean, ...space];
        return [...ogBackground, ...this.shuffleArray(combined)];
    }


}

export const ChangeBackground = ({videoUrl})=>{
    return(
        <div className="relative  w-full h-screen overflow-hidden">
            {videoUrl && (
                <video
                className="fixed bottom-0 min-w-full min-h-full object-cover z-[-1]  "
                src={videoUrl}
                muted = {true}
                autoPlay= {true}
                loop = {true}>
                </video>)}
        </div>
    );

}



export const BackgroundSelection = ({setBackgroundVideo, vidOptions})=>{
    const [videosAndThumbnail, setVideoAndThumbnail] = useState([]);


    useEffect(() => {
        const videoHandler = new BackgroundHandler();

        switch(vidOptions){
            case "All":
                vidOptions = videoHandler.getAllThumbnailAndVideos();
                break;
            case "Snow":
                vidOptions= videoHandler.getSnowVideosAndThumbnail();
                break;
            case "Ocean":
                vidOptions = videoHandler.getOceanVideosAndThumbnail();
                break;
            case "Cozy":
                vidOptions = videoHandler.getAmbienceVideosAndThumbnail();
                break;
            case "Space":
                vidOptions = videoHandler.getSpaceVideosAndThumbnail();
                break;
        }
        vidOptions.then(setVideoAndThumbnail).catch(console.error);
        }, [vidOptions]);
        return(
            <div className="grid gap-3 md:grid-cols-3 grid-cols-2 cursor-pointer">
                {videosAndThumbnail.map(([videoUrl, thumbnailUrl], index) => (
                    <img
                    className="h-40 sm:w-30 w-50 rounded-md hover:scale-95"
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

  
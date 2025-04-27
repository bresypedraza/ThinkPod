import React, { useState, useEffect, use } from 'react';
import axios from 'axios';

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

const GetSavedBackground = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/background', {
      headers: { 
        Authorization: `Bearer ${token}` 
      },
    });
    return response.data.background_video;
  } catch (error) {
    console.error('Error fetching saved background:', error);
  }
};
  
const SaveBackground = async (videoUrl, token) => {
  try {
    await axios.put('http://localhost:5000/background', 
      { backgroundPreference: videoUrl }, 
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error('Error saving background:', error);
  }
};

const ChangeBackground = ({videoUrl, setVideoUrl, token})=>{
    useEffect(() => {
        if (!videoUrl && token) {
          GetSavedBackground(token)
            .then((savedVideo) => {
              if (savedVideo) {
                setVideoUrl(savedVideo);
              }
            })
            .catch(console.error);
        }
      }, [videoUrl, token, setVideoUrl]);
   
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

const BackgroundSelection = ({setBackgroundVideo, vidOptions, token})=>{
    const [videosAndThumbnail, setVideoAndThumbnail] = useState([]);


    useEffect(() => {
        const videoHandler = new BackgroundHandler();
        let fetchPromise;

        switch (vidOptions) {
            case 'Snow':
              fetchPromise = videoHandler.getSnowVideosAndThumbnail();
              break;
            case 'Ocean':
              fetchPromise = videoHandler.getOceanVideosAndThumbnail();
              break;
            case 'Cozy':
              fetchPromise = videoHandler.getAmbienceVideosAndThumbnail();
              break;
            case 'Space':
              fetchPromise = videoHandler.getSpaceVideosAndThumbnail();
              break;
            default:
              fetchPromise = videoHandler.getAllThumbnailAndVideos();
              break;
          }
      
          fetchPromise.then(setVideoAndThumbnail).catch(console.error);
        }, [vidOptions]);
      
        const handleClick = (videoUrl) => {
          setBackgroundVideo(videoUrl);
        };

        return(
            <div className="grid gap-3 md:grid-cols-3 grid-cols-2 cursor-pointer">
                {videosAndThumbnail.map(([videoUrl, thumbnailUrl], index) => (
                    <img
                    className="h-40 sm:w-30 w-50 rounded-md hover:scale-95"
                    key={index}
                    src={thumbnailUrl}
                    width={290}
                    height={400}
                    onClick={()=> handleClick(videoUrl)}>
                    </img>
                ))}   
            </div>
        );     
}

export default BackgroundHandler;
export { ChangeBackground, BackgroundSelection,GetSavedBackground, SaveBackground};
  
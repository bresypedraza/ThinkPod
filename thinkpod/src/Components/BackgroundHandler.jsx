import React, { useState, useEffect, use } from 'react';

/**
 * A class that uses the Pixabay API to fetch all the videos that the website needs for background settings. 
 */
export default class BackgroundHandler{

    static API_KEY = "49493386-996644cb7f2c9f25700dce247";

    /**
     * Fetches cozy ambience-themed videos and their thumbnails from the Pixabay Video API.
     * 
     * Sends a GET request to the Pixabay API with the search query "cozy ambience" and retrieves 
     * video results. Each result includes a medium-quality video URL and a corresponding thumbnail URL.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
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
     * Fetches winter-themed videos and their thumbnails from the Pixabay Video API.
     * 
     * Sends a GET request to the Pixabay API with the search query "winter" and retrieves 
     * video results. Each result includes a medium-quality video URL and a corresponding thumbnail URL.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
     */
    async getWinterVideosAndThumbnail(){
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
    * Fetches space-themed videos and their thumbnails from the Pixabay Video API.
     * 
     * Sends a GET request to the Pixabay API with the search query "galaxy" and retrieves 
     * video results. Each result includes a medium-quality video URL and a corresponding thumbnail URL.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
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
     * Fetches ocean-themed videos and their thumbnails from the Pixabay Video API.
     * 
     * Sends a GET request to the Pixabay API with the search query "ocean" and retrieves 
     * video results. Each result includes a medium-quality video URL and a corresponding thumbnail URL.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
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

    /**
     * Fetches a default video and its thumbnail from the Pixabay Video API.
     * 
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
     */
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
    
    /**
     * Aggregates all the theme-based video-fetching methods and returns a randomized array of video-thumbnail pairs.
     * @returns {Promise<Array<[string, string]>>} A promise that resolves to an array of tuples each containing a video URL and a thumbnail URL.
     */
    async getAllThumbnailAndVideos(){
        const ogBackground = await this.getDefaultBackground();
        const cozy = await this.getAmbienceVideosAndThumbnail();
        const snow = await this.getWinterVideosAndThumbnail();
        const ocean = await this.getOceanVideosAndThumbnail();
        const space = await this.getSpaceVideosAndThumbnail();
        const combined = [...cozy, ...snow, ...ocean, ...space];
        return [...ogBackground, ...this.shuffleArray(combined)];
    }


}

/**
 * This function changes the current background of the screen based on the current video url state.
 * @param {string} props.videoUrl - The current state of the video url.The original state is the link to the default backgroudn video. 
 * @returns {JSX.Element} A div containing a full-screen looping background video.
 */
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


/**
 * This function displays the right thumbnails in the background selection window based on the theme that the user
 * chooses. It also makes sure that the right video is displayed in the background when the user clicks the 
 * the thumbnail. 
 * 
 * @param {Function} props.setBackgroundVideo - Updates which vidoe url should the background be playing.
 * @param {string} props.vidOptions - Indicates which theme does the background selection window should show. This changes when user clicks theme icons.
 * @returns 
 */
export const BackgroundSelection = ({setBackgroundVideo, vidOptions})=>{
    // Videos-thumbnails pair state arrays. 
    const [videosAndThumbnail, setVideoAndThumbnail] = useState([]);

    // Fetches the right array of tuples based on vidOptions state. 
    useEffect(() => {
        const videoHandler = new BackgroundHandler();

        switch(vidOptions){
            case "All":
                vidOptions = videoHandler.getAllThumbnailAndVideos();
                break;
            case "Snow":
                vidOptions= videoHandler.getWinterVideosAndThumbnail();
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

        // When `vidOptions` (a Promise) changes, wait for it to resolve.
        // On success, update the video and thumbnail state using `setVideoAndThumbnail`.
        // On failure, log the error to the console.        
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

  
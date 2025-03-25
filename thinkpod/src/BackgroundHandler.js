/**
 * A class that uses the Pixabay API to fetch all the videos that the website needs for background settings. 
 */
class BackgroundHandler{

    static API_KEY = "49493386-996644cb7f2c9f25700dce247";


    /**
     * 
     * @returns An array of URLs for Lofi videos fetched from the Pixabay API.
     */
    async getLofiVideos(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q=lofi";
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
            return data.hits.map(hit => hit.videos.small.url);
        })
    }

    /**
     * 
     * @returns An array of URLs for AI Ambience videos fetched from the Pixabay API. 
     */
    async getAIAmbienceVideos(){
        const url = "https://pixabay.com/api/videos/?key="+BackgroundHandler.API_KEY+"&q="+encodeURIComponent('ai ambience');;
        return fetch(url)
        .then(response =>{
            if(!response.ok){
                throw new Error("Fail to get videos");
            }
            return response.json();
        })
        .then(data=>{
            return data.hits.map(hit => hit.videos.small.url);
        })
    }

}


// A main function for testing purposes
(function main() {
    const videoHandler = new BackgroundHandler();
    videoHandler.getLofiVideos()
        .then(videos => {
            console.log("videos:", videos);
        })
        .catch(error => {
            console.log(error);
        });
    videoHandler.getAIAmbienceVideos()
    .then(videos => {
        console.log("AI videos:", videos);
    })
    .catch(error => {
        console.log(error);
    });
  })();
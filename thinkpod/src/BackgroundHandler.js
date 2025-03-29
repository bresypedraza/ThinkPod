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
                return data.hits.map(hit=>[hit.videos.small.url, hit.videos.small.thumbnail]);
        })
    }



}

function changeBackground(webBackground, videoElement){
    videoElement.classList.add("fixed", "inset-x-0", "bottom-0", "min-w-full", "min-h-full", "z-[-1]");
    if(webBackground.contains(document.querySelector("video"))){
        document.querySelector("video").remove();
    }
    const vidClone = videoElement.cloneNode(true);
    webBackground.append(vidClone);

}

const backgroundSelection = async ()=>{
    const videoHandler = new BackgroundHandler();
    const background= document.querySelector('.background_setting');
    const backgroundOptions = await videoHandler.getAmbienceVideosAndThumbnail();
    const imgDiv = document.createElement('div');
    console.log("BEEEE");
    console.log(backgroundOptions);
    backgroundOptions.forEach(([videoUrl, thumbnailUrl])=>{
        const thumbnail = document.createElement('img');
        thumbnail.classList.add(      
            "h-48", 
            "w-60",         
            "object-cover", 
            "rounded-md",    
            "hover:scale-95" 
          );
        thumbnail.src = thumbnailUrl;
        thumbnail.width = 290;
        thumbnail.height = 400;
        imgDiv.append(thumbnail);

        //create video
        const vid = document.createElement("video");

        vid.src = videoUrl;
        vid.muted = true;
        vid.autoplay = true;
        // vid.loop = true;

        const webBody = document.querySelector("body");
        thumbnail.addEventListener("click", function(){
            changeBackground(webBody, vid);
        });

    });
    imgDiv.classList.add("grid", "grid-cols-4", "gap-5");
    background.append(imgDiv); 

}

export {backgroundSelection}






// A main function for testing purposes
// (function main() {
//     const videoHandler = new BackgroundHandler();
//     // videoHandler.getAllVideos()
//     //     .then(V => {
//     //         console.log("videoslo:", V);
//     //     })
//     //     .catch(error => {
//     //         console.log(error);
//     //     });
//     videoHandler.getAmbienceVideosAndThumbnail()
//     .then(V => {
//         console.log("videos:", V);
//     })
//     .catch(error => {
//         console.log(error);
//     });
//   })();

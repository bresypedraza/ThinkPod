import express from 'express';



class SongsHandler{
    static CLIENT_ID = 'da3531944d1f4a7fa2c20b63a46d1d60';
    static CLIENT_SECRET = '01c615f0104e4ce585ed871ae37f4490';
    static REFRESH_TOKEN = 'AQA7cG_FjXyApdq1aYiMpnDfovnxzpogKg4S44xSkWioVS-AsKtGdj4IsjAwk4nVIeA0vesSlhmQJ1QSRNyrf1pNlbdA8lvDfxeTWgcQ1CsCjGJ_ZQhrnDV10C3yRTC3AIw';


    async getAccessToken(){
        const app = express();
        const PORT = 3002;

        const tokenUrl = 'https://accounts.spotify.com/api/token';
        const credentials = `${SongsHandler.CLIENT_ID}:${SongsHandler.CLIENT_SECRET}`;
        const base64Credential = Buffer.from(credentials).toString('base64');
        const basicAuth= `Basic ${base64Credential}`;

        return fetch (tokenUrl, {
            method: "POST",
            headers: {
                Authorization: basicAuth,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token' ,
                refresh_token: SongsHandler.REFRESH_TOKEN,
            }),
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Failure");
            }
            return response.json()})
        .then(data=>{
            return data.access_token;
        })
        .catch((error)=> {
            throw new Error("Failure!")
        })

    }

    async getPlaylist(){

    }

}

(function main() {
    const songHandler = new SongsHandler();
    songHandler.getAccessToken()
        .then(token => {
            console.log("Access Token:", token);
        })
        .catch(error => {
            console.log(error);
        });
  })();

//   const app = express();
//   const PORT = 3002;
  
//   const songHandler = new SongsHandler();
  
//   // Express route to fetch the access token
//   app.get('/data', async (req, res) => {
//       try {
//           const accessToken = await songHandler.getAccessToken();  // Fetch the access token
//           res.json({ access_token: accessToken });  // Send the access token to the client
//       } catch (error) {
//           res.status(500).json({ error: "Failed to get access token" });
//       }
//   });
  
//   app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}/data`);
//   });
  


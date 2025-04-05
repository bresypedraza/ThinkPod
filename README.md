# ThinkPod 
## Installation  
Make sure to have these packages installed if you wish to run this repo on your device
- node.js 
- yarn 
- python 
- tailwind
  
Run these installations first
- pip install flask-cors
- pip install python-dotenv

To get npm start to activate both front and back end (with the 4 neccessary terminal command lines): 
1) Make sure that flask_cors is installed in your venv 
  … cd flaskAPI
  … flaskAPI % source venv/bin/activate
  (venv) … flaskAPI % pip install flask_cors
  (venv) … flaskAPI % pip install flask-cors python-dotenv

2) make sure concurrently is installed (globally and in the front end) 
  … cd ../thinkpod
  … ThinkPod % npm install -g concurrently
  …thinkpod % npm install concurrently --save-dev

3) Run it
  … npm start
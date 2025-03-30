""" 
This is just a practice file to make sure that React and Flask
are communicating properly
"""
import time
from flask import Flask
from flask_cors import CORS
import os 
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
#for deployment the URL needs to be set to the actual domain name!!
CORS(app, origins=os.getenv("CLIENT_URL", "http://localhost:3000"))

@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

""" 
This is just a practice file to make sure that React and Flask
are communicating properly
"""

import time
from flask import Flask

app = Flask(__name__)

@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}

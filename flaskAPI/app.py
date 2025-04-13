from flask import Flask, request,jsonify

#import statements for the port syncing
from flask_cors import CORS
import os 
from dotenv import load_dotenv

#import statements for the database
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, JSON 
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

#import statements for user login 
from flask_jwt_extended import create_access_token, JWTManager

#needed to make sure that the environment variables like CLIENT_URL load
load_dotenv()

app = Flask(__name__)

#Configuring the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] ='supposedToBeARandomSecretKey'

#for deployment the URL needs to be set to the actual domain name!!
CORS(app, origins=[os.getenv("CLIENT_URL", "http://localhost:3000")], supports_credentials=True)

#Initialize SQLAlchemy with Declarative Base
class Base(DeclarativeBase):
    pass

#Create SQLAlchemy instance 
db = SQLAlchemy(model_class=Base)
db.init_app(app)

#Initializing JWT
jwt = JWTManager(app)

#Defining the User model using 'Mapped" and "mapped_column"
class User(db.Model):
    __tablename__ = "users"
    username: Mapped[str] = mapped_column(String, primary_key=True)
    password: Mapped[str] = mapped_column(String, nullable=False)
    backgroundURL: Mapped[str] = mapped_column(String, nullable=True)
    toDoList: Mapped[JSON] = mapped_column(JSON, nullable=True)

#DATABASE UTLILTIY CLASS 
class Database:
    def __init__(self):
        pass
    
    """ Adding a new user to the database"""
    def createUser(self, username:str, password:str):
        newUser = User(username=username, password=password)
        db.session.add(newUser)
        db.session.commit() 

    """ Retrieving all the informations of a user via their ID"""
    def get(self, username: str):
        if username:
            return db.session.get(User, username)
      
    """ Updating the background preference of a user """
    def updateBackgroundPreferences(self, username: str, backgroundURL: str):
        user = self.get(username)
        if user: 
            user.backgroundURL = backgroundURL
            db.session.commit() 

    def updateToDoList():
        pass 
        
#Creating a database manager
db_manager = Database() 

#creates database table if it doesn't exist
with app.app_context():
    db.create_all()

#ROUTES
@app.route('/login',methods=['POST'])
def login():
    username = request.json.get('username', '')
    password = request.json.get('password', '')
    user = User.query.filter_by(username=username).first()
    if user and user.password == password:
        access_token = create_access_token(identity=username)
        response = jsonify(access_token=access_token)
        response.headers.add("Access-Control-Allow-Origin", os.getenv("CLIENT_URL", "http://localhost:3000"))
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response
    return jsonify({"message":"Invalid credentials"}), 401

@app.route('/createAccount', methods=['POST'])
def createAccount():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 409
    
    db_manager.createUser(username=username, password=password)
    return jsonify({"message": "Account created successfully"}), 201

@app.route('/toDoList')
def toDoList():
    pass 

@app.route('/background')
def background():
    pass

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

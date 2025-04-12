// -- Login Component --//

import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

export function Login(){
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = async() => {
   try {
     const response = await axios.post('http://127.0.0.1:5000/login', {username, password});
     localStorage.setItem('token', response.data.acess_token);
     alert('Login successful!');
   } catch(error){
     alert('Login failed!');
   }
 };

 return(
 <div>
   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
   <button onClick={handleLogin}>Login</button>
 </div>
 );
}
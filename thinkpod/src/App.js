import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Hello, World!</h1>
          <p className="text-gray-600 mt-2">React and Tailwind is finally ready!</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Click Me
          </button>
        </div>

        <iframe 
        src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ" 
        width="500" 
        height="100" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media">
        </iframe>
        </div>
        
      </body>
    </div>
  );
}

export default App;

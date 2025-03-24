import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

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
        <iframe 
        src="https://open.spotify.com/embed/playlist/3cnkhyqinMpD5O6f6qh5l4?si=eOwrMAD9QAOzMID8wjluiQ" 
        width="500" 
        height="100" 
        frameborder="0" 
        allowtransparency="true" 
        allow="encrypted-media">
        </iframe>
      </body>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import './App.css';
import Spirograph from './Spirograph.js';

function App() {
  useEffect(() => new Spirograph().start());

  return (
    <div className="App">
      <header className="App-header">
        <canvas/>
      </header>
    </div>
  );
}

export default App;

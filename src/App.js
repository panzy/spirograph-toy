import { useEffect, useState } from 'react';
import './App.css';
import Spirograph from './Spirograph';
import ParamEditor from './ParamEditor';

function App() {

  // param r2
  const [r2, setR2] = useState(25);

  useEffect(() => {
    let s = new Spirograph();
    s.start(r2);
    return () => s.stop();
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas/>
      </header>
      <ParamEditor defaultValue={r2} onChange={r2 => setR2(r2)}/>
    </div>
  );
}

export default App;

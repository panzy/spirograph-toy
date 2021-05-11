import { useEffect, useState } from 'react';
import './App.css';
import Spirograph from './Spirograph';
import ParamEditor from './ParamEditor';

function App() {

  const graph = new Spirograph();

  // param r2
  const [r2, setR2] = useState(25);

  useEffect(() => {
    graph.start(r2);
    return graph.stop;
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas/>
      </header>
      <ParamEditor
        defaultValue={r2}
        onChange={r2 => setR2(r2)}
        onPause={() => graph.pause()}
        onResume={() => graph.resume()}
      />
    </div>
  );
}

export default App;

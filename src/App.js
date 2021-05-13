import { useEffect, useState } from 'react';
import './App.css';
import Spirograph from './Spirograph';
import ParamEditor from './ParamEditor';

function App() {

  const graph = new Spirograph();

  // export for inspecting
  global.graph = graph;

  // params
  const [params, setParams] = useState({r2: 32, r3: 50, reverse: true});

  useEffect(() => {
    graph.start(params);
    return graph.stop;
  });

  return (
    <div className="App">
      <header className="App-header">
        <canvas/>
      </header>
      <ParamEditor
        defaultValue={params}
        onChange={p => setParams(p)}
      />
    </div>
  );
}

export default App;

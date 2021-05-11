import { useState } from 'react';
import './ParamEditor.css';

function ParamEditor({defaultValue, onChange, onPause, onResume}) {
  const [value, setVal] = useState(defaultValue ?? 0);
  const [paused, setPaused] = useState(false);

  const onChange_ = e => {
    setVal(e.target.value);
    if (onChange)
      onChange(e.target.value);
  }

  return <div id='ParamEditor'>
    <input type='range' id='r2' min='0' max='100' value={value} onChange={onChange_}/>
    <label htmlFor='r2'>Radius #2 relative to radius #1 ({value}%)</label>
    <br/>
    <button onClick={() => {
      paused ? onResume() : onPause();
      setPaused(!paused);
    }}>{paused ? 'Resume' : 'Pause'}</button>
  </div>;
}

export default ParamEditor;
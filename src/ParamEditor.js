import { useState } from 'react';
import './ParamEditor.css';

function ParamEditor({defaultValue, onChange}) {
  const [value, setVal] = useState(defaultValue ?? 0);

  const onChange_ = e => {
    setVal(e.target.value);
    if (onChange)
      onChange(e.target.value);
  }

  return <div id='ParamEditor'>
    <input type='range' id='r2' min='0' max='100' value={value} onChange={onChange_}/>
    <label htmlFor='r2'>Radius #2 relative to radius #1 ({value}%)</label>
    <br/>
  </div>;
}

export default ParamEditor;
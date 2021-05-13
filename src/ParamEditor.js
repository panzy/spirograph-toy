import { useState } from 'react';
import './ParamEditor.css';

function ParamEditor({defaultValue, onChange}) {
  const [value, setVal] = useState(defaultValue ?? {r2: 0, r3: 0});

  const onChange_ = e => {
    const newValue = {...value};

    if (e.target.id === 'reverse') // bool
      newValue.reverse = !newValue.reverse;
    else // int
      newValue[e.target.id] = parseInt(e.target.value);

    setVal(newValue);
    if (onChange)
      onChange(newValue);
  }

  return <div id='ParamEditor'>
    <label htmlFor='r2'>Inner gear's radius ({value.r2}%)</label>
    <br/>
    <input type='range' id='r2' min='0' max='100' value={value.r2} onChange={onChange_}/>
    <br/>
    <label htmlFor='r3'>Pencil's position ({value.r3}%)</label>
    <br/>
    <input type='range' id='r3' min='0' max='100' value={value.r3} onChange={onChange_}/>
    <br/>
    <label htmlFor='reverse'>Reverse inner gear</label>
    <input type='checkbox' id='reverse' checked={value.reverse} onChange={onChange_}/>
  </div>;
}

export default ParamEditor;
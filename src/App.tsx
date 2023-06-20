import React, { useState } from 'react';
import './App.css';
import {
  Button1,
  Button2,
  Button3,
  Button4,
  Search,
  Search1
} from './components';

function App() {
  const input = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<any>(123);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setValue(value);
  };

  React.useEffect(() => {
    if (input.current != null) {
      input.current.focus();
    }
  }, []);
  return (
    <div className='App'>
      <h1>Demo component</h1>
      <Button1>Button 1</Button1>
      <Button2>Button 2</Button2>
      <Button3>Button 3</Button3>
      <Button4>Button 4</Button4>
      <h2>Search focus</h2>
      <Search ref={input} />
      <Search1 />
    </div>
  );
}

export default App;

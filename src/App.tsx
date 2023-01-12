import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

const foo = () => {
  return <span></span>;
};

function App() {
  const a = 'a';
  useEffect(() => {
    console.log(a);
    console.log(333 || 2);
    const y = 0;
    const z = 0;
    const x: any = y || z;
    /*
  @ts-ignore: Unreachable code error
  */
    if (a) {
      console.log(2312);
    }
    const test = [
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
      'ddadasdas',
    ];
  }, []);
  // const b = 'a';
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

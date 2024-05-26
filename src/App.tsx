import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import electronLogo from '/electron.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [apiStatus, setApiStatus] = useState('idle');

  useEffect(() => {
    window.api
      .plusOne(5)
      .then(res => {
        console.log('5 + 1 =', res);
      })
      .catch(err => {
        console.error(err);
      });

    window.api
      .ping()
      .then(() => {
        console.log('Connection with api established!');
        setApiStatus('connected');
      })
      .catch(err => {
        console.error(err);
        setApiStatus('connection failed');
      });

    setApiStatus('waiting');
  }, []);

  return (
    <>
      <div>
        <a href="https://www.electronjs.org/docs/latest/" target="_blank">
          <img src={electronLogo} className="logo" alt="Electron logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount(count => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>API status: {apiStatus}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Edit <code>electron/src/main.ts</code> and save to test live reload
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron, Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

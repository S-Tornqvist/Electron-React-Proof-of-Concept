import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Api from '../types/apiDefinitions.ts';

declare global {
  interface Window {
    /**
     * Expose api type on global `window.api`. Assumes that Electron preload
     * (or another backend module) has attached the functionality to the window
     * object beforehand.
     */
    api: Api;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

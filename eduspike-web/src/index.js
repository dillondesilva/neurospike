import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import MediaQuery from 'react-responsive';
import MobileLandingPage from './MobileLandingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <HashRouter>
    <MediaQuery maxWidth={1224}>
      <MobileLandingPage />
    </MediaQuery>
    <MediaQuery minWidth={1224}>
      <App />
    </MediaQuery>
  </HashRouter>
  /* </React.StrictMode> */
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import App from './App.tsx';
// FIX: Import React to resolve 'Cannot find name' error.
import React from 'react';
// FIX: Import ReactDOM to resolve 'Cannot find name' error.
import ReactDOM from 'react-dom/client';

// React and ReactDOM are now global variables from the scripts in index.html
const { StrictMode } = React;
const { createRoot } = ReactDOM;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
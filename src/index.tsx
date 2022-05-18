import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import './global.css';

const container = document.querySelector('#root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDOM.render(<App />, document.querySelector('#root'));

if ((module as any).hot) {
  (module as any).hot.accept();
}

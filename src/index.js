import React from 'react';
import ReactDOM from 'react-dom/client';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
  
);

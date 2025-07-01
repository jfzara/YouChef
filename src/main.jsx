import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './globals.css';
import App from './App.jsx';
import { AuthProvider } from "./contexts/AuthContext";
import 'react-loading-skeleton/dist/skeleton.css';  

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  //</StrictMode>
);
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import "leaflet/dist/leaflet.css";


// 👈 Sekarang, kita impor komponen App yang berisi Routes
import App from './app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <AuthProvider>
      <App /> {/* Render App sebagai router utama */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
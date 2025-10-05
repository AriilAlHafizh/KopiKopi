import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

// 👈 Sekarang, kita impor komponen App yang berisi Routes
import App from './app';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <App /> {/* Render App sebagai router utama */}
    </BrowserRouter>
  </StrictMode>,
);
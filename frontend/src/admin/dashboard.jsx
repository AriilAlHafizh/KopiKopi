import React from 'react';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path jika perlu
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a202c' }}>Admin Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontWeight: '500' }}>
            Welcome, <strong style={{ color: '#2d3748' }}>{user?.name || 'Admin'}</strong>
          </span>
          <button 
            onClick={handleLogout}
            style={{ 
              padding: '8px 16px', 
              border: 'none', 
              borderRadius: '8px', 
              backgroundColor: '#e53e3e', 
              color: 'white', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Selamat Datang di Panel Admin</h2>
        <p style={{ color: '#4a5568' }}>
          Di sini Anda dapat mengelola pengguna, produk, dan seluruh aspek dari website Hafizh Kopi.
        </p>
        {/* Tambahkan komponen atau konten admin lainnya di sini */}
      </main>
    </div>
  );
}
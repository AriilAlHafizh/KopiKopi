import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path jika perlu
import { User, LogOut, LayoutDashboard } from 'lucide-react';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  // Efek untuk menutup dropdown saat klik di luar area komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Tombol Ikon Profil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <User size={20} className="text-white" />
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border text-gray-800">
          <div className="p-4 border-b">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="py-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </Link>
            {/* Jika ada role admin, tampilkan link ke admin dashboard */}
            {user.role === 'admin' && (
                <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100"
                >
                <LayoutDashboard size={16} />
                <span>Admin Dashboard</span>
                </Link>
            )}
          </div>
          <div className="py-2 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

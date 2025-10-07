import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from './context/AuthContext.jsx';
import api from './api';

// --- Komponen Ikon Lokal ---
const Eye = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const EyeOff = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a9.89 9.89 0 0 1 2.33-3.09"></path><path d="M7.94 7.94A10.07 10.07 0 0 1 12 4c7 0 10 7 10 7a9.89 9.89 0 0 1-2.33 3.09"></path><line x1="1" x2="23" y1="1" y2="23"></line><circle cx="12" cy="12" r="3"></circle></svg>
);
// ---------------------------------------------------------------------------------


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post('/login', { email, password });
      login(response.data, navigate);

    } catch (err) {
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Tidak dapat terhubung ke server. Silakan coba lagi.');
        console.error("Login error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="h-screen flex overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/image/2.jpg')",
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      {/* KIRI: Konten Informasi */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-1/2 relative flex h-full bg-black/50"
      >
        <div className="relative z-10 flex flex-col p-16 text-white w-full h-full">
          <div className="flex items-center gap-3 mb-auto">
            <Link to="/">
              <img
                src="/src/assets/image/LOGO.png"
                alt="Hafizh Kopi Logo"
                className="w-70 h-28 object-contain shadow-lg"
              />
            </Link>
          </div>
          <div className="mb-24 max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold mb-6 leading-tight"
            >
              Cicipi Aroma Nusantara
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              Setiap biji kopi yang kami seduh adalah hasil panen terbaik dari petani lokal pilihan.
            </motion.p>
            <div className="flex gap-3 mt-10">
              <div className="w-12 h-1.5 bg-white rounded-full shadow"></div>
              <div className="w-12 h-1.5 bg-white/30 rounded-full"></div>
              <div className="w-12 h-1.5 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KANAN: Form Login */}
      <div className="w-1/2 flex items-center justify-center px-8 py-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-10 md:p-9 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-gray-500 tracking-widest mb-2">WELCOME BACK</p>
            <h2 className="text-3xl font-bold text-gray-900">Log In to your Account</h2>
          </div>

          {/* === 1. PERUBAHAN: TAMPILKAN ERROR DI SINI === */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition pr-12 text-base"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">Remember me</span>
              </label>
              <button type="button" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition">
                Forgot Password?
              </button>
            </div>

            {/* === 2. PERUBAHAN: TOMBOL DINAMIS === */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg mt-6 tracking-wide disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'MEMPROSES...' : 'CONTINUE'}
            </motion.button>
          </form>

          {/* ... Sisa JSX Anda ... */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-sm text-gray-500 font-medium">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="space-y-3">
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="button" className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Log In with Google</span>
            </motion.button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6 pt-2">
            New User?{' '}
            <Link to="/signup" className="font-bold text-gray-900 hover:underline">
              SIGN UP HERE
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
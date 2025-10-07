import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from './api'; // Pastikan path ini benar sesuai struktur folder Anda

// --- Komponen Ikon (tidak perlu diubah) ---
const Eye = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const EyeOff = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a9.89 9.89 0 0 1 2.33-3.09"></path><path d="M7.94 7.94A10.07 10.07 0 0 1 12 4c7 0 10 7 10 7a9.89 9.89 0 0 1-2.33 3.09"></path><line x1="1" x2="23" y1="1" y2="23"></line><circle cx="12" cy="12" r="3"></circle></svg>
);

export default function SignUp() {
  // State untuk menampung semua input form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alamat, setAlamat] = useState('');
  const [no_tlp, setNoTlp] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  
  // State untuk UI/UX
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Fungsi yang dijalankan saat form disubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validasi sederhana di sisi frontend
    if (password !== confPassword) {
      setError('Password dan Konfirmasi Password tidak cocok');
      setIsLoading(false);
      return;
    }

    try {
      // Mengirim data ke endpoint backend
      const response = await api.post('/users', {
        name,
        email,
        alamat,
        no_tlp,
        password,
        confPassword
        // 'role' tidak dikirim agar backend menggunakan nilai default 'buyer'
      });
      
      setSuccess(response.data.msg + " Anda akan diarahkan ke halaman login.");
      
      // Arahkan ke halaman login setelah 2 detik
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Menangani error dari backend (misal: email sudah terdaftar)
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Pendaftaran gagal. Silakan coba lagi.');
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
      {/* KIRI: Form Sign Up */}
      <div className="w-1/2 flex items-center justify-center px-8 py-10 h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-10 md:p-5 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-gray-500 tracking-widest mb-2">CREATE ACCOUNT</p>
            <h2 className="text-3xl font-bold text-gray-900">Sign Up as a Buyer</h2>
          </div>

          {/* Menampilkan pesan error atau sukses */}
          {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert"><p>{error}</p></div>}
          {success && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert"><p>{success}</p></div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input untuk Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900" required />
            </div>
            
            {/* Input untuk Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900" required />
            </div>
            
            {/* Input untuk Alamat */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
              <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900" required />
            </div>
            
            {/* Input untuk No. Telepon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
              <input type="text" placeholder='Contoh: 08123456789' value={no_tlp} onChange={(e) => setNoTlp(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900" required />
            </div>
            
            {/* Input untuk Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-gray-900" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            
            {/* Input untuk Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
              <input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900" required />
            </div>
            
            {/* Tombol Submit */}
            <motion.button
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={isLoading}
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'MEMPROSES...' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          {/* Link ke Login */}
          <p className="text-center text-sm text-gray-600 mt-6 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-gray-900 hover:underline">SIGN IN HERE</Link>
          </p>
        </motion.div>
      </div>
      
      {/* KANAN: Konten Informasi (tidak diubah) */}
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-1/2 relative flex h-full bg-black/50">
        <div className="relative z-10 flex flex-col p-16 text-white w-full h-full">
          <div className="flex items-center gap-3 mb-auto">
            <img src="/src/assets/image/LOGO.png" alt="Hafizh Kopi Logo" className="w-70 h-28 object-contain shadow-lg" />
          </div>
          <div className="mb-24 max-w-xl">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-5xl font-bold mb-6 leading-tight">
              Cicipi Aroma Nusantara
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-lg text-gray-300 leading-relaxed">
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
    </div>
  );
}


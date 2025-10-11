import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path
import ProfileDropdown from './ProfileDropdown'; // Import komponen dropdown
import { ShoppingCart } from 'lucide-react'; // 🛒 Tambahan ikon keranjang

// Navbar ini menerima 'variant' untuk mengatur style (misal: transparan di hero, putih di halaman lain)
export default function Navbar({ variant = 'default' }) {
    const { isAuthenticated } = useAuth();

  // 🎨 Tentukan warna navbar berdasarkan variant
    let navBgColor = 'bg-white shadow-md';
    let navTextColor = 'text-gray-800';

    if (variant === 'transparent') {
        navBgColor = 'bg-transparent';
        navTextColor = 'text-white';
    } else if (variant === 'brown') {
        navBgColor = 'bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white shadow-md';
        navTextColor = 'text-white';
    }
    return (
        <header className={`absolute top-0 left-0 w-full z-30 ${navBgColor} transition-all duration-300`}>
            <nav className={`max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center ${navTextColor}`}>

                {/* 1. Logo */}
                <Link to="/">
                    <img
                        src="/src/assets/image/LOGO.png"
                        alt="Hafizh Kopi Logo"
                        className="h-10"
                    />
                </Link>

                {/* 2. Menu Navigasi */}
                <div className="hidden md:flex space-x-8 text-base font-medium">
                    <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                    <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>
                    <Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link>
                    <Link to="/blog" className="hover:text-yellow-400 transition">Blog</Link>
                    <Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
                </div>

                {/* 3. Aksi (Pencarian, Keranjang, Login/Profil) */}
                <div className="flex items-center space-x-4">

                    {/* Kotak Pencarian */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Cari kopi.."
                            className="px-4 py-2 w-36 sm:w-35 text-gray-900 bg-white rounded-l-xl focus:outline-none text-sm"
                        />
                        <button
                            className="bg-black text-white px-3 py-2 rounded-r-xl h-full hover:bg-gray-800 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                    </div>

                    {/* 🛒 Ikon Keranjang */}
                    <Link
                        to="/keranjang"
                        className="relative p-2 rounded-full hover:bg-gray-100 transition"
                        title="Keranjang"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {/* Badge jumlah item (opsional) */}
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                            2
                        </span>
                    </Link>

                    {/* Tombol Login atau Ikon Profil */}
                    {isAuthenticated ? (
                        <ProfileDropdown />
                    ) : (
                        <Link
                            to="/login"
                            className="bg-[#A0583C] text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:bg-amber-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

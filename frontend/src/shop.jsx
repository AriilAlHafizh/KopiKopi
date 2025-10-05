import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Diperlukan untuk navigasi di navbar
import { motion } from 'framer-motion';


export default function ShopPage() {
  return (
    <div className="font-[Poppins,sans-serif]">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-transparent">
        <nav className="max-w-7xl mx-auto py-6 flex justify-between items-center text-white">
          {/* Logo */}
          <Link to="/">
            <img
              src="/src/assets/image/LOGO.png"
              alt="Hafizh Kopi Logo"
              className="h-10"
            />
          </Link>
    
          {/* Menu Navigasi */}
          <div className="hidden md:flex space-x-8 text-base font-medium ml-16">
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            <Link to="/About" className="hover:text-yellow-400 transition">About Us</Link>
            <Link to="/Shop" className="hover:text-yellow-400 transition">Shop</Link>
            <Link to="/Blog" className="hover:text-yellow-400 transition">Blog</Link>
            <Link to="/Contact" className="hover:text-yellow-400 transition">Contact Us</Link>
          </div>
    
          <div className="flex items-center space-x-2">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </div>
    
            {/* Tombol Login */}
            <Link
              to="/login"
              className="bg-[#A0583C] text-white font-semibold py-2 px-6 rounded-xl shadow-lg hover:bg-amber-700 transition"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Produk */}
      <section className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-10 md:mb-0 md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">CARI KOPI TERBAIK ANDA DISINI</h1>
              <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-lg">
                Menikmati kekayaan kopi asli kopi Indonesia yang terpilih, dengan cita rasa khas yang menghadirkan kehangatan & kenikmatan dalam setiap tegukan, Jangan ragu untuk memilih kopi terbaik anda, kami menyediakan kopi yang higenis dan sehat.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src="/src/assets/image/shop.png"
                  alt="Kopi"
                  className="w-[400px] h-[300px] rounded-full drop-shadow-2xl object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORI KOPI */}
      <section className="my-20 text-center px-6">
        <h2 className="text-4xl font-extrabold text-[#2E2E2E] mb-6 tracking-wide">
          Pilih Kategori Kopi
        </h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Jelajahi berbagai varian kopi terbaik kami — temukan rasa yang paling cocok untuk Anda.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Tombol Robusta */}
          <button className="py-5 rounded-2xl bg-gradient-to-r from-[#D2691E] to-[#8B4513] text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            Robusta
          </button>

          {/* Tombol Arabica */}
          <button className="py-5 rounded-2xl bg-gradient-to-r from-[#795548] to-[#3E2723] text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            Arabica
          </button>

          {/* Tombol Luwak */}
          <button className="py-5 rounded-2xl bg-gradient-to-r from-[#C0A080] to-[#8D6E63] text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            Luwak
          </button>

          {/* Tombol Kapal Api */}
          <button className="py-5 rounded-2xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#3B2F2F] font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
            Kapal Api
          </button>
        </div>
      </section>



      {/* Grid Produk */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
      <h3 className="text-3xl font-semibold text-center mb-12">Pilihan Produk</h3>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
         {/* Card 1 */}
      <Link
        to="/produk"
        className="bg-white rounded-2xl shadow hover:shadow-xl hover:scale-105 transition overflow-hidden flex flex-col cursor-pointer group"
      >
        <img
          src="/src/assets/image/berita.jpg"
          alt="Kopi Robusta"
          className="w-full h-56 object-cover group-hover:opacity-90 transition"
        />
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full w-fit">
            Robusta
          </span>
          <h4 className="font-bold text-lg mt-2 mb-2 group-hover:text-amber-800 transition">
            Kopi Robusta
          </h4>
          <p className="text-sm text-gray-600 mb-4 flex-grow">
            Rasa kuat dan aroma tajam untuk penikmat sejati.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-semibold text-amber-800">Rp45.000</span>
            <Link
              to="/produk"
              className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm transition"
              onClick={(e) => e.stopPropagation()} // biar ga double navigasi
            >
              Tambah
            </Link>
          </div>
        </div>
      </Link>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow hover:shadow-xl hover:scale-105 transition overflow-hidden flex flex-col">
          <img
             src="/src/assets/image/berita.jpg"
            alt="Kopi Arabica"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 flex flex-col flex-grow">
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full w-fit">
              Arabica
            </span>
            <h4 className="font-bold text-lg mt-2 mb-2">Kopi Arabica</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Rasa halus dengan keasaman ringan dan aroma floral.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-semibold text-amber-800">Rp55.000</span>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm transition">
                Tambah
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow hover:shadow-xl hover:scale-105 transition overflow-hidden flex flex-col">
          <img
             src="/src/assets/image/berita.jpg"
            alt="Kopi Specialty"
            className="w-full h-56 object-cover"
          />
          <div className="p-6 flex flex-col flex-grow">
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full w-fit">
              Specialty
            </span>
            <h4 className="font-bold text-lg mt-2 mb-2">Kopi Gayo</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Cita rasa khas Aceh dengan keseimbangan sempurna.
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-semibold text-amber-800">Rp60.000</span>
              <button className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm transition">
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 pb-12">
        <button className="px-3 py-2 border rounded-lg hover:bg-[#f3f3f3]">1</button>
        <button className="px-3 py-2 border rounded-lg hover:bg-[#f3f3f3]">2</button>
        <button className="px-3 py-2 border rounded-lg hover:bg-[#f3f3f3]">3</button>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white pt-16 pb-6">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-4">HAFIZH KOPI</h3>
              <p>Menyajikan kopi premium terbaik untuk memulai hari Anda dengan semangat.</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center hover:bg-amber-600">f</a>
                <a href="#" className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center hover:bg-amber-600">t</a>
                <a href="#" className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center hover:bg-amber-600">i</a>
                <a href="#" className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center hover:bg-amber-600">y</a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-amber-600">Home</a></li>
                <li><a href="#" className="hover:text-amber-600">About Us</a></li>
                <li><a href="#" className="hover:text-amber-600">Products</a></li>
                <li><a href="#" className="hover:text-amber-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">PRODUCTS</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-amber-600">Arabica</a></li>
                <li><a href="#" className="hover:text-amber-600">Robusta</a></li>
                <li><a href="#" className="hover:text-amber-600">Specialty</a></li>
                <li><a href="#" className="hover:text-amber-600">Coffee Blend</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">CONTACT INFO</h3>
              <p>📍 Jakarta, Indonesia</p>
              <p>📞 +62 21 1234 5678</p>
              <p>✉️ info@hafizhkopi.com</p>
            </div>
          </div>
          <div className="border-t border-gray-600 pt-4 text-center text-gray-400 text-sm">
            &copy; 2024 Hafizh Kopi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Diperlukan untuk navigasi di navbar
import { motion } from 'framer-motion';

function App() {
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

  {/* Hero Section */}
  <section className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-10 md:mb-0 md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-wide">HAFIZ KOPI</h1>
              <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-lg">
                Menikmati kekayaan kopi asli kopi Indonesia yang terpilih, dengan cita rasa khas yang menghadirkan kehangatan & kenikmatan dalam setiap tegukan, Jangan ragu untuk memilih kopi terbaik anda, kami menyediakan kopi yang higenis dan sehat.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src="/src/assets/image/kopi3.png"
                  alt="Kopi"
                  className="w-[600px] h-[400px] rounded-full drop-shadow-2xl object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Hafizh <span className="text-green-600">Story</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Hafizh Kopi didirikan dengan tujuan untuk memperkenalkan cita rasa dan keunikan kopi Indonesia kepada dunia. Dengan pengalaman lebih dari 10 tahun di industri kopi, kami berkomitmen untuk menghadirkan kopi berkualitas tinggi yang diproses dengan penuh dedikasi dan keahlian. Setiap biji kopi yang kami pilih berasal dari perkebunan terbaik di Indonesia, dan diolah dengan penuh cinta untuk menghasilkan rasa yang sempurna.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="flex justify-center mb-6">
                <img src="/src/assets/image/dokter.png" alt="Team Hafizh Kopi" className="w-120" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="md:w-1/2 flex justify-width">
              <div className="relative">
                <img src="/src/assets/image/kopi2.png" alt="Produk Hafizh Kopi" className="w-80" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6">
                Hafizh <span className="text-green-600">Product</span>
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Hafizh Kopi menyajikan berbagai pilihan produk kopi premium yang diolah dengan cermat dari biji kopi pilihan. Dari kopi bubuk, kopi biji, hingga produk turunan seperti kopi instan, semua dirancang untuk memberikan pengalaman terbaik bagi pecinta kopi. Setiap produk kami melalui proses seleksi ketat dan pengolahan yang tepat untuk memastikan kualitas dan kesegaran yang terjaga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
<section className="relative py-20 flex justify-center w-full">
  <motion.div
    className="relative py-16 px-6 sm:px-16 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center"
    style={{ backgroundImage: 'url("/src/assets/image/cta.png")' }} // 👉 ganti dengan path gambar kamu
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6 }}
  >
    <div className="absolute inset-0"></div>

    <div className="relative z-10 text-center text-white">
      <h3 className="text-4xl font-extrabold mb-3 tracking-tight">
        Ayo Mulai Nikmati Dari Kamu!
      </h3>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Bergabunglah dengan ribuan pelanggan yang telah merasakan kelezatan kopi premium kami
      </p>
      <button className="bg-[#B27F5A] text-white font-semibold py-3 px-10 rounded-xl shadow-xl hover:bg-[#A36C4D] transition transform hover:scale-105">
        Selengkapnya
      </button>
    </div>
  </motion.div>
</section>


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

export default App;

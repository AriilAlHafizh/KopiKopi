import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ tambahkan useNavigate
import Navbar from './components/Navbar.jsx';

export default function Toko() {


  return (
    <div className="font-[Poppins,sans-serif]">
      {/* ✅ Navbar yang sudah kamu buat */}
      <Navbar variant="brown" />

      {/* ===== PROFIL TOKO ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-28 mb-12">

        <div className="bg-white shadow-md rounded-2xl flex flex-col md:flex-row items-center p-6 gap-6">
          <img
            src="kopi.jpg"
            alt="Petani"
            className="w-28 h-28 rounded-full object-cover border-4 border-amber-600"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">Petani Cirebon</h2>
            <p className="text-gray-500">Ayo ikuti produk kami</p>
            <p className="text-sm text-gray-400 mt-1">Cirebon, Indonesia</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <button className="bg-amber-600 text-white px-6 py-2 rounded-lg shadow hover:bg-amber-700">
              Chat
            </button>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600">
              Ikuti +
            </button>
          </div>
        </div>
      </section>

      {/* ===== TENTANG TOKO ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold mb-4">Tentang Toko</h2>
        <p className="text-gray-600 leading-relaxed">
          Kopi Robusta adalah salah satu jenis kopi paling banyak dibudidayakan di dunia setelah Arabika.
          Rasanya lebih kuat dengan tingkat kafein lebih tinggi dibanding Arabika.
          Petani Cirebon memproduksi kopi robusta pilihan dengan kualitas terbaik langsung dari perkebunan.
          Kami menghadirkan cita rasa khas yang kuat, cocok untuk pecinta kopi sejati.
        </p>
      </section>

      {/* ===== PRODUK KAMI ===== */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-16">
        <h2 className="text-2xl font-bold mb-6">Produk Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Kopi Robusta",
              desc: "Kopi robusta pilihan dengan cita rasa khas.",
              price: "Rp 50.000",
            },
            {
              title: "Kopi Robusta Premium",
              desc: "Rasa lebih kuat dan aroma khas robusta asli.",
              price: "Rp 65.000",
            },
            {
              title: "Kopi Bubuk Robusta",
              desc: "Bubuk kopi robusta praktis siap seduh.",
              price: "Rp 45.000",
            },
            {
              title: "Kopi Robusta Spesial",
              desc: "Varian spesial dengan kualitas premium.",
              price: "Rp 75.000",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src="https://via.placeholder.com/300x200"
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-amber-700 font-bold">{item.price}</span>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700">
                    Beli
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ===== Footer ===== */}
      <footer className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white pt-16 pb-6">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-4">HAFIZH KOPI</h3>
              <p>Menyajikan kopi premium terbaik untuk memulai hari Anda dengan semangat.</p>
              <div className="flex gap-3 mt-4">
                {["f", "t", "i", "y"].map((icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center hover:bg-amber-600">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-300">
                {["Home", "About Us", "Products", "Contact"].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-amber-400">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">PRODUCTS</h3>
              <ul className="space-y-2 text-gray-300">
                {["Arabica", "Robusta", "Specialty", "Coffee Blend"].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-amber-400">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">CONTACT INFO</h3>
              <p>📍 Jakarta, Indonesia</p>
              <p>📞 +62 21 1234 5678</p>
              <p>✉️ info@hafizhkopi.com</p>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 text-center text-gray-300 text-sm">
            &copy; 2025 Hafizh Kopi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

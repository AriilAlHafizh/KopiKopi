import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './components/Navbar.jsx';


export default function Keranjang() {
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[type='email']").value;
    alert(`Terima kasih! Email ${email} telah berhasil didaftarkan.`);
    e.target.reset();
  };

  return (
    <div className="font-[Poppins,sans-serif]">
          {/* ✅ Navbar yang sudah kamu buat */}
          <Navbar variant="brown" />
    

      {/* ===================== Konten Keranjang ===================== */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6 flex-grow pt-24">
        {/* ===== Daftar Produk ===== */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Produk di Keranjang</h2>
          <div className="divide-y">
            {/* Produk 1 */}
            <div className="flex items-center py-4">
              <img
                src="/kopi3.png"
                alt="Kopi Robusta"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">Kopi Robusta</h3>
                <p className="text-sm text-gray-500">250g</p>
                <p className="text-yellow-600 font-bold">Rp 45.000</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                <span className="px-3">1</span>
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
              </div>
              <button className="ml-4 text-red-500 hover:underline">Hapus</button>
            </div>

            {/* Produk 2 */}
            <div className="flex items-center py-4">
              <img
                src="/kopi2.png"
                alt="Kopi Arabica"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">Kopi Arabica</h3>
                <p className="text-sm text-gray-500">500g</p>
                <p className="text-yellow-600 font-bold">Rp 75.000</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                <span className="px-3">2</span>
                <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
              </div>
              <button className="ml-4 text-red-500 hover:underline">Hapus</button>
            </div>
          </div>
        </div>

        {/* ===== Ringkasan Pesanan ===== */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp 195.000</span>
            </div>
            <div className="flex justify-between">
              <span>Ongkos Kirim</span>
              <span>Rp 20.000</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>Rp 215.000</span>
            </div>
          </div>
          <button
            className="w-full mt-6 py-3 text-white font-bold rounded-lg transition"
            style={{
              background: "linear-gradient(to right, #A0583C 0%, #C08267 45%, #A25B3F 100%)",
            }}
          >
            Lanjut ke Pembayaran
          </button>
        </div>
      </main>

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

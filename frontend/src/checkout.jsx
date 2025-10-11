import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from './components/Navbar.jsx';
import { useLocation } from "react-router-dom";



export default function Checkout() {
  const location = useLocation();
  const productData = location.state;

  // Jika data dikirim, pakai datanya. Kalau tidak, tampilkan default.
  const productName = productData?.productName || "Kopi Robusta 250g";
  const productPrice = productData?.price || 45000;
  const quantity = productData?.quantity || 1;
  const subtotal = productPrice * quantity;


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
    

      {/* MAIN */}
      <main className="flex-grow bg-[#FAF8F5] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 pt-28">
          {/* FORM PEMBAYARAN */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#5D4037]">
              🧾 Detail Pembayaran
            </h2>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama Depan"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="text"
                  placeholder="Nama Belakang"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <select className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400">
                <option>Negara / Wilayah</option>
                <option>Indonesia</option>
                <option>Malaysia</option>
                <option>Filipina</option>
              </select>

              <input
                type="text"
                placeholder="Alamat Jalan"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Kota / Kabupaten"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Kode Pos"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="text"
                placeholder="Nomor Telepon"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="email"
                placeholder="Alamat Email"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              />

              <textarea
                rows="3"
                placeholder="Catatan tambahan (opsional)"
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-amber-400"
              ></textarea>

              {/* MAP */}
              <div>
                <h3 className="font-semibold mb-2">📍 Lokasi Kami</h3>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.527629782476!2d110.41452831525676!3d-7.839379794349681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787a5b7c8d9%3A0x2e9b9d92d9fcb7b5!2sYogyakarta!5e0!3m2!1sen!2sid!4v1614843047203!5m2!1sen!2sid"
                  width="100%"
                  height="200"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg border border-gray-200"
                  title="Google Maps"
                ></iframe>
              </div>
            </form>
          </div>

          {/* RINGKASAN PESANAN */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-[#5D4037]">
              ☕ Ringkasan Pesanan
            </h2>

            <div className="space-y-4">
  <div className="flex justify-between">
    <span>{productName}</span>
    <span className="font-semibold">
      Rp {productPrice.toLocaleString("id-ID")}
    </span>
  </div>
  <hr />
  <div className="flex justify-between font-bold text-lg">
    <span>Total</span>
    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
  </div>
</div>


            {/* CARD DETAIL */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">💳 Pembayaran Kartu</h3>
              <input
                type="text"
                placeholder="Nomor Kartu"
                className="border p-3 rounded-lg w-full mb-3 focus:ring-2 focus:ring-amber-400"
              />
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-amber-400"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border p-3 rounded-lg w-1/2 focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button className="w-full bg-gradient-to-r from-[#6D4C41] to-[#A1887F] text-white py-3 rounded-lg font-bold hover:opacity-90 transition">
                Lanjutkan Pembayaran
              </button>
            </div>
          </div>
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

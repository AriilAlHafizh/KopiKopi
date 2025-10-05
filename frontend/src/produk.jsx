import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Checkout() {
  const [quantity, setQuantity] = useState(1);
  const pricePerKg = 50000;

  const updateSubtotal = () => {
    return `Rp ${(quantity * pricePerKg).toLocaleString("id-ID")}`;
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const addToCart = () => {
    alert(`${quantity} kg Kopi Robusta telah ditambahkan ke keranjang!`);
  };

  const buyNow = () => {
    const total = quantity * pricePerKg;
    const formattedTotal = total.toLocaleString("id-ID");
    if (window.confirm(`Anda akan membeli ${quantity} kg Kopi Robusta dengan total Rp ${formattedTotal}. Lanjutkan?`)) {
      alert("Mengarahkan ke halaman pembayaran...");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector("input[type='email']").value;
    alert(`Terima kasih! Email ${email} telah berhasil didaftarkan.`);
    e.target.reset();
  };

  return (
    <div className="font-sans bg-gray-100 text-gray-800 leading-relaxed">
      {/* HEADER */}
      <header className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white shadow-md">
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

          {/* Search + Login */}
          <div className="flex items-center space-x-2">
            {/* Kotak Pencarian */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Cari kopi.."
                className="px-4 py-2 w-36 sm:w-40 text-gray-900 bg-white rounded-l-xl focus:outline-none text-sm"
              />
              <button className="bg-black text-white px-3 py-2 rounded-r-xl h-full hover:bg-gray-800 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-5 py-10 flex flex-col md:flex-row gap-10">
        {/* LEFT */}
       <section className="flex-1 bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-3xl md:text-4xl font-bold mb-5">ROBUSTA</h1>
            <div className="mb-8">
              <p className="text-gray-600 text-justify mb-6">
                Kopi Robusta adalah salah satu jenis kopi yang paling banyak dibudidayakan di seluruh wilayah Arabika. Aroma biji Kopi Robusta memiliki rasa yang lebih kuat, pahit, dan beraroma tanah atau kayu dibandingkan Arabika. Karakteristik ini muncul akibat kadar asam klorogenat yang lebih tinggi. Keunggulan Robusta adalah kemampuannya memberikan efek aftertaden yang lebih kuat dan membantu tanaman lebih tahan terhadap hama. Kopi Robusta dapat dibudidayakan di daerah dataran rendah hingga menengah (200-800 meter di atas permukaan laut) dengan suhu sedang (24-30 derajat Celsius). Robusta memiliki kandungan kafein yang jauh lebih tinggi dibanding biji Arabika. Karena karakter rasa yang tegas dan body yang pekat, Robusta sering digunakan sebagai bahan dasar espresso blend, kopi instan, dan minuman kopi dengan cita rasa kuat.
              </p>
              <hr className="border-t border-gray-200 my-5" />
              <h2 className="text-2xl font-bold text-[#5D4037]">PT. HAFIZH KOPI</h2>
              <hr className="border-t border-gray-200 my-5" />
              <p className="text-2xl font-bold text-[rgb(210,105,30)]">Rp 50.000/kg</p>
              <hr className="border-t border-gray-200 my-5" />
              <div>
                <h3 className="font-bold mb-2">Catatan</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Jangan ragu untuk memilih kopi terbaik ...
                </p>
              </div>
            </div>

            {/* Card Gambar Produk (Lebar dan elegan) */}
            <div className="flex justify-center mt-8">
              <div className="w-full max-w-lg h-80 rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                <img
                  src="/src/assets/image/berita.jpg"
                  alt="kopi"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                />
              </div>
            </div>
          </section>


        {/* RIGHT */}
        <aside className="w-full md:w-96">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-[rgb(139,69,19)] text-center mb-2">PT. HAFIZH KOPI</h2>
            <div className="text-2xl font-bold text-[rgb(210,105,30)] text-center mb-5 border-b border-gray-200 pb-5">
              Rp 50.000/kg
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-base mb-2">Catatan</h3>
              <p className="text-sm text-gray-600">
                Harap menyimpan kopi ini dengan wadah ...
              </p>
            </div>

            <div className="flex justify-center items-center gap-4 mb-6">
              <button
                className="w-9 h-9 border-2 border-[rgb(139,69,19)] rounded-full text-[rgb(139,69,19)] hover:bg-[rgb(139,69,19)] hover:text-white transition"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center text-xl font-bold border-0 bg-transparent"
              />
              <button
                className="w-9 h-9 border-2 border-[rgb(139,69,19)] rounded-full text-[rgb(139,69,19)] hover:bg-[rgb(139,69,19)] hover:text-white transition"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

            <div className="flex justify-between items-center mb-5 border-t border-gray-200 pt-4 text-lg font-bold">
              <span>Subtotal</span>
              <span>{updateSubtotal()}</span>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white py-3 rounded-full font-bold hover:opacity-90 shadow"
                onClick={addToCart}
              >
                Keranjang
              </button>
              <button
                className="flex-1 bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white py-3 rounded-full font-bold hover:opacity-90 shadow"
                onClick={buyNow}
              >
                Beli
              </button>
            </div>
          </div>
        </aside>
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

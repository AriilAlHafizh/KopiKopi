import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Blog() {
  return (
    <div className="font-[Poppins,sans-serif]">
          {/* ✅ Navbar yang sudah kamu buat */}
          <Navbar variant="transparent" />

      {/* ===== Featured Post (Berita Terbaru) ===== */}
      <section className="relative bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white min-h-[90vh] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          {/* Kiri: Teks */}
          <div className="md:w-1/2 space-y-6">
            <span className="bg-amber-600 text-white text-xs px-4 py-1 rounded-full tracking-wider uppercase">
              Berita Terbaru
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tren <span className="text-amber-300">Kopi Susu</span> di Tahun 2025: 
              Inovasi dan Teknologi Menyatu
            </h1>
            <p className="text-sm md:text-base text-amber-100">
              Inovasi mesin kopi dan tren kopi susu kekinian kini berpadu dengan teknologi digital — 
              menjadikan pengalaman menikmati kopi semakin personal dan modern.
            </p>
            <Link
              to="#"
              className="inline-block bg-white text-[#542E1D] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-amber-100 transition"
            >
              Baca Selengkapnya →
            </Link>
          </div>

          {/* Kanan: Gambar */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
              alt="Kopi Susu Trend"
              className="w-[420px] h-[420px] object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* ===== Artikel Lainnya ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-12 text-[#542E1D]">Artikel Lainnya</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Blog Card 1 */}
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93"
              alt="Sejarah Kopi"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Sejarah
              </span>
              <h3 className="font-bold text-xl mt-3 mb-2">Sejarah Kopi Nusantara</h3>
              <p className="text-sm text-gray-600 mb-4">
                Menelusuri perjalanan kopi dari zaman kolonial hingga menjadi ikon budaya di Indonesia.
              </p>
              <a href="#" className="text-amber-700 font-semibold hover:underline">
                Baca selengkapnya →
              </a>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559526324-593bc073d938"
              alt="Tips Menyeduh"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Tips
              </span>
              <h3 className="font-bold text-xl mt-3 mb-2">Tips Menyeduh Kopi di Rumah</h3>
              <p className="text-sm text-gray-600 mb-4">
                Cara sederhana membuat seduhan kopi nikmat tanpa perlu alat mahal.
              </p>
              <a href="#" className="text-amber-700 font-semibold hover:underline">
                Baca selengkapnya →
              </a>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1510626176961-4b57d4fbad03"
              alt="Jenis Kopi"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Knowledge
              </span>
              <h3 className="font-bold text-xl mt-3 mb-2">Mengenal Jenis-jenis Kopi</h3>
              <p className="text-sm text-gray-600 mb-4">
                Robusta, Arabica, Liberica, dan Excelsa — apa perbedaan cita rasa dan karakteristiknya?
              </p>
              <a href="#" className="text-amber-700 font-semibold hover:underline">
                Baca selengkapnya →
              </a>
            </div>
          </div>
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

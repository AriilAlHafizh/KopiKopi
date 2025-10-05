import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="font-[Poppins,sans-serif] bg-gray-50 text-gray-800">
      {/* ===== Navbar ===== */}
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

      {/* Hero Contact */}
      {/* Hero Contact (Full Screen) */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url('/src/assets/image/2.jpg')`, // background hero
        }}
      >
        {/* Overlay gradasi agar teks terbaca */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Konten Teks */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Hubungi Kami untuk Kopi Terbaik Anda
          </h1>
          <p className="text-gray-200 text-lg mb-8 leading-relaxed">
            Kami siap membantu Anda menemukan cita rasa kopi terbaik. Kirimkan pesan
            Anda, dan tim kami akan segera menghubungi Anda.
          </p>
          {/* Tombol Scroll ke Section Contact */}
          <a
                            // Menggunakan warna kustom #B27F5A (sesuai visual)
                            // Meningkatkan padding untuk meniru ukuran pada gambar
                            href="#contact"
                            className="bg-[#B27F5A] text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:bg-[#A36C4D] transition transform hover:scale-105 text-lg"
                        >
                            Hubungi Sekarang
                        </a>
        </div>

        {/* Gradasi bawah agar transisi lembut ke section berikut */}
        
      </section>




      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-20 grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition">
          <h2 className="text-3xl font-bold text-[#542E1D] mb-6">Kirim Pesan</h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-500">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
                <input type="text" placeholder="Nama lengkap"
                  className="w-full focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-amber-500">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16 12H8m8 0H8m8 0l-8-4m8 4l-8 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input type="email" placeholder="Email Anda"
                  className="w-full focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
              <textarea rows="5" placeholder="Tulis pesan Anda di sini..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-500 focus:outline-none"></textarea>
            </div>

            <button type="submit"
              className="w-full bg-[#A0583C] hover:bg-[#8b4b34] text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-[1.02]">
              Kirim Pesan
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-[#542E1D] mb-6">Informasi Kontak</h2>
            <p className="text-gray-600 mb-8">
              Kunjungi kami langsung atau hubungi melalui kontak berikut. Kami senang mendengar dari Anda!
            </p>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-center gap-4">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full">
                  📍
                </div>
                <span>Jl. Kopi No. 123, Bandung</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full">
                  ✉️
                </div>
                <span>info@kopiindonesia.com</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-full">
                  📞
                </div>
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.500676877266!2d107.60981187502067!3d-7.066604092927662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7f4b6cd6e6f%3A0x3e64785f3e85d6a!2sBandung!5e0!3m2!1sid!2sid!4v1696483999999!5m2!1sid!2sid"
              width="100%" height="280" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white pt-16 pb-6">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-10">
            <div>
              <h3 className="font-bold text-lg mb-4">HAFIZH KOPI</h3>
              <p>Menyajikan kopi premium terbaik untuk memulai hari Anda dengan semangat.</p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500">f</a>
                <a href="#" className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500">t</a>
                <a href="#" className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500">i</a>
                <a href="#" className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center hover:bg-yellow-500">y</a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400">Home</a></li>
                <li><a href="#" className="hover:text-yellow-400">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-400">Products</a></li>
                <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">PRODUCTS</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-400">Arabica</a></li>
                <li><a href="#" className="hover:text-yellow-400">Robusta</a></li>
                <li><a href="#" className="hover:text-yellow-400">Specialty</a></li>
                <li><a href="#" className="hover:text-yellow-400">Coffee Blend</a></li>
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

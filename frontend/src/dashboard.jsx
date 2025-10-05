import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Diperlukan untuk navigasi di navbar
import { motion } from 'framer-motion';

// --- Placeholder/Komponen Pembantu (Sesuai Kebutuhan) ---
// Ikon Placeholder untuk Footer (misalnya, Facebook)
const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-white transition">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);
// Ikon Placeholder untuk Metode Proses Kopi (misalnya, Wash Process)
const WaterDropIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mx-auto">
        <path d="M12 2a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8z"></path>
        <path d="M12 16a4 4 0 0 0 4-4c0-2-4-6-4-6s-4 4-4 6a4 4 0 0 0 4 4z"></path>
    </svg>
);
// -----------------------------------------------------------------------------


const categories = [
    { name: 'ROBUSTA', desc: 'cita rasa kuat, pahit khas, dengan body tebal dan kandungan kafein lebih tinggi. Cocok untuk pecinta kopi berkarakter bold.', color: 'bg-green-800', img: 'bgdashboard.jpg' },
    { name: 'ARABICA', desc: 'Rasa kuat, pahit khas, body tebal, dan kafein tinggi. Cocok untuk pecinta kopi berkarakter bold dan penuh energi.', color: 'bg-red-900', img: 'arabika.jpg' },
    { name: 'LIBERICA', desc: 'Kopi unik dengan aroma buah dan floral yang khas. Lebih ringan dari robusta, tapi punya aftertaste eksotis yang jarang ditemui.', color: 'bg-purple-900', img: '2.jpg' },
    { name: 'EXCELSA', desc: 'Rasa asam segar dengan sentuhan fruity & spicy. Cocok untuk pencinta kopi yang ingin pengalaman rasa berbeda.', color: 'bg-orange-800', img: 'berita.jpg' },
];

const processes = [
    { name: 'WASHED', desc: 'Clean, Bright, Acidity Segar', desc2: 'Pecinta rasa kopi ringan & fruity', icon: WaterDropIcon, color: 'bg-[#D9F0F7]' },
    { name: 'NATURAL', desc: 'Manis, Fruity, Bold', desc2: 'Pecinta rasa kopi bold, manis, berkarakter buah yang kuat.', icon: WaterDropIcon, color: 'bg-[#FCE9E4]' },
    { name: 'HONEY', desc: 'Balance', desc2: 'Seimbang antara manis dan acidity', icon: WaterDropIcon, color: 'bg-[#FDF1DD]' },
    { name: 'GILING BASAH', desc: 'Body tebal, earthy', desc2: 'pecinta kopi tubruk atau espresso pekat.', icon: WaterDropIcon, color: 'bg-[#E9D9CF]' },
];

// --- Komponen Pembantu ---
const CategoryCard = ({ name, desc, color, img }) => (
    <motion.div
        className={`rounded-xl shadow-lg p-4 h-full relative overflow-hidden text-white ${color}`}
        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0,0,0,0.2)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(/src/assets/image/${img})` }}></div>
        <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-xl font-bold mb-1 tracking-wide">{name}</h3>
                <p className="text-sm opacity-90">{desc}</p>
            </div>
            <button className="mt-4 text-xs font-semibold py-1 px-3 w-fit rounded-full border border-white hover:bg-white hover:text-black transition">
                Lihat Semua
            </button>
        </div>
    </motion.div>
);

const NewsCard = ({ type, img }) => (
    <motion.div
        className="w-full bg-white/24 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col"
        whileHover={{ translateY: -5, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3 }}
    >
        <div className="h-46 justify-center items-center">
            <div className="flex space-x-2 w-full h-full justify-center items-center">
                <img
                    src={img}
                    alt={`Gambar Kemasan Kopi ${type}`}
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
        {/* Konten Teks di bawah gambar */}
        <div className="p-6 flex flex-col pt-1">
            <h4 className="text-xl font-extrabold text-gray-900 mb-2 leading-snug uppercase">
                EXCELSIA
            </h4>
            {/* Deskripsi utama */}
            <p className="text-sm text-gray-900 mb-6">
                Rasa asam segar dengan sentuhan fruity & spicy. Cocok untuk pencinta kopi yang ingin pengalaman rasa berbeda.
            </p>
            {/* Link diubah agar terlihat seperti di gambar referensi */}
            <div className="flex items-center space-x-2 font-bold text-gray-900 hover:text-yellow-800 transition">
                <p className="text-base">Selengkapnya</p>
                {/* SVG Panah */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
        </div>
    </motion.div>
);

export default function Dashboard() {
    const heroBg = "url('/src/assets/image/bgdashboard.jpg')";
    const ctaBg = "url('/src/assets/image/cta.png')";
    const blogBg = "url('/src/assets/image/blog.png')";

    return (
        <div className="bg-[#F9F6EE] font-sans min-h-screen overflow-hidden">

            {/* Bagian 1: Hero Section (NAVBAR TERINTEGRASI) */}
            <div
                className="h-[100vh] flex flex-col bg-cover bg-center relative"
                style={{ backgroundImage: heroBg }}
            >
                {/* 1. Lapisan Gelap Tipis */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* 2. Navigasi (Ditempatkan di dalam Hero) */}
                <header className="relative z-20 w-full">
                    <nav className="max-w-7xl mx-auto py-4 flex justify-between items-center text-white">

                        {/* 1. Logo */}
                        <Link to="/"> {/* Bungkus gambar dengan Link jika logo berfungsi sebagai link ke homepage */}
                            <img
                                src="/src/assets/image/LOGO.png" // 👈 PASTIKAN PATH INI BENAR!
                                alt="Hafizh Kopi Logo"
                                className="h-10" // Atur tinggi gambar sesuai kebutuhan
                            />
                        </Link>

                        {/* 2. Menu Navigasi (tetap rapi di tengah) */}
                        <div className="hidden md:flex space-x-8 text-base font-medium ml-16 ">
                            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
                            <Link to="/About" className="hover:text-yellow-400 transition">About Us</Link>
                            <Link to="/Shop" className="hover:text-yellow-400 transition">Shop</Link>
                            <Link to="/Blog" className="hover:text-yellow-400 transition">Blog</Link>
                            <Link to="/Contact" className="hover:text-yellow-400 transition">Contact Us</Link>
                        </div>

                        <div className="flex items-center space-x-2">

                            {/* Kotak Pencarian (Input Putih & Tombol Hitam) */}
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    placeholder="Cari kopi.."
                                    // 👈 Input PUTIH dengan sudut melengkung di kiri
                                    className="px-4 py-2 w-36 sm:w-35 text-gray-900 bg-white rounded-l-xl focus:outline-none text-sm"
                                />
                                {/* Tombol Pencarian */}
                                <button
                                    // 👈 Tombol HITAM dengan sudut melengkung di kanan
                                    className="bg-black text-white px-3 py-2 rounded-r-xl h-full hover:bg-gray-800 transition"
                                >
                                    {/* SVG Ikon Kaca Pembesar */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
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

                {/* 3. Konten Utama Hero (Teks & Tombol) */}
                <motion.div
                    className="flex-grow flex items-center justify-center relative z-10 text-center text-white pb-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div>
                        <h2 className="text-5xl font-extrabold mb-3 tracking-tight text-[#FFFADA]">Cari Kopi Terbaik Anda</h2>
                        <p className="text-lg mb-6 text-[#CCB9B1]">Mulai Hari dengan Biji Kopi Terbaik</p>

                        {/* ⚠️ TOMBOL MULAI DIUBAH WARNANYA ⚠️ */}
                        <button
                            // Menggunakan warna kustom #B27F5A (sesuai visual)
                            // Meningkatkan padding untuk meniru ukuran pada gambar
                            className="bg-[#B27F5A] text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:bg-[#A36C4D] transition transform hover:scale-105 text-lg"
                        >
                            Mulai
                        </button>
                    </div>
                </motion.div>
            </div>
            {/* --- */}

            {/* Bagian 2: Shop By Category */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Shop By Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <CategoryCard key={index} {...cat} />
                    ))}
                </div>
            </section>
            {/* --- */}

            {/* Bagian 3: Metode Proses Kopi */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                <h3 className="text-2xl font-bold text-center mb-10 text-gray-800">Metode Proses Kopi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {processes.map((proc, index) => (
                        <motion.div
                            key={index}
                            className={`rounded-xl shadow-md p-6 text-center ${proc.color} border border-gray-100`}
                            whileHover={{ translateY: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-center mb-3">
                                {proc.icon && <proc.icon />}
                            </div>
                            <h4 className="text-lg font-semibold text-black-800 mb-1">{proc.name}</h4>
                            <p className="text-sm font-semibold text-gray-800">{proc.desc}</p>
                            <p className="text-sm text-gray-600">{proc.desc2}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
            {/* --- */}

            {/* Bagian 4: Berita Perkopiian (dengan Latar Belakang Cokelat) */}
            <section
                className="py-32 relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: blogBg }}
            >
                <div className="max-w-6xl mx-auto px-6 relative z-10"> {/* max-w-7xl diubah menjadi max-w-6xl */}

                    <div className="relative z-20">
                        {/* ⚠️ PERUBAHAN MARGIN ⚠️ */}
                        <h3 className="text-3xl font-bold text-center -mt-14 mb-30 text-white">Berita Perkopiian</h3>
                        {/* ^^^^^^^^^ DIUBAH DARI mb-10 MENJADI mb-20 */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Catatan: NewsCard di dalamnya tetap bg-white, ini bagus untuk kontras */}
                            <NewsCard type="EXCELSA" img="/src/assets/image/berita.jpg" />
                            <NewsCard type="ARABICA" img="/src/assets/image/berita.jpg" />
                            <NewsCard type="ROBUSTA" img="/src/assets/image/berita.jpg" />
                        </div>
                    </div>
                </div>
            </section>
            {/* --- */}

            {/* Bagian 5: Call to Action (CTA) */}
            <section className="relative py-20 flex justify-center w-full">
                {/* Kontainer Kartu Modal */}
                <motion.div
                    className="relative py-16 px-6 sm:px-16 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-cover bg-center"
                    style={{ backgroundImage: ctaBg }} // Menggunakan gambar background yang baru
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Lapisan Gelap di dalam Kartu - DITAMBAH KEMBALI agar teks terlihat jelas di atas gambar */}
                    <div className="absolute inset-0"></div>

                    {/* Konten Teks dan Tombol */}
                    {/* Menggunakan shadow teks agar lebih terlihat jelas */}
                    <div className="relative z-10 text-center">
                        <h3 className="text-4xl text-black  text-shadow-md font-extrabold mb-3 tracking-tight">
                            Ayo Mulai Nikmati Dari Kamu!
                        </h3>
                        <p className="text-lg text-[#302A2A] mb-8 max-w-xl mx-auto">
                            Bergabunglah dengan ribuan pelanggan yang telah merasakan kelezatan kopi premium kami
                        </p>
                        {/* Tombol Selengkapnya (dengan warna kustom yang baru) */}
                        <button className="bg-[#B27F5A] text-white font-semibold py-3 px-10 rounded-xl shadow-xl hover:bg-[#A36C4D] transition transform hover:scale-105">
                            Selengkapnya
                        </button>
                    </div>
                </motion.div>
            </section>
            {/* --- */}

            {/* Bagian 6: Footer */}
            <footer className="bg-[#8D6E63] text-gray-300 py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        {/* Kolom 1: Logo & Kontak */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-4">Hafizh Kopi</h4>
                            <p className="text-sm mb-3">Jl. Diponegoro, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115</p>
                            <p className="text-sm">hafizhkopi@gmail.com</p>
                            <div className="flex space-x-4 mt-4">
                                <FacebookIcon />
                                {/* ... ikon sosial lainnya ... */}
                            </div>
                        </div>

                        {['CATEGORIES'].map((title) => (
                            <div key={title}>
                                <h5 className="text-sm font-semibold text-white mb-4">{title}</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Robusta</a></li>
                                    <li><a href="#" className="hover:text-white transition">Arabika</a></li>
                                    <li><a href="#" className="hover:text-white transition">Liberika</a></li>
                                    <li><a href="#" className="hover:text-white transition">Excelsa</a></li>
                                </ul>
                            </div>
                        ))}

                        {/* Kolom 2, 3, 4, 5: Link Cepat */}
                        {['METHOD'].map((title) => (
                            <div key={title}>
                                <h5 className="text-sm font-semibold text-white mb-4">{title}</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Washed</a></li>
                                    <li><a href="#" className="hover:text-white transition">Natural</a></li>
                                    <li><a href="#" className="hover:text-white transition">Honey</a></li>
                                    <li><a href="#" className="hover:text-white transition">Giling Basah</a></li>
                                </ul>
                            </div>
                        ))}

                        {['HELP CENTER'].map((title) => (
                            <div key={title}>
                                <h5 className="text-sm font-semibold text-white mb-4">{title}</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Customer Service</a></li>
                                    <li><a href="#" className="hover:text-white transition">Policy</a></li>
                                    <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
                                    <li><a href="#" className="hover:text-white transition">Trach Order</a></li>
                                    <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                                    <li><a href="#" className="hover:text-white transition">My Account</a></li>
                                    <li><a href="#" className="hover:text-white transition">roduct Support</a></li>
                                </ul>
                            </div>
                        ))}

                        {['PARTNER'].map((title) => (
                            <div key={title}>
                                <h5 className="text-sm font-semibold text-white mb-4">{title}</h5>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white transition">Become Seller</a></li>
                                    <li><a href="#" className="hover:text-white transition">Affiliate</a></li>
                                    <li><a href="#" className="hover:text-white transition">Advertise</a></li>
                                    <li><a href="#" className="hover:text-white transition">Partnership</a></li>
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Sub Footer - Subscribe & Copyright */}
                    <div className="border-t border-gray-600 mt-10 pt-6 text-center">
                        <p className="text-sm mb-4">SIGN UP & GET <span className="text-yellow-500 font-bold">20% OFF</span> FOR YOUR FIRST ORDER</p>
                        <div className="flex justify-center mb-6">
                            <input type="email" placeholder="Email Anda" className="p-2 rounded-l-md bg-white text-gray-800 w-full max-w-xs focus:outline-none" />
                            <button className="bg-yellow-800 px-4 rounded-r-md hover:bg-yellow-700 transition font-medium text-white">SIGN UP</button>
                        </div>

                        <div className="text-xs text-gray-500 mt-6">
                            © 2024 Hafiz Kopi. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
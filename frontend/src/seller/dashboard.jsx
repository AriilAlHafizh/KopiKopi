import React from 'react';
import { useAuth } from '../context/AuthContext'; // Sesuaikan path jika perlu
import { useNavigate } from 'react-router-dom';

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

     return (
    <div className="text-gray-800 bg-[#f9f6f1] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3E2C20] text-[#f3eee7] flex flex-col">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-[#5a4334] flex justify-between items-center">
          <span>☕ KopiKu Seller</span>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-xs bg-[#5a4334] hover:bg-[#7a5e48] px-2 py-1 rounded-lg"
          >
            Keluar
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-3 text-sm">
          <a href="#" className="block py-2 px-3 rounded-lg bg-[#5a4334]">
            Dashboard
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-[#5a4334]/60">
            Produk Saya
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-[#5a4334]/60">
            Pesanan
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-[#5a4334]/60">
            Pendapatan
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-[#5a4334]/60">
            Ulasan
          </a>
          <a href="#" className="block py-2 px-3 rounded-lg hover:bg-[#5a4334]/60">
            Pengaturan Toko
          </a>
        </nav>

        <div className="p-4 border-t border-[#5a4334] text-xs text-center">
          © 2025 KopiKu
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold">
              Halo, {user?.name || "Barista"}! 👋
            </h1>
            <p className="text-gray-600">Selamat datang kembali di toko kopimu ☕</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#3E2C20] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2f2016]">
              + Tambah Produk
            </button>
            <img
              src={user?.avatar || "https://i.pravatar.cc/50"}
              alt="Seller"
              className="rounded-full w-10 h-10 border border-[#3E2C20]/20"
            />
          </div>
        </div>

        {/* Seller Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&q=80"
              alt="Shop"
              className="w-20 h-20 object-cover rounded-xl"
            />
            <div>
              <h2 className="text-xl font-bold">
                {user?.storeName || "Toko Aroma Nusantara"}
              </h2>
              <p className="text-gray-500 text-sm">
                Menjual kopi lokal terbaik dari petani Indonesia
              </p>
              <div className="flex items-center gap-2 mt-1 text-yellow-500 text-sm">
                ⭐ 4.8 <span className="text-gray-400">•</span> 1.2K Penilaian
              </div>
            </div>
          </div>
          <button className="text-[#3E2C20] border border-[#3E2C20] px-4 py-2 rounded-lg hover:bg-[#3E2C20] hover:text-white text-sm">
            Edit Profil Toko
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            {
              title: "Pendapatan Bulan Ini",
              value: "Rp 12.540.000",
              color: "text-green-600",
              desc: "▲ +8% dari bulan lalu",
            },
            {
              title: "Produk Aktif",
              value: "36",
              color: "text-blue-600",
              desc: "3 produk baru minggu ini",
            },
            {
              title: "Pesanan Diproses",
              value: "18",
              color: "text-orange-500",
              desc: "2 pesanan baru hari ini",
            },
            {
              title: "Ulasan Baru",
              value: "9",
              color: "text-green-600",
              desc: "Pelanggan puas meningkat",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#fffdf9] border border-[#ede5dc] p-5 rounded-xl shadow-sm"
            >
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className="text-2xl font-semibold mt-2">{item.value}</p>
              <p className={`${item.color} text-xs mt-1`}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tabel Produk */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Produk Terbaru</h3>
            <a href="#" className="text-[#3E2C20] text-sm hover:underline">
              Lihat semua
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3eee7] text-gray-700">
                  <th className="py-3 px-4">Nama Produk</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Stok</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nama: "Kopi Gayo Premium",
                    harga: "Rp 120.000",
                    stok: "32",
                    status: "Aktif",
                    color: "text-green-600",
                  },
                  {
                    nama: "Kopi Toraja Asli",
                    harga: "Rp 98.000",
                    stok: "14",
                    status: "Habis",
                    color: "text-orange-500",
                  },
                ].map((p, index) => (
                  <tr key={index} className="border-b hover:bg-[#fdfaf6]">
                    <td className="py-3 px-4">{p.nama}</td>
                    <td className="py-3 px-4">{p.harga}</td>
                    <td className="py-3 px-4">{p.stok}</td>
                    <td className="py-3 px-4">
                      <span className={`${p.color} text-sm`}>{p.status}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-sm text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4">Aktivitas Terbaru</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b pb-2">
              <span>
                Pelanggan <b>Andi</b> memesan <b>Kopi Gayo Premium</b>
              </span>
              <span className="text-gray-400">2 jam lalu</span>
            </li>
            <li className="flex justify-between border-b pb-2">
              <span>Produk <b>Kopi Toraja</b> stok diperbarui</span>
              <span className="text-gray-400">5 jam lalu</span>
            </li>
            <li className="flex justify-between">
              <span>Pelanggan <b>Rina</b> memberikan rating ⭐⭐⭐⭐⭐</span>
              <span className="text-gray-400">1 hari lalu</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

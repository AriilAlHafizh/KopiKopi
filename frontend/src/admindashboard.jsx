import React from "react";

export default function AdminDashboard() {
  return (
    <div className="bg-[#F8F6F4] font-sans min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#4E342E] to-[#8D6E63] text-white flex flex-col shadow-xl">
        <div className="p-6 text-2xl font-bold tracking-wide border-b border-white/20">
          ☕ <span className="ml-2">Admin Panel</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 text-sm">
          {[
            { name: "Dashboard", icon: "🏠" },
            { name: "Produk", icon: "📦" },
            { name: "Pesanan", icon: "🛒" },
            { name: "Pengguna", icon: "👥" },
            { name: "Pengaturan", icon: "⚙️" },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="block py-2.5 px-4 rounded-lg transition-all duration-300 hover:bg-white/15 hover:translate-x-1"
            >
              <span className="mr-2">{item.icon}</span> {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
          <button className="w-full py-2 px-4 bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8D6E63] transition"
            />
            <div className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300 transition">
              🔔
            </div>
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-[#8D6E63] shadow-sm"
            />
          </div>
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Total Produk",
              value: "120",
              color: "text-[#4E342E]",
              border: "border-[#4E342E]",
            },
            {
              title: "Pesanan",
              value: "89",
              color: "text-green-600",
              border: "border-green-600",
            },
            {
              title: "Pengguna",
              value: "56",
              color: "text-blue-600",
              border: "border-blue-600",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg border-l-4 ${card.border} transition-all duration-300`}
            >
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                {card.title}
              </h2>
              <p className={`text-4xl font-bold mt-2 ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabel Data Produk */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Daftar Produk
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#F0E6E1] text-gray-700 uppercase text-sm">
                  <th className="py-3 px-4">Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga</th>
                  <th className="py-3 px-4">Stok</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    nama: "Kopi Robusta",
                    kategori: "Biji Kopi",
                    harga: "Rp 45.000",
                    stok: 120,
                  },
                  {
                    nama: "Kopi Arabica",
                    kategori: "Biji Kopi",
                    harga: "Rp 60.000",
                    stok: 80,
                  },
                ].map((produk, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {produk.nama}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {produk.kategori}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{produk.harga}</td>
                    <td className="py-3 px-4 text-gray-700">{produk.stok}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-all duration-300">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

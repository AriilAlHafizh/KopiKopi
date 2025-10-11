import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import SidebarSeller from "../components/SidebarSeller";

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProduk: 0,
    totalPenjualan: 0,
    rating: 4.8,
    stokRendah: 0,
  });
  const [produkList, setProdukList] = useState([]);
  const [pembelian, setPembelian] = useState([]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    // 🔹 Ambil data dummy (bisa diganti dengan API real)
    const fetchData = async () => {
      try {
        const produkRes = await axios.get("http://localhost:5000/products");
        const orderRes = await axios.get("http://localhost:5000/orders");
        const lowStock = produkRes.data.filter((p) => p.stok < 5).length;

        setStats({
          totalProduk: produkRes.data.length,
          totalPenjualan: orderRes.data.length,
          rating: 4.8,
          stokRendah: lowStock,
        });

        setProdukList(produkRes.data.slice(0, 5));
        setPembelian(orderRes.data.slice(0, 5));
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Data contoh untuk grafik
  const salesData = [
    { day: "Sen", total: 2000000 },
    { day: "Sel", total: 3200000 },
    { day: "Rab", total: 2800000 },
    { day: "Kam", total: 4000000 },
    { day: "Jum", total: 3500000 },
    { day: "Sab", total: 2200000 },
    { day: "Min", total: 3000000 },
  ];

  return (
    <div className="flex h-screen bg-stone-100 font-[Inter]">
        {/* Ganti seluruh aside dengan ini */}
        <SidebarSeller onLogout={handleLogout} />


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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Total Produk", value: stats.totalProduk, color: "text-blue-600", desc: "Produk aktif di etalase" },
            { title: "Total Penjualan", value: stats.totalPenjualan, color: "text-green-600", desc: "Transaksi sukses bulan ini" },
            { title: "Rating Toko", value: stats.rating, color: "text-yellow-500", desc: "Berdasarkan ulasan pelanggan" },
            { title: "Stok Rendah", value: stats.stokRendah, color: "text-red-500", desc: "Perlu restock segera" },
          ].map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-gray-500 text-sm">{item.title}</h3>
              <p className={`text-2xl font-semibold mt-2 ${item.color}`}>{item.value}</p>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Grafik Penjualan Mingguan */}
        <div className="bg-white p-6 rounded-2xl shadow mb-10">
          <h3 className="font-semibold text-lg mb-4">📈 Statistik Penjualan Minggu Ini</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(val) => `Rp ${val.toLocaleString()}`} />
              <Line type="monotone" dataKey="total" stroke="#3E2C20" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Produk Terbaru */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">🛍️ Produk Terbaru</h3>
            <a href="/seller/produk/ProdukList" className="text-[#3E2C20] text-sm hover:underline">
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
                </tr>
              </thead>
              <tbody>
                {produkList.map((p, index) => (
                  <tr key={index} className="border-b hover:bg-[#fdfaf6]">
                    <td className="py-3 px-4">{p.nama || p.name}</td>
                    <td className="py-3 px-4">Rp {p.harga?.toLocaleString() || "—"}</td>
                    <td className="py-3 px-4">{p.stok || 0}</td>
                    <td className="py-3 px-4">
                      <span className={`text-sm ${p.stok > 0 ? "text-green-600" : "text-red-500"}`}>
                        {p.stok > 0 ? "Aktif" : "Habis"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pembelian Terbaru */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
          <h3 className="font-semibold text-lg mb-4">🧾 Pembelian Terbaru</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f3eee7] text-gray-700">
                  <th className="py-3 px-4">Pelanggan</th>
                  <th className="py-3 px-4">Produk</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {pembelian.map((o, i) => (
                  <tr key={i} className="border-b hover:bg-[#fdfaf6]">
                    <td className="py-3 px-4">{o.customer || "Pelanggan"}</td>
                    <td className="py-3 px-4">{o.product || "Produk Kopi"}</td>
                    <td className="py-3 px-4">Rp {o.total?.toLocaleString() || "0"}</td>
                    <td className="py-3 px-4">{new Date(o.date || Date.now()).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insight Toko */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold text-lg mb-4">💡 Insight Penjualan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-600 mb-1">Produk Terlaris</h4>
              <p className="font-semibold text-[#3E2C20]">Kopi Gayo Premium</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-600 mb-1">Pelanggan Aktif</h4>
              <p className="font-semibold text-[#3E2C20]">123 pelanggan</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-600 mb-1">Total Omzet Bulan Ini</h4>
              <p className="font-semibold text-[#3E2C20]">Rp 12.540.000</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

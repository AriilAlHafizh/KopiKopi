import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// ✨ BARU: Ikon SVG untuk tampilan yang lebih bersih dan profesional
const Icons = {
  dashboard: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>,
  users: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>,
  products: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
  customers: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>,
  promotions: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 20a10 10 0 110-20 10 10 0 010 20zm1-5a1 1 0 00-2 0v2a1 1 0 002 0v-2zM9 4a1 1 0 011-1h.01a1 1 0 010 2H10a1 1 0 01-1-1z" /></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-1.57 1.996A1.532 1.532 0 013 7.054c-1.56.38-1.56 2.6 0 2.98.63.153 1.034 1.034.948 2.286-.836 1.372.734 2.942 1.996 1.57A1.532 1.532 0 017.054 17c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.372.836 2.942-.734 1.57-1.996A1.532 1.532 0 0117 12.946c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.836-1.372-.734-2.942-1.996-1.57A1.532 1.532 0 0112.946 3c-.38-.153-1.034-1.034-2.286-.948zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>,
  logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    pelanggan: 0,
    promosi: 0,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, productRes, pelangganRes, promosiRes] = await Promise.all([
          axios.get("http://localhost:5000/users").catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/products"),
          axios.get("http://localhost:5000/pelanggans").catch(() => ({ data: [] })),
          axios.get("http://localhost:5000/promosi").catch(() => ({ data: [] })),
        ]);

        setStats({
          users: userRes.data.length,
          products: productRes.data.length,
          pelanggan: pelangganRes.data.length,
          promosi: promosiRes.data.length,
        });
      } catch (err) {
        console.error("Gagal memuat statistik:", err);
      }
    };

    fetchStats();
  }, []);
  
  // 🎨 Data navigasi dengan ikon SVG
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Icons.dashboard },
    { name: "Pengguna", path: "/admin/usertable/UserList", icon: Icons.users },
    { name: "Produk Kopi", path: "/admin/produk/ProduksList", icon: Icons.products },
    { name: "Pelanggan", path: "/admin/pelanggan", icon: Icons.customers },
    { name: "Promosi", path: "/admin/promosi", icon: Icons.promotions },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: Icons.settings },
  ];

  return (
    // 🎨 Latar belakang utama dengan warna hangat yang lembut
    <div className="flex h-screen bg-stone-100 font-[Inter]">
      {/* SIDEBAR */}
      {/* 🎨 Sidebar dengan gradien tema kopi yang Anda minta */}
      <aside className="w-64 bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-stone-200 flex flex-col shadow-2xl">
        <div className="h-20 flex items-center justify-center px-4 border-b border-white/10">
        <img
        src="/src/assets/image/LOGO.png"
        alt="Hafizh Kopi Logo"
        className="h-10"
        
          />
        </div>


        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-white/20 text-white font-semibold shadow-inner"
                    : "hover:bg-white/10"
                }`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-6 border-t border-white/10">
  <button
    onClick={handleLogout}
    className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-gray-200 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
        clipRule="evenodd"
      />
    </svg>
    <span className="ml-2">Keluar</span>
  </button>
</div>

      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 🎨 Header dengan sapaan pengguna dan avatar */}
        <header className="bg-white border-b border-stone-200">
          <div className="mx-auto px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-stone-800">Dashboard</h2>
            <div className="flex items-center space-x-3">
              <span className="text-stone-600">
                Halo, <span className="font-semibold">{user?.name || "Admin"}</span>!
              </span>
              <div className="w-10 h-10 bg-amber-200 text-amber-800 rounded-full flex items-center justify-center font-bold text-lg">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="mx-auto px-6 py-8">
            {/* 🎨 Kartu Statistik dengan ikon dan efek hover yang ditingkatkan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { title: 'Total Pengguna', value: stats.users, icon: Icons.users, color: 'sky' },
                { title: 'Total Produk Kopi', value: stats.products, icon: Icons.products, color: 'amber' },
                { title: 'Total Pelanggan', value: stats.pelanggan, icon: Icons.customers, color: 'emerald' },
                { title: 'Total Promosi', value: stats.promosi, icon: Icons.promotions, color: 'rose' },
              ].map((stat, i) => (
                <div key={i} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4 border-l-4 border-${stat.color}-500`}>
                  <div className={`bg-${stat.color}-100 p-3 rounded-full text-${stat.color}-600`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-stone-500 text-sm font-medium">{stat.title}</div>
                    <div className={`text-3xl font-bold text-${stat.color}-600 mt-1`}>{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 🎨 Wrapper untuk Outlet agar halaman anak konsisten */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
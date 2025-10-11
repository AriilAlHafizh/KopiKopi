import React from "react";
import { NavLink } from "react-router-dom";

// 🎨 Kumpulan ikon SVG agar tetap seragam
const Icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
  ),
  products: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  customers: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  promotions: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 20a10 10 0 110-20 10 10 0 010 20zm1-5a1 1 0 00-2 0v2a1 1 0 002 0v-2zM9 4a1 1 0 011-1h.01a1 1 0 010 2H10a1 1 0 01-1-1z" />
    </svg>
  ),
  settings: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-1.57 1.996A1.532 1.532 0 013 7.054c-1.56.38-1.56 2.6 0 2.98.63.153 1.034 1.034.948 2.286-.836 1.372.734 2.942 1.996 1.57A1.532 1.532 0 017.054 17c.38 1.56 2.6 1.56 2.98 0a1.532 1.532 0 012.286-.948c1.372.836 2.942-.734 1.57-1.996A1.532 1.532 0 0117 12.946c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.286c.836-1.372-.734-2.942-1.996-1.57A1.532 1.532 0 0112.946 3c-.38-.153-1.034-1.034-2.286-.948zM10 13a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export default function Sidebar({ onLogout }) {
  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Icons.dashboard },
    { name: "Pengguna", path: "/admin/usertable/UserList", icon: Icons.users },
    { name: "Produk Kopi", path: "/admin/produk/ProduksList", icon: Icons.products },
    { name: "Pelanggan", path: "/admin/pelanggan", icon: Icons.customers },
    { name: "Promosi", path: "/admin/promosi", icon: Icons.promotions },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: Icons.settings },
  ];

  return (
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
                isActive ? "bg-white/20 text-white font-semibold shadow-inner" : "hover:bg-white/10"
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
          onClick={onLogout}
          className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-gray-200 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
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
  );
}

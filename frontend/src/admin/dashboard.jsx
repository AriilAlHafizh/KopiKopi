import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-[Inter]">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-gray-300 flex flex-col">
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-slate-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-indigo-400 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v11.494m-9-5.747h18M5.45 7.427L3.625 5.602m14.95 
              1.825L20.375 5.602M5.45 16.573L3.625 18.398m14.95-1.825L20.375 
              18.398M9 4.134l-1.125-1.125M15 4.134l1.125-1.125M9 
              19.866l-1.125 1.125M15 19.866l1.125 1.125"
            />
          </svg>
          <span className="text-white text-xl font-bold">KopiKita Admin</span>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          {[
            { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
            { name: "Pengguna", path: "/admin/user/UserList", icon: "👥" },
            { name: "Produk Kopi", path: "/admin/produk", icon: "☕" },
            { name: "Pelanggan", path: "/admin/pelanggan", icon: "🛍️" },
            { name: "Promosi", path: "/admin/promosi", icon: "📢" },
            { name: "Pengaturan", path: "/admin/pengaturan", icon: "⚙️" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-slate-700 text-white font-semibold"
                    : "hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm text-gray-200 bg-slate-700 hover:bg-slate-600 transition"
          >
            <svg
              className="h-5 w-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16L21 12M21 12L17 8M21 12H9M7 20H5C3.9 20 3 19.1 3 18V6C3 4.9 3.9 4 5 4H7"
              />
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="mx-auto px-6 py-4 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Cari data, produk, atau pengguna..."
                className="w-full bg-gray-100 border border-transparent rounded-lg py-2 pl-10 pr-4 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex items-center space-x-5">
              <button className="text-gray-500 hover:text-gray-800 relative">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 
                    0118 14.158V11a6 6 0 10-12 0v3.159c0 
                    .538-.214 1.055-.595 1.436L4 17h5m6 
                    0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="flex items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/40?u=admin"
                  alt="Admin Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {user?.name || "Admin Utama"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.role || "admin"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

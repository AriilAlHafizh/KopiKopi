import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminPengguna() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    alamat: "",
    no_tlp: "",
    password: "",
    role: "",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Pengguna", path: "/admin/pengguna", icon: "👥" },
    { name: "Produk Kopi", path: "/admin/produk", icon: "☕" },
    { name: "Pelanggan", path: "/admin/pelanggan", icon: "🛍️" },
    { name: "Promosi", path: "/admin/promosi", icon: "📢" },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: "⚙️" },
  ];

  // 🔹 Ambil data pengguna dari backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Gagal memuat data pengguna:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Simpan perubahan (tambah/edit)
  const handleSave = async () => {
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/users/${editingUser.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/users", formData);
      }
      setShowModal(false);
      setEditingUser(null);
      window.location.reload(); // refresh sementara
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
    }
  };

  // 🔹 Hapus user
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pengguna ini?")) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        console.error("Gagal menghapus pengguna:", err);
      }
    }
  };

  // 🔹 Buka modal tambah/edit
  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user || { name: "", email: "", alamat: "", no_tlp: "", password: "" }
    );
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-[Inter]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-800 text-gray-300 flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-slate-700">
          <span className="text-white text-xl font-bold">☕ KopiKita Admin</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 ${
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

        <div className="px-4 py-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm text-gray-200 bg-slate-700 hover:bg-slate-600 transition"
          >
            🚪 Keluar
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Daftar Pengguna 👥
          </h2>
          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 text-sm"
          >
            + Tambah Pengguna
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {loading ? (
            <p className="text-center text-gray-600">Memuat data pengguna...</p>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b text-gray-700">
                      <th className="py-3 px-4">Nama</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Alamat</th>
                      <th className="py-3 px-4">No Telepon</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u, i) => (
                        <tr
                          key={i}
                          className="border-b hover:bg-gray-50 transition duration-150"
                        >
                          <td className="py-3 px-4">{u.name}</td>
                          <td className="py-3 px-4">{u.email}</td>
                          <td className="py-3 px-4">{u.alamat}</td>
                          <td className="py-3 px-4">{u.no_tlp}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => openModal(u)}
                              className="text-sm text-blue-600 hover:underline mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-6 text-gray-500">
                          Tidak ada data pengguna
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL TAMBAH / EDIT */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingUser ? "Edit Pengguna" : "Tambah Pengguna"}
            </h3>

            <div className="space-y-3">
              {["name", "email", "alamat", "no_tlp", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

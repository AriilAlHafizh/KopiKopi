import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/SidebarAdmin";

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
    { name: "Pengguna", path: "/admin/usertable/UserList", icon: "👥" },
    { name: "Produk Kopi", path: "/admin/produk/ProduksList", icon: "☕" },
    { name: "Pelanggan", path: "/admin/pelanggan", icon: "🛍️" },
    { name: "Promosi", path: "/admin/promosi", icon: "📢" },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: "⚙️" },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users", {
          withCredentials: true,
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Gagal memuat data pengguna:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.log("Akses ditolak. Mohon login ulang.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      const payload = { ...formData, confPassword: formData.password };

      if (editingUser) {
        await axios.patch(`http://localhost:5000/users/${editingUser.id}`, payload);
      } else {
        await axios.post("http://localhost:5000/users", payload);
      }

      alert("Data pengguna berhasil disimpan!");
      setShowModal(false);
      setEditingUser(null);
      window.location.reload();
    } catch (err) {
      console.error("Gagal menyimpan data:", err.response?.data || err.message);
      alert(`Terjadi kesalahan: ${err.response?.data?.msg || "saat menyimpan data."}`);
    }
  };

  const openModal = (user = null) => {
    setEditingUser(user);
    setFormData(
      user || { name: "", email: "", alamat: "", no_tlp: "", password: "", role: "" }
    );
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-stone-100 font-[Inter]">
    {/* Ganti seluruh aside dengan ini */}
    <Sidebar onLogout={handleLogout} />

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* HEADER */}
        <header className="bg-white/90 backdrop-blur-md shadow-sm flex justify-between items-center px-8 py-5 rounded-b-2xl border-b border-gray-200 sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            👥 <span>Daftar Pengguna</span>
          </h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white px-5 py-2.5 rounded-lg hover:bg-indigo-500 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-lg">+</span> Tambah Pengguna
          </button>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-gray-600">
              <span className="animate-pulse">Memuat data pengguna...</span>
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-3 flex items-center gap-2">
                📋 <span>Tabel Data Pengguna</span>
              </h3>

              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-br from-[#542E1D] to-[#A0583C] text-white text-sm uppercase">
                      <th className="py-3 px-5 font-medium">Nama</th>
                      <th className="py-3 px-5 font-medium">Email</th>
                      <th className="py-3 px-5 font-medium">Alamat</th>
                      <th className="py-3 px-5 font-medium">No Telepon</th>
                      <th className="py-3 px-5 font-medium">Role</th>
                      <th className="py-3 px-5 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u, i) => (
                        <tr
                          key={i}
                          className={`transition-all duration-200 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                          } hover:bg-indigo-50/70`}
                        >
                          <td className="py-3 px-5 text-gray-800 font-medium">{u.name}</td>
                          <td className="py-3 px-5 text-gray-600">{u.email}</td>
                          <td className="py-3 px-5 text-gray-600">{u.alamat}</td>
                          <td className="py-3 px-5 text-gray-600">{u.no_tlp}</td>
                          <td className="py-3 px-5">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                                u.role === "admin"
                                  ? "bg-green-100 text-green-700"
                                  : u.role === "seller"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => openModal(u)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 active:scale-95 transition-all shadow-sm hover:shadow-md"
                              >
                                ✏️ <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDelete(u.id)}
                                className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition-all shadow-sm hover:shadow-md"
                              >
                                🗑️ <span>Hapus</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-8 text-gray-500 italic"
                        >
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 w-[400px] shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-5 text-gray-800 border-b pb-3">
              {editingUser ? "✏️ Edit Pengguna" : "➕ Tambah Pengguna"}
            </h3>

            <div className="space-y-3">
              {["name", "email", "alamat", "no_tlp", "role", "password"].map(
                (field) => (
                  <input
                    key={field}
                    type={field === "password" ? "password" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-200"
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                  />
                )
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-500 shadow-md hover:shadow-lg transition-all duration-300"
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

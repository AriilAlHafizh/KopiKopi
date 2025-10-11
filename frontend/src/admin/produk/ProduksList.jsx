import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/SidebarAdmin";

export default function AdminProduk() {
  const { user, logout } = useAuth(); // ambil data user dari context
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]); // daftar seller untuk dropdown
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    jenis: "",
    harga: "",
    deskripsi: "",
    foto: "",
    userId: "", // <-- untuk menyimpan seller yang dipilih (admin)
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

  // 🔹 Ambil data produk + daftar seller dari backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // ambil produk dan users secara paralel
        const [prodRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/products", { withCredentials: true }),
          axios.get("http://localhost:5000/users", { withCredentials: true }),
        ]);

        setProducts(prodRes.data || []);

        // filter hanya role seller
        const sellerList = (usersRes.data || []).filter((u) => u.role === "seller");
        setSellers(sellerList);
      } catch (err) {
        console.error("Gagal memuat data produk atau seller:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // 🔹 Simpan perubahan (tambah/edit)
  const handleSave = async () => {
    try {
      // Tentukan userId owner produk:
      // - Jika admin: gunakan userId yang dipilih di form (formData.userId). Jika kosong, fallback ke user.id (aman).
      // - Jika seller: gunakan user.id (yang login).
      const ownerId =
        user?.role === "admin"
          ? formData.userId || (editingProduct?.userId ?? user?.id)
          : user?.id;

      const productData = {
        name: formData.name,
        jenis: formData.jenis,
        harga: formData.harga,
        deskripsi: formData.deskripsi,
        foto: formData.foto,
        userId: ownerId,
      };

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/products/${editingProduct.id}`,
          productData,
          { withCredentials: true }
        );
      } else {
        await axios.post("http://localhost:5000/products", productData, {
          withCredentials: true,
        });
      }

      setShowModal(false);
      setEditingProduct(null);

      // refresh data: panggil ulang produk tanpa reload halaman
      setLoading(true);
      const res = await axios.get("http://localhost:5000/products", { withCredentials: true });
      setProducts(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Gagal menyimpan produk:", err.response?.data || err.message);
      // opsional: beri tahu user
      alert(`Gagal menyimpan: ${err.response?.data?.msg || err.message}`);
    }
  };

  // 🔹 Hapus produk
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`, {
          withCredentials: true,
        });
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Gagal menghapus produk:", err);
        alert("Gagal menghapus produk.");
      }
    }
  };

  // 🔹 Buka modal tambah/edit
  const openModal = (product = null) => {
    setEditingProduct(product);

    if (product) {
      // Jika product memiliki relasi user (Users) atau userId, pasang ke formData dengan aman
      setFormData({
        name: product.name || "",
        jenis: product.jenis || "",
        harga: product.harga || "",
        deskripsi: product.deskripsi || "",
        foto: product.foto || "",
        userId: product.userId || product.User?.id || "", // ambil userId dari product
      });
    } else {
      setFormData({
        name: "",
        jenis: "",
        harga: "",
        deskripsi: "",
        foto: "",
        userId: "",
      });
    }

    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-stone-100 font-[Inter]">
    {/* Ganti seluruh aside dengan ini */}
    <Sidebar onLogout={handleLogout} />

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-700">Daftar Produk ☕</h2>
          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 text-sm"
          >
            + Tambah Produk
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {loading ? (
            <p className="text-center text-gray-600">Memuat data produk...</p>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 border-b text-gray-700">
                      <th className="py-3 px-4">Nama Produk</th>
                      <th className="py-3 px-4">Jenis</th>
                      <th className="py-3 px-4">Harga</th>
                      <th className="py-3 px-4">Deskripsi</th>
                      <th className="py-3 px-4">Foto</th>
                      <th className="py-3 px-4">Seller</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((p, i) => (
                        <tr
                          key={i}
                          className="border-b hover:bg-gray-50 transition duration-150"
                        >
                          <td className="py-3 px-4">{p.name}</td>
                          <td className="py-3 px-4">{p.jenis}</td>
                          <td className="py-3 px-4">
                            Rp {p.harga?.toLocaleString?.() ?? p.harga}
                          </td>
                          <td className="py-3 px-4">{p.deskripsi}</td>
                          <td className="py-3 px-4">
                            {p.foto ? (
                              <img
                                src={p.foto}
                                alt={p.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <span className="text-gray-400 text-sm">
                                Tidak ada foto
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {/* tampilkan nama seller jika ada relasi User */}
                            {p.User?.name || p.sellerName || p.sellerId || "—"}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => openModal(p)}
                              className="text-sm text-blue-600 hover:underline mr-3"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-6 text-gray-500">
                          Tidak ada produk
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
              {editingProduct ? "Edit Produk" : "Tambah Produk"}
            </h3>

            <div className="space-y-3">
              {["name", "jenis", "harga", "deskripsi", "foto"].map((field) => (
                <input
                  key={field}
                  type={field === "harga" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}

              {/* Jika admin: tampilkan dropdown untuk memilih seller.
                  Jika bukan admin: tampilkan nama seller readonly */}
              {user?.role === "admin" ? (
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                  value={formData.userId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="">-- Pilih Seller --</option>
                  {sellers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.email})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  readOnly
                  value={user?.name || "Tidak diketahui"}
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                  placeholder="Seller"
                />
              )}
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

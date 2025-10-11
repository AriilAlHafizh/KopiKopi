import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/SidebarAdmin"; // Sesuaikan path

export default function AdminProduk() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // State untuk form: foto sekarang dipegang sebagai objek File/String
  const [formData, setFormData] = useState({
    name: "",
    jenis: "",
    harga: "",
    deskripsi: "",
    foto: null, 
    userId: "",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // 🔹 Fetch Data Produk dan Seller
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prodRes, usersRes] = await Promise.all([
          axios.get("http://localhost:5000/products", { withCredentials: true }),
          axios.get("http://localhost:5000/users", { withCredentials: true }),
        ]);

        setProducts(prodRes.data || []);
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

  // 🔹 Simpan perubahan (tambah/edit) - MENGGUNAKAN FormData
  const handleSave = async () => {
    try {
      const ownerId =
        user?.role === "admin"
          ? formData.userId || (editingProduct?.userId ?? user?.id)
          : user?.id;

      // ⭐ Perubahan Utama: Gunakan FormData untuk mengirim file
      const data = new FormData();
      data.append("name", formData.name);
      data.append("jenis", formData.jenis);
      data.append("harga", formData.harga);
      data.append("deskripsi", formData.deskripsi);
      data.append("userId", ownerId);

      // Hanya tambahkan foto jika ada objek File baru yang dipilih (bukan string URL lama)
      if (formData.foto instanceof File) {
        data.append("foto", formData.foto);
      }


      if (editingProduct) {
        // Edit produk (PUT/PATCH)
        await axios.put(
          `http://localhost:5000/products/${editingProduct.id}`,
          data, // Mengirim FormData
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
          }
        );
      } else {
        // Tambah produk baru (POST)
        await axios.post("http://localhost:5000/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }

      setShowModal(false);
      setEditingProduct(null);

      // Refresh data
      setLoading(true);
      const res = await axios.get("http://localhost:5000/products", { withCredentials: true });
      setProducts(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Gagal menyimpan produk:", err.response?.data || err.message);
      alert(`Gagal menyimpan: ${err.response?.data?.msg || err.message}`);
    }
  };

  // 🔹 Hapus produk (handleDelete tetap sama)
  const handleDelete = async (id) => {
    // ... (kode tetap sama)
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
      setFormData({
        name: product.name || "",
        jenis: product.jenis || "",
        harga: product.harga || "",
        deskripsi: product.deskripsi || "",
        foto: null, // **Penting**: Reset foto agar user harus memilih file baru untuk upload
        userId: product.userId || product.User?.id || "",
      });
    } else {
      setFormData({
        name: "",
        jenis: "",
        harga: "",
        deskripsi: "",
        foto: null,
        userId: "",
      });
    }

    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-stone-100 font-[Inter]">
      {/* Sidebar */}
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
                      <th className="py-3 px-4">Seller</th> {/* Kolom Seller di sini */}
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
                            {/* Menampilkan Foto dengan Base URL */}
                            {p.foto ? (
                              <img
                                src={`http://localhost:5000${p.foto}`}
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
                            {sellers.find(s => String(s.id) === String(p.userId))?.name || "—"} 
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
              {/* Input teks biasa */}
              {["name", "jenis", "harga", "deskripsi"].map((field) => (
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

              {/* Input File untuk Foto */}
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                onChange={(e) =>
                  setFormData({ ...formData, foto: e.target.files[0] })
                }
              />

              {/* Tampilkan Seller Dropdown hanya untuk Admin */}
              {user?.role === "admin" && (
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
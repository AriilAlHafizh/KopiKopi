import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SidebarSeller from "../../components/SidebarSeller";
import { useNavigate } from "react-router-dom";

export default function SellerProduk() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    jenis: "",
    harga: "",
    deskripsi: "",
    foto: null,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // 🔹 Ambil produk milik seller
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products", {
          withCredentials: true,
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Simpan produk (baru atau edit)
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("jenis", formData.jenis);
      data.append("harga", formData.harga);
      data.append("deskripsi", formData.deskripsi);
      if (formData.foto) data.append("foto", formData.foto);

      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/products/${editingProduct.id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" },
           withCredentials: true, 
        }
        );
      } else {
        await axios.post("http://localhost:5000/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
           withCredentials: true,
        });
      }

      setShowModal(false);
      setEditingProduct(null);
      window.location.reload();
    } catch (err) {
      console.error("Gagal menyimpan produk:", err);
    }
  };

  // 🔹 Hapus produk
  const handleDelete = async (id) => {
  if (window.confirm("Yakin ingin menghapus produk ini?")) {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`, {
        withCredentials: true, // 🟢 penting untuk kirim cookie ke backend
      });

      // Hapus produk dari state lokal agar tabel langsung update
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      alert("Gagal menghapus produk. Coba lagi.");
    }
  }
};


  // 🔹 Buka modal tambah/edit
  const openModal = (product = null) => {
    setEditingProduct(product);
    setFormData(
      product || {
        name: "",
        jenis: "",
        harga: "",
        deskripsi: "",
        foto: null,
      }
    );
    setShowModal(true);
  };

  return (
    <div className="flex h-screen bg-stone-100 font-[Inter]">
            {/* Ganti seluruh aside dengan ini */}
            <SidebarSeller onLogout={handleLogout} />

      {/* === KONTEN UTAMA === */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold">☕ Produk Saya</h1>
            <p className="text-gray-600">
              Kelola semua produk yang kamu jual di toko kopimu.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="bg-[#3E2C20] text-white px-4 py-2 rounded-lg hover:bg-[#2f2016]"
          >
            + Tambah Produk
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#f3eee7] text-gray-700">
                <th className="py-3 px-4">Nama Produk</th>
                <th className="py-3 px-4">Jenis</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4">Deskripsi</th>
                <th className="py-3 px-4">Foto</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p, index) => (
                  <tr key={index} className="border-b hover:bg-[#fdfaf6]">
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">{p.jenis}</td>
                    <td className="py-3 px-4">Rp {p.harga?.toLocaleString()}</td>
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
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => openModal(p)}
                        className="text-blue-600 text-sm hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-gray-500 italic"
                  >
                    Belum ada produk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingProduct ? "Edit Produk" : "Tambah Produk"}
            </h3>

            <div className="space-y-3">
              {["name", "jenis", "harga", "deskripsi"].map((field) => (
                <input
                  key={field}
                  type={field === "harga" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-[#3E2C20]/30"
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}

              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-[#3E2C20]/30"
                onChange={(e) =>
                  setFormData({ ...formData, foto: e.target.files[0] })
                }
              />
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
                className="bg-[#3E2C20] text-white px-4 py-2 rounded-lg hover:bg-[#2f2016]"
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

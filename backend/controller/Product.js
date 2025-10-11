import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

// 🔹 Get all products
export const getProduct = async (req, res) => {
  try {
    let response;
    if (req.role === "seller" || req.role === "admin") {
      response = await Products.findAll({
        attributes: ["id", "name", "jenis", "harga", "deskripsi", "foto"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["id", "name", "jenis", "harga", "deskripsi", "foto"],
        where: { userId: req.userId },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔹 Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    let response;
    if (req.role === "seller" || req.role === "admin") {
      response = await Products.findOne({
        attributes: ["id", "name", "jenis", "harga", "deskripsi", "foto"],
        where: { id: product.id },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["id", "name", "jenis", "harga", "deskripsi", "foto"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔹 Create new product
export const createProduct = async (req, res) => {
  const { name, jenis, harga, deskripsi } = req.body;

  // ✅ Simpan path lengkap (bisa diakses dari frontend)
  const foto = req.file ? `/uploads/${req.file.filename}` : null;

  // ✅ Pastikan role seller/admin
  if (req.role !== "seller" && req.role !== "admin") {
    return res.status(403).json({
      msg: "Akses ditolak, hanya seller atau admin yang bisa create product",
    });
  }

  try {
    // ✅ Simpan produk dengan userId dari session
    await Products.create({
      name,
      jenis,
      harga,
      deskripsi,
      foto,
      userId: req.userId, // penting: dari middleware verifyUser
    });

    // ✅ Kirim respons dengan path foto supaya frontend langsung tahu
    res.status(201).json({
      msg: "Product Created...",
      fotoUrl: foto, // tambahan opsional
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// 🔹 Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    const { name, jenis, harga, deskripsi } = req.body;
    let foto = product.foto; // Default: pertahankan foto lama

    // ✅ LOGIKA BARU UNTUK FOTO
    if (req.file) {
      // Jika ada file baru di-upload, gunakan path baru
      foto = `/uploads/${req.file.filename}`;

      // TODO: Optional - Hapus file lama dari server jika foto lama ada
      // Misalnya: fs.unlinkSync(path.join(__dirname, '..', 'public', product.foto)); 
    } else if (req.body.clearFoto === 'true') {
      // Jika Anda ingin menambahkan mekanisme untuk menghapus foto
      foto = null;
    }
    // Akhir LOGIKA BARU

    const updateData = { name, jenis, harga, deskripsi, foto };
    let canUpdate = false;

    if (req.role === "admin") {
      canUpdate = true;
    } else if (req.role === "seller") {
      if (req.userId !== product.userId) {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
      canUpdate = true;
    }

    if (canUpdate) {
      await Products.update(updateData, { where: { id: product.id } });
      res.status(200).json({ msg: "Product Updated...", fotoUrl: foto }); // Tambahkan fotoUrl di respons
    } else {
      return res.status(403).json({ msg: "Akses ditolak" });
    }

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔹 Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "admin") {
      await Products.destroy({ where: { id: product.id } });
    } else if (req.role === "seller") {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Products.destroy({ where: { id: product.id } });
    }

    res.status(200).json({ msg: "Product Deleted..." });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

import express from "express";
import multer from "multer";
import { verifyUser } from "../middleware/AuthUser.js";
import {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/Product.js";

const router = express.Router();

// === KONFIGURASI MULTER UNTUK UPLOAD FOTO ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// === ROUTES CRUD PRODUK ===
router.get("/products", verifyUser, getProduct);
router.get("/products/:id", verifyUser, getProductById);
router.post("/products", verifyUser, upload.single("foto"), createProduct);
router.put("/products/:id", verifyUser, upload.single("foto"), updateProduct);
router.delete("/products/:id", verifyUser, deleteProduct);

export default router;

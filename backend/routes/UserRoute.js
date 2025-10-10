import express from "express";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controller/Users.js"

const router = express.Router();

// 1. DAFTAR USER: Diproteksi ketat (Admin Only)
router.get('/users', verifyUser, adminOnly, getUser);

// 2. DETAIL USER
router.get('/users/:id', verifyUser, getUserById);

// 3. BUAT USER: Tidak diproteksi (Self-registration)
router.post('/users', createUser);

// 4. UPDATE USER: Diproteksi ketat (Admin Only) - FIX: /:id
router.patch('/users/:id', verifyUser, adminOnly, updateUser);

// 5. HAPUS USER: Diproteksi ketat (Admin Only) - FIX: /:id
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router;
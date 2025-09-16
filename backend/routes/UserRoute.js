import express from "express";
import { verifyUser , adminOnly} from "../middleware/AuthUser.js";
import {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controller/Users.js"

const router = express.Router();

router.get('/users', verifyUser, getUser);
router.get('/users/:id', verifyUser, getUserById);
router.post('/users', verifyUser, createUser);
router.patch('/users:id', verifyUser, updateUser);
router.delete('/users', verifyUser, deleteUser);

export default router;
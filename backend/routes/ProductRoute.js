import express from "express";
import {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controller/Product.js"

const router = express.Router();

router.get('/Products', getProduct);
router.get('/Products/:id', getProductById);
router.post('/Products', createProduct);
router.patch('/Products:id', updateProduct);
router.delete('/Products', deleteProduct);

export default router;
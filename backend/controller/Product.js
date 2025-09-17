import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import {Op} from "sequelize";

export const getProduct = async (req, res) => {
    try {
        let response;
        if (req.role === "seller" || req.role === "admin") {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'jenis', 'harga'],
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]

            });
        } else {
            response = await Products.findAll({
                attributes: ['uuid', 'name', 'jenis', 'harga'],
                where: {
                    userId: req.userId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]

            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        let response;
        if (req.role === "seller" || req.role === "admin") {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'jenis', 'harga'],
                where: {
                    uuid: product.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]

            });
        } else {
            response = await Products.findOne({
                attributes: ['uuid', 'name', 'jenis', 'harga'],
                where: {
                    [Op.and]:[{id: product.id},{userId: req.userId}]

                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']
                }]

            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}

export const createProduct = async (req, res) => {
    const { name, jenis, harga } = req.body;
    if (req.role !== "seller" && req.role !== "admin") {
        return res.status(403).json({ msg: "Akses ditolak, hanya seller atau admin yang bisa create product" });
    }
    try {
        await Products.create({
            name: name,
            jenis: jenis,
            harga: harga,
            userId: req.userId
        });
        res.status(201).json({ msg: "Product Created..." });

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

}

export const updateProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, jenis, harga } = req.body;
        if (req.role === "seller" || req.role === "admin") {
            await Products.update({name,jenis,harga},{
                where: {
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                }
            });
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg:"Akses terlarang"});
            await Products.update({name,jenis,harga},{
                where: {
                    id:product.id
                }
            });
        }
        res.status(200).json({msg:"Product Updated..."});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, jenis, harga } = req.body;
        if (req.role === "seller" || req.role === "admin") {
            await Products.destroy({
                where: {
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                }
            });
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg:"Akses terlarang"});
            await Products.destroy({
                where: {
                    id:product.id
                }
            });
        }
        res.status(200).json({msg:"Product Deleted..."});
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
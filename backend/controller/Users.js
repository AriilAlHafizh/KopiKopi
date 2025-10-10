import Users from "../models/UserModel.js";
import argon2 from "argon2";

// Mengambil SEMUA USER (Hanya boleh diakses admin)
export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            // Mengambil 'id' dan 'role' yang dibutuhkan
            attributes: ['id', 'name', 'email', 'alamat', 'no_tlp', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['id', 'name', 'email', 'alamat', 'no_tlp', 'role'],
            where: {
                id: req.params.id // Menggunakan 'id'
            }
        });
        if (!response) return res.status(404).json({ msg: "user tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, alamat, no_tlp, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            alamat: alamat,
            no_tlp: no_tlp,
            password: hashPassword,
            // Jika role kosong, Sequelize akan menggunakan default 'buyer'
            role: role
        });
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id 
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });

    const { name, email, alamat, no_tlp, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null || password === undefined) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password && password !== confPassword) return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });

    try {
        await Users.update({
            name: name,
            email: email,
            alamat: alamat,
            no_tlp: no_tlp,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id 
            }
        });
        res.status(200).json({ msg: "User Update" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            id: req.params.id 
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    try {
        await Users.destroy({
            where: {
                id: user.id 
            }
        });
        res.status(200).json({ msg: "user Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}
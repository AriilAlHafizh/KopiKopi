import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun anda" })
    }
    const user = await Users.findOne({
        attributes: ['id', 'name', 'email', 'alamat', 'role'], 
        where: {
            id: req.session.userId 
        }
    });
    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });

    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) => {
    if (req.role) {
        if (req.role !== "admin") {
            return res.status(403).json({ msg: "Akses Terlarang" });
        }
        return next();
    }

    const user = await Users.findOne({
        attributes: ['id', 'name', 'email', 'alamat', 'role'],
        where: {
            id: req.session.userId
        }
    });

    if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
    if (user.role !== "admin") return res.status(403).json({ msg: "Akses Terlarang" });

    req.role = user.role;
    next();
}
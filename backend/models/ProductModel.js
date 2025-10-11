import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js"; // 🟢 cukup ini saja

const { DataTypes } = Sequelize;

const Products = db.define("products", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  },
  jenis: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
    },
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: { // 🟢 ganti dari sellerId ke userId biar cocok dengan controller
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
}, {
  freezeTableName: true,
});

// 🟢 Relasi antar tabel
Users.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(Users, { foreignKey: "userId" });

export default Products;

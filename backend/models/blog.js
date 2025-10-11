import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Blog = db.define('blogs', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 100],
    }
  },
  deskripsi: {
    type: DataTypes.TEXT, // gunakan TEXT agar bisa menampung deskripsi panjang
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [10, 5000]
    }
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true, // bisa optional
    validate: {
      isUrl: true
    }
  },
  foto: {
    type: DataTypes.STRING, // simpan nama file atau path URL gambar
    allowNull: true,
    validate: {
      notEmpty: false
    }
  },
  sumber: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  freezeTableName: true
});

export default Blog;

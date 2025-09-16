import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import userId from "./UserModel.js";
import users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('products',{
    uuid:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len:[3, 100],
        }
    },
    jenis:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    harga:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true,
            isInt: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName: true
});

users.hasMany(Products);
Products.belongsTo(users, {foreignKey: "userId"} )

export default Products;
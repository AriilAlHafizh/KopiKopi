import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len:[3, 100],
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    alamat:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len:[3, 255],
        }
    },
    no_tlp:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    role:{
        type: DataTypes.ENUM,
        values: ['admin', 'seller', 'buyer'],
        defaultValue: 'buyer'
    },
    
},{
    freezeTableName: true
});

export default Users;
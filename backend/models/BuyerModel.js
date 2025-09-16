// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";

// const {DataTypes} = Sequelize;

// const Buyers = db.define('buyers',{
//     uuid:{
//         type:DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate: {
//             notEmpty:true
//         }
//     },
//     name:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty:true,
//             len:[3, 100],
//         }
//     },
//     email:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty: true,
//             isEmail: true
//         }
//     },
//     alamat:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty:true,
//             len:[3, 255],
//         }
//     },
//     no_tlp:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty:true,
//             len:[18, 20],
//         }
//     },
//     password:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty:true,
//         }
//     },
//     role:{
//         type:DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             notEmpty:true,
//         }
//     },
    
// },{
//     freezeTableName: true
// });

// export default Buyers;
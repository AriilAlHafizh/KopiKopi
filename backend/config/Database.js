import { Sequelize  } from "sequelize";

const db = new Sequelize('kopi_db', 'root', '',{
    host: "localhost",
    dialect : "mysql"
});

export default db;
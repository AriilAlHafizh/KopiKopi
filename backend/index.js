import express from "express";
import SequelizeStore from "connect-session-sequelize";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import userRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import authRoute from "./routes/authRoute.js"
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// uncommoment kalau ada tabel database baru
 (async()=>{
     await db.sync();
})();

try{
    await db.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Connection error:', error);
  }

app.use(session({
    secret: process.env.SESS_SECRET,
    resave:false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure:'auto'
    }
}));
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'

}));

app.use(express.json());
app.use(userRoute);
app.use(ProductRoute);
app.use(authRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server Up and Running...')
});
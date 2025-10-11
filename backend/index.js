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

// Koneksi database dan sinkronisasi model
// Baris ini akan membuat tabel jika belum ada (gunakan migrations untuk lingkungan serius)
(async () => {
    await db.sync();
})();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}


// =======================================================
// URUTAN MIDDLEWARE KRITIS UNTUK SESSION DAN CORS
// =======================================================

// 1. BODY PARSER (Selalu di atas)
app.use(express.json());

// 2. SESSION HARUS DI SINI
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        // Paling permisif untuk localhost (HTTP)
        secure: false,
        // Hapus sameSite atau set ke 'lax'. Saya biarkan 'lax' sesuai kode Anda, 
        // tapi jika gagal, hapus properti ini.
        sameSite: 'lax'
    }
}));

// 3. CORS HARUS DI SINI (Di bawah session)
app.use(cors({
    // WAJIB: Origins Anda
    origin: 'http://localhost:5173',
    // WAJIB: Mengizinkan cookie sesi
    credentials: true,
}));


// 4. ROUTES (Paling bawah)
app.use(userRoute);
app.use(ProductRoute);
app.use(authRoute);

// store.sync(); // Tidak perlu lagi jika db.sync() sudah dipanggil

app.listen(process.env.APP_PORT, () => {
    console.log('Server Up and Running...')
});

app.use("/uploads", express.static("public/uploads"));

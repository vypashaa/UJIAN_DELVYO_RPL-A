//
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors())
app.use(express.json())
//rute (routing) default 
app.get("/", (req, res) => {
    res.send("Selamat Datang di Backend peminjaman alat");
});

//read alat
app.get("/api/alat", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM alat");
        res.json(query.rows)
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});

//read kategori alat
app.get("/api/kategori_alat", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM kategori_alat");
        res.json(query.rows)
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});

//read peminjaman
app.get("/api/peminjaman", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM peminjaman");
        res.json(query.rows)
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});

//menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});


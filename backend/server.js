//
const express = require("express");

const pool = require("./db");
const app = express();

//rute (routing) default 
app.get("/", (req, res) => {
    res.send("Selamat Datang di Backend peminjaman alat");
});

app.get("/api/alat", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM alat");
        req.json(query.rows)
    }catch(err){
        console.error(err.massage);
        req.status(500).json({error: "Terjadi Kesalahan"});
    }
});

app.get("/api/kategori_alat", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM kategori_alat");
        req.json(query.rows)
    }catch(err){
        console.error(err.massage);
        req.status(500).json({error: "Terjadi Kesalahan"});
    }
});

app.get("/api/peminjaman", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM peminjaman");
        req.json(query.rows)
    }catch(err){
        console.error(err.massage);
        req.status(500).json({error: "Terjadi Kesalahan"});
    }
});

//menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});


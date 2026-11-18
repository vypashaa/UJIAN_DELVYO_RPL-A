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

//create alat
app.post("/api/alat", async (req, res) => {
    try{
        const {id_kategori, nama_alat, kondisi, stok, lokasi} = req.body;
        const query = `INSERT INTO alat (id_kategori, nama_alat, kondisi, stok, lokasi) VALUES ($1, $2, $3, $4, $5)`;
        const result = await pool.query(query, [id_kategori, nama_alat, kondisi, stok, lokasi])
        res.status(201).json(res.json(result.rows[0]));
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Tidak dapat menambahkan alat"})
    }
});

//create katagori alat
app.post("/api/kategori_alat", async (req, res) => {
    try{
        const {nama_kategori, deskripsi} = req.body;
        const query = `INSERT INTO kategori_alat (nama_kategori, deskripsi) VALUES ($1, $2)`;
        const result = await pool.query(query, [nama_kategori, deskripsi])
        res.status(201).json(res.json(result.rows[0]));
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Tidak dapat menambahkan kategori alat"})
    }
});

//create peminjaman
app.post("/api/peminjaman", async (req, res) => {
    try{
        const {id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status} = req.body;
        const query = `INSERT INTO peminjaman (id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
        const result = await pool.query(query, [id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status])
        res.status(201).json(res.json(result.rows[0]));
    }catch(err){
        console.error(err.massage);
        res.status(500).json({error: "Tidak dapat menambahkan peminjaman"})
    }
});

//menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});


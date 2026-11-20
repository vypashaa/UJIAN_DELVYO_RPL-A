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
        console.error(err.message);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});
//read kategori alat
app.get("/api/kategori_alat", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM kategori_alat");
        res.json(query.rows)
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});
//read peminjaman
app.get("/api/peminjaman", async (req, res) => {
    try{
        const query = await pool.query("SELECT * FROM peminjaman");
        res.json(query.rows)
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Terjadi Kesalahan"});
    }
});


//create alat
app.post("/api/alat", async (req, res) => {
    try{
        const {id_kategori, nama_alat, kondisi, stok, lokasi} = req.body;
        const query = `INSERT INTO alat (id_kategori, nama_alat, kondisi, stok, lokasi) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await pool.query(query, [id_kategori, nama_alat, kondisi, stok, lokasi])
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Tidak dapat menambahkan alat"})
    }
});
//create katagori alat
app.post("/api/kategori_alat", async (req, res) => {
    try{
        const {nama_kategori, deskripsi} = req.body;
        const query = `INSERT INTO kategori_alat (nama_kategori, deskripsi) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [nama_kategori, deskripsi])
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(500).json({error: "Tidak dapat menambahkan kategori alat"})
    }
});
//create peminjaman
app.post("/api/peminjaman", async (req, res) => {
    try{
        const {id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status} = req.body;
        const query = `INSERT INTO peminjaman (id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const result = await pool.query(query, [id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status])
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message || "Tidak dapat menambahkan peminjaman"})
    }
});


//update alat
app.patch("/api/alat/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const {id_kategori, nama_alat, kondisi, stok, lokasi} = req.body;
        const query = `
        UPDATE alat 
        SET id_kategori = COALESCE($2, id_kategori),
        nama_alat = COALESCE($3, nama_alat),
        kondisi = COALESCE($4, kondisi),
        stok = COALESCE($5, stok),
        lokasi = COALESCE($6, lokasi)
        WHERE id_alat = $1 RETURNING *
        `;
        
        const result = await pool.query(query, [
            id,
            id_kategori,
            nama_alat,
            kondisi,
            stok,
            lokasi
        ]);

        if(result.rows.length === 0) {
            return res.status(404).json({error: "data tidak ditemukan."})
        }
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message)
        res.status(400).json({
            error: err.message || "Data gagal di update"
        });
    }
});

//update kategori alat
app.patch("/api/kategori_alat/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const {nama_kategori, deskripsi} = req.body;
        const query = `
        UPDATE kategori_alat 
        SET nama_kategori = COALESCE($2, nama_kategori),
        deskripsi = COALESCE($3, deskripsi)
        WHERE id_kategori = $1 RETURNING *
        `;
        
        const result = await pool.query(query, [
            id,
            nama_kategori,
            deskripsi
        ]);

        if(result.rows.length === 0) {
            return res.status(404).json({error: "data tidak ditemukan."})
        }
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message)
        res.status(400).json({
            error: err.message || "Data gagal di update"
        });
    }
})

//update peminjaman
app.patch("/api/peminjaman/:id", async (req, res) =>{
    try{
        const {id} = req.params;
        const {id_alat, nama_peminjam, kelas, tanggal_pinjam, tanggal_kembali, jumlah, status} = req.body;
        const query = `
        UPDATE peminjaman 
        SET id_alat = COALESCE($2, id_alat),
        nama_peminjam = COALESCE($3, nama_peminjam),
        kelas = COALESCE($4, kelas),
        tanggal_pinjam = COALESCE($5, tanggal_pinjam),
        tanggal_kembali = COALESCE($6, tanggal_kembali),
        jumlah = COALESCE($7, jumlah),
        status = COALESCE($8, status)
        WHERE id_peminjaman = $1 RETURNING *
        `;
        
        const result = await pool.query(query, [
            id,
            id_alat,
            nama_peminjam,
            kelas,
            tanggal_pinjam,
            tanggal_kembali,
            jumlah,
            status
        ]);

        if(result.rows.length === 0) {
            return res.status(404).json({error: "data tidak ditemukan."})
        }
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message)
        res.status(400).json({
            error: err.message || "Data gagal di update"
        });
    }
})

//delete alat
app.delete("/api/alat/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const query = `DELETE FROM alat WHERE id_alat = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message || "Tidak dapat menghapus alat"})
    }
});

//delete kategori_alat
app.delete("/api/kategori_alat/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const query = `DELETE FROM kategori_alat WHERE id_kategori = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message || "Tidak dapat menghapus kategori alat"})
    }
});

//delete peminjaman
app.delete("/api/peminjaman/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const query = `DELETE FROM peminjaman WHERE id_peminjaman = $1 RETURNING *`;
        const result = await pool.query(query, [id]);
        res.status(200).json(result.rows[0]);
    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message || "Tidak dapat menghapus peminjaman"})
    }
});
//menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});


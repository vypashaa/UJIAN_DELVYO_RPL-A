//
const express = require("express");
const app = express();

//rute (routing) default 
app.get("/", (req, res) => {
    res.send("Selamat Datang di Backend peminjaman alat");
});

//menjalankan server di port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});


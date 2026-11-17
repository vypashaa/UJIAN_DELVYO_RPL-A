const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Selamat Datang di Backend peminjaman alat");
});

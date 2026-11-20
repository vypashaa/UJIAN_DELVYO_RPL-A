const API_URL = "http://localhost:5000/api";

let listAlat = [];
let listKategori = [];
let listPeminjaman = [];

function formatTanggal(str) {
    if (!str) return "-";
    return str.split("T")[0];
}

function setModeAlat(mode) {
    const tabTambah = document.getElementById("btn-tab-tambah-alat");
    const tabEdit = document.getElementById("btn-tab-edit-alat");
    const judul = document.getElementById("judul-form-alat");
    const btn = document.getElementById("btn-sumbit-alat");
    const form = document.getElementById("form-alat");

    if (mode === "tambah") {
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Tambah Alat";
        btn.textContent = "Tambah";
        form.reset();
        document.getElementById("edit-id-alat").value = "";
    } else {
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Edit Alat";
        btn.textContent = "Simpan";
    }
}

function setModeKategori(mode) {
    const tabTambah = document.getElementById("btn-tab-tambah-kategori");
    const tabEdit = document.getElementById("btn-tab-edit-kategori");
    const judul = document.getElementById("judul-form-kategori");
    const btn = document.getElementById("btn-sumbit-kategori");
    const form = document.getElementById("form-kategori");

    if (mode === "tambah") {
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Tambah Kategori Alat";
        btn.textContent = "Tambah";
        form.reset();
        document.getElementById("edit-id-kategori").value = "";
    } else {
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Edit Kategori Alat";
        btn.textContent = "Simpan";
    }
}

function setModePeminjaman(mode) {
    const tabTambah = document.getElementById("btn-tab-tambah-peminjaman");
    const tabEdit = document.getElementById("btn-tab-edit-peminjaman");
    const judul = document.getElementById("judul-form-peminjaman");
    const btn = document.getElementById("btn-sumbit-peminjaman");
    const form = document.getElementById("form-peminjaman");

    if (mode === "tambah") {
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Tambah Peminjaman Alat";
        btn.textContent = "Tambah";
        form.reset();
        document.getElementById("edit-id-peminjaman").value = "";
        const today = new Date().toISOString().split("T")[0];
        document.getElementById("peminjaman-tanggal-pinjam").value = today;
    } else {
        tabEdit.className = "flex-1 py-1.5 px-3 border-2 rounded-lg bg-blue-800 text-white font-semibold";
        tabTambah.className = "flex-1 py-1.5 px-3 border-2 rounded-lg hover:bg-blue-800 hover:text-white font-semibold";
        judul.textContent = "Edit Peminjaman Alat";
        btn.textContent = "Simpan";
    }
}

async function loadAlat() {
    try {
        const res = await fetch(`${API_URL}/alat`);
        if (!res.ok) throw new Error("Gagal mengambil data alat");
        listAlat = await res.json();
        renderTabelAlat();
    } catch (err) {
        console.error(err);
    }
}

function renderTabelAlat() {
    const tbody = document.getElementById("tabel-alat");
    if (!tbody) return;
    if (!listAlat || listAlat.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="py-4 text-center text-slate-500">Tidak ada data</td></tr>`;
        return;
    }
    tbody.innerHTML = listAlat.map(item => `
        <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${item.id_alat}</td>
            <td class="py-2 px-3">${item.id_kategori}</td>
            <td class="py-2 px-3 font-medium">${item.nama_alat}</td>
            <td class="py-2 px-3">${item.kondisi}</td>
            <td class="py-2 px-3">${item.stok}</td>
            <td class="py-2 px-3">${item.lokasi || "-"}</td>
            <td class="py-2 px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button type="button" onclick="pilihEditAlat(${item.id_alat})" class="py-1 px-2.5 border rounded hover:bg-blue-800 hover:text-white text-xs font-semibold">Edit</button>
                    <button type="button" onclick="hapusAlat(${item.id_alat})" class="py-1 px-2.5 border rounded hover:bg-red-600 hover:text-white text-xs font-semibold">Hapus</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function pilihEditAlat(id) {
    const item = listAlat.find(a => a.id_alat === id);
    if (!item) return;
    setModeAlat("edit");
    document.getElementById("edit-id-alat").value = item.id_alat;
    document.getElementById("alat-id-kategori").value = item.id_kategori;
    document.getElementById("alat-nama").value = item.nama_alat;
    document.getElementById("alat-kondisi").value = item.kondisi;
    document.getElementById("alat-stok").value = item.stok;
    document.getElementById("alat-lokasi").value = item.lokasi || "";
}

async function simpanAlat(e) {
    e.preventDefault();
    const id = document.getElementById("edit-id-alat").value;
    const payload = {
        id_kategori: parseInt(document.getElementById("alat-id-kategori").value),
        nama_alat: document.getElementById("alat-nama").value,
        kondisi: document.getElementById("alat-kondisi").value,
        stok: parseInt(document.getElementById("alat-stok").value),
        lokasi: document.getElementById("alat-lokasi").value
    };
    const url = id ? `${API_URL}/alat/${id}` : `${API_URL}/alat`;
    const method = id ? "PATCH" : "POST";
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menyimpan alat");
            return;
        }
        alert(id ? "Alat berhasil diperbarui" : "Alat berhasil ditambahkan");
        setModeAlat("tambah");
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function hapusAlat(id) {
    if (!confirm("Apakah anda yakin ingin menghapus alat ini?")) return;
    try {
        const res = await fetch(`${API_URL}/alat/${id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menghapus alat");
            return;
        }
        alert("Alat berhasil dihapus");
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function loadKategori() {
    try {
        const res = await fetch(`${API_URL}/kategori_alat`);
        if (!res.ok) throw new Error("Gagal mengambil data kategori");
        listKategori = await res.json();
        renderTabelKategori();
    } catch (err) {
        console.error(err);
    }
}

function renderTabelKategori() {
    const tbody = document.getElementById("tabel-kategori");
    if (!tbody) return;
    if (!listKategori || listKategori.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="py-4 text-center text-slate-500">Tidak ada data</td></tr>`;
        return;
    }
    tbody.innerHTML = listKategori.map(item => `
        <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${item.id_kategori}</td>
            <td class="py-2 px-3 font-medium">${item.nama_kategori}</td>
            <td class="py-2 px-3">${item.deskripsi || "-"}</td>
            <td class="py-2 px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    <button type="button" onclick="pilihEditKategori(${item.id_kategori})" class="py-1 px-2.5 border rounded hover:bg-blue-800 hover:text-white text-xs font-semibold">Edit</button>
                    <button type="button" onclick="hapusKategori(${item.id_kategori})" class="py-1 px-2.5 border rounded hover:bg-red-600 hover:text-white text-xs font-semibold">Hapus</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function pilihEditKategori(id) {
    const item = listKategori.find(k => k.id_kategori === id);
    if (!item) return;
    setModeKategori("edit");
    document.getElementById("edit-id-kategori").value = item.id_kategori;
    document.getElementById("kategori-alat").value = item.nama_kategori;
    document.getElementById("kategori-deskripsi").value = item.deskripsi || "";
}

async function simpanKategori(e) {
    e.preventDefault();
    const id = document.getElementById("edit-id-kategori").value;
    const payload = {
        nama_kategori: document.getElementById("kategori-alat").value,
        deskripsi: document.getElementById("kategori-deskripsi").value
    };
    const url = id ? `${API_URL}/kategori_alat/${id}` : `${API_URL}/kategori_alat`;
    const method = id ? "PATCH" : "POST";
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menyimpan kategori");
            return;
        }
        alert(id ? "Kategori berhasil diperbarui" : "Kategori berhasil ditambahkan");
        setModeKategori("tambah");
        loadKategori();
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function hapusKategori(id) {
    if (!confirm("Apakah anda yakin ingin menghapus kategori ini? Menghapus kategori akan menghapus seluruh alat dalam kategori tersebut.")) return;
    try {
        const res = await fetch(`${API_URL}/kategori_alat/${id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menghapus kategori");
            return;
        }
        alert("Kategori berhasil dihapus");
        loadKategori();
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function loadPeminjaman() {
    try {
        const res = await fetch(`${API_URL}/peminjaman`);
        if (!res.ok) throw new Error("Gagal mengambil data peminjaman");
        listPeminjaman = await res.json();
        renderTabelPeminjaman();
    } catch (err) {
        console.error(err);
    }
}

function renderTabelPeminjaman() {
    const tbody = document.getElementById("tabel-peminjaman");
    if (!tbody) return;
    if (!listPeminjaman || listPeminjaman.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" class="py-4 text-center text-slate-500">Tidak ada data</td></tr>`;
        return;
    }
    tbody.innerHTML = listPeminjaman.map(item => `
        <tr class="hover:bg-slate-50">
            <td class="py-2 px-3">${item.id_peminjaman}</td>
            <td class="py-2 px-3">${item.id_alat}</td>
            <td class="py-2 px-3 font-medium">${item.nama_peminjam}</td>
            <td class="py-2 px-3">${item.kelas}</td>
            <td class="py-2 px-3">${formatTanggal(item.tanggal_pinjam)}</td>
            <td class="py-2 px-3">${formatTanggal(item.tanggal_kembali)}</td>
            <td class="py-2 px-3">${item.jumlah}</td>
            <td class="py-2 px-3">
                <span class="inline-block px-2 py-0.5 rounded text-xs font-semibold ${item.status === 'Dikembalikan' ? 'bg-emerald-100 text-emerald-800' : (item.status === 'Terlambat' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800')}">
                    ${item.status}
                </span>
            </td>
            <td class="py-2 px-3 text-center">
                <div class="flex items-center justify-center gap-2">
                    ${item.status === 'Dipinjam' ? `<button type="button" onclick="kembalikanAlat(${item.id_peminjaman})" class="py-1 px-2.5 border rounded hover:bg-emerald-600 hover:text-white text-xs font-semibold">Kembalikan</button>` : ''}
                    <button type="button" onclick="pilihEditPeminjaman(${item.id_peminjaman})" class="py-1 px-2.5 border rounded hover:bg-blue-800 hover:text-white text-xs font-semibold">Edit</button>
                    <button type="button" onclick="hapusPeminjaman(${item.id_peminjaman})" class="py-1 px-2.5 border rounded hover:bg-red-600 hover:text-white text-xs font-semibold">Hapus</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function pilihEditPeminjaman(id) {
    const item = listPeminjaman.find(p => p.id_peminjaman === id);
    if (!item) return;
    setModePeminjaman("edit");
    document.getElementById("edit-id-peminjaman").value = item.id_peminjaman;
    document.getElementById("peminjaman-id-alat").value = item.id_alat;
    document.getElementById("peminjaman-nama-peminjam").value = item.nama_peminjam;
    document.getElementById("peminjaman-kelas").value = item.kelas;
    document.getElementById("peminjaman-tanggal-pinjam").value = formatTanggal(item.tanggal_pinjam);
    document.getElementById("peminjaman-tanggal-kembali").value = item.tanggal_kembali ? formatTanggal(item.tanggal_kembali) : "";
    document.getElementById("peminjaman-jumlah").value = item.jumlah;
    document.getElementById("peminjaman-status").value = item.status;
}

async function simpanPeminjaman(e) {
    e.preventDefault();
    const id = document.getElementById("edit-id-peminjaman").value;
    const payload = {
        id_alat: parseInt(document.getElementById("peminjaman-id-alat").value),
        nama_peminjam: document.getElementById("peminjaman-nama-peminjam").value,
        kelas: document.getElementById("peminjaman-kelas").value,
        tanggal_pinjam: document.getElementById("peminjaman-tanggal-pinjam").value,
        tanggal_kembali: document.getElementById("peminjaman-tanggal-kembali").value || null,
        jumlah: parseInt(document.getElementById("peminjaman-jumlah").value),
        status: document.getElementById("peminjaman-status").value
    };
    const url = id ? `${API_URL}/peminjaman/${id}` : `${API_URL}/peminjaman`;
    const method = id ? "PATCH" : "POST";
    try {
        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menyimpan peminjaman");
            return;
        }
        alert(id ? "Peminjaman berhasil diperbarui" : "Peminjaman berhasil ditambahkan");
        setModePeminjaman("tambah");
        loadPeminjaman();
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function kembalikanAlat(id) {
    if (!confirm("Tandai peminjaman ini sebagai Dikembalikan?")) return;
    const today = new Date().toISOString().split("T")[0];
    try {
        const res = await fetch(`${API_URL}/peminjaman/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Dikembalikan",
                tanggal_kembali: today
            })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal mengembalikan alat");
            return;
        }
        alert("Alat berhasil dikembalikan");
        loadPeminjaman();
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

async function hapusPeminjaman(id) {
    if (!confirm("Apakah anda yakin ingin menghapus data peminjaman ini?")) return;
    try {
        const res = await fetch(`${API_URL}/peminjaman/${id}`, { method: "DELETE" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
            alert(data.error || "Gagal menghapus peminjaman");
            return;
        }
        alert("Data peminjaman berhasil dihapus");
        loadPeminjaman();
        loadAlat();
    } catch (err) {
        alert("Terjadi kesalahan: " + err.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn-tab-tambah-alat").addEventListener("click", () => setModeAlat("tambah"));
    document.getElementById("btn-tab-edit-alat").addEventListener("click", () => setModeAlat("edit"));
    document.getElementById("form-alat").addEventListener("submit", simpanAlat);

    document.getElementById("btn-tab-tambah-kategori").addEventListener("click", () => setModeKategori("tambah"));
    document.getElementById("btn-tab-edit-kategori").addEventListener("click", () => setModeKategori("edit"));
    document.getElementById("form-kategori").addEventListener("submit", simpanKategori);

    document.getElementById("btn-tab-tambah-peminjaman").addEventListener("click", () => setModePeminjaman("tambah"));
    document.getElementById("btn-tab-edit-peminjaman").addEventListener("click", () => setModePeminjaman("edit"));
    document.getElementById("form-peminjaman").addEventListener("submit", simpanPeminjaman);

    setModeAlat("tambah");
    setModeKategori("tambah");
    setModePeminjaman("tambah");

    loadAlat();
    loadKategori();
    loadPeminjaman();
});

window.pilihEditAlat = pilihEditAlat;
window.hapusAlat = hapusAlat;
window.pilihEditKategori = pilihEditKategori;
window.hapusKategori = hapusKategori;
window.pilihEditPeminjaman = pilihEditPeminjaman;
window.hapusPeminjaman = hapusPeminjaman;
window.kembalikanAlat = kembalikanAlat;

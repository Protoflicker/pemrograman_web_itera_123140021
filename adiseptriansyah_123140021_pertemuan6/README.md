# Aplikasi Manajemen Matakuliah (Pyramid Framework)

Aplikasi ini adalah RESTful API sederhana untuk pengelolaan data Matakuliah (CRUD) yang dibangun menggunakan Pyramid Framework, SQLAlchemy ORM, dan PostgreSQL. Proyek ini dibuat untuk memenuhi tugas praktikum Pemrograman Web.

## Identitas Mahasiswa

**Nama:** Adi Septriansyah 
**NIM:** 123140021  
**Kelas:** RA 
**Pertemuan:** 6 (Pyramid Framework)

---

## Persiapan & Instalasi

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda.

### 1. Prasyarat

- Python 3.7+
- PostgreSQL (Pastikan service sudah berjalan)
- Git (Opsional)

### 2. Setup Virtual Environment

Buka terminal/PowerShell di folder proyek, lalu jalankan:

```bash
# Membuat virtual environment
python -m venv venv

# Mengaktifkan virtual environment (Windows)
.\venv\Scripts\activate

# Mengaktifkan virtual environment (Linux/Mac)
source venv/bin/activate
```

### 3. Instalasi Dependensi

Install paket aplikasi dalam mode editable:

```bash
# Upgrade pip (opsional tapi disarankan)
pip install --upgrade pip setuptools

# Install dependensi proyek
pip install -e .

# Install driver database PostgreSQL
pip install psycopg2-binary
```

### 4. Konfigurasi Database

Buat database kosong di PostgreSQL bernama `pyramid_mahasiswa`.

Pastikan file `development.ini` pada baris `sqlalchemy.url` sudah sesuai dengan username/password PostgreSQL Anda:

```toml
sqlalchemy.url = postgresql://username:password@localhost:5432/pyramid_mahasiswa
```

---

## Cara Menjalankan Aplikasi

### 1. Migrasi Database

Jalankan perintah ini untuk membuat tabel secara otomatis:

```bash
alembic -c development.ini upgrade head
```

### 2. Inisialisasi Data Awal (Seeding)

Isi database dengan data dummy matakuliah:

```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

### 3. Jalankan Server

Mulai server development:

```bash
pserve development.ini --reload
```

Server akan berjalan di:  
http://localhost:6543

---

## Dokumentasi API

Berikut adalah daftar endpoint yang tersedia dalam aplikasi ini.

---

### 1. Get All Matakuliah

Mengambil daftar semua matakuliah yang tersimpan.

- **URL:** `/api/matakuliah`
- **Method:** GET

**Response Sukses:**

```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    }
  ]
}
```

---

### 2. Get Detail Matakuliah

Mengambil detail satu matakuliah berdasarkan ID.

- **URL:** `/api/matakuliah/{id}`
- **Method:** GET

**Response Sukses:**

```json
{
  "matakuliah": {
    "id": 1,
    "kode_mk": "IF101",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  }
}
```

---

### 3. Add Matakuliah

Menambahkan data matakuliah baru.

- **URL:** `/api/matakuliah`
- **Method:** POST

**Body (JSON):**

```json
{
  "kode_mk": "IF300",
  "nama_mk": "Kecerdasan Buatan",
  "sks": 3,
  "semester": 5
}
```

---

### 4. Update Matakuliah

Memperbarui data matakuliah yang sudah ada.

- **URL:** `/api/matakuliah/{id}`
- **Method:** PUT

**Body (JSON):**

```json
{
  "nama_mk": "Kecerdasan Buatan Lanjut",
  "sks": 4
}
```

---

### 5. Delete Matakuliah

Menghapus data matakuliah.

- **URL:** `/api/matakuliah/{id}`
- **Method:** DELETE

**Response Sukses:**

```json
{
  "success": true,
  "message": "Matakuliah ID 1 berhasil dihapus"
}
```

---

## Testing (Pengujian)

Berikut adalah perintah curl (format Windows PowerShell) untuk menguji setiap endpoint.

### 1. Test GET (Ambil Data)

```powershell
curl.exe -X GET http://localhost:6543/api/matakuliah
```

### 2. Test POST (Tambah Data)

```powershell
curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\": \"IF999\", \"nama_mk\": \"Testing API\", \"sks\": 2, \"semester\": 6}"
```

### 3. Test PUT (Update Data)

```powershell
curl.exe -X PUT http://localhost:6543/api/matakuliah/1 -H "Content-Type: application/json" -d "{\"sks\": 4}"
```

### 4. Test DELETE (Hapus Data)

```powershell
curl.exe -X DELETE http://localhost:6543/api/matakuliah/1
```

---

## Bukti Testing (Screenshot)

Berikut adalah bukti hasil pengujian API menggunakan curl.

### Bukti GET
![Bukti GET](screenshots/1.png)

### Bukti POST
![Bukti POST](screenshots/2.png)

### Bukti PUT
![Bukti PUT](screenshots/3.png)

### Bukti DELETE
![Bukti DELETE](screenshots/4.png)

---

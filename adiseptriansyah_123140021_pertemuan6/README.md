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

---

## 4. Konfigurasi Database (PENTING)

Agar aplikasi dapat berjalan langsung tanpa mengubah kodingan, kita perlu menyamakan environment database.

### Langkah A: Buat File Konfigurasi

Buat file baru bernama `development.ini` di dalam folder root proyek, lalu isi dengan kode berikut:

```ini
[app:main]
use = egg:pyramid_mahasiswa

pyramid.reload_templates = true
pyramid.debug_authorization = false
pyramid.debug_notfound = false
pyramid.debug_routematch = false
pyramid.default_locale_name = en
pyramid.includes =
    pyramid_debugtoolbar
    pyramid_tm

# Konfigurasi User & Password Default
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa

retry.attempts = 3

[server:main]
use = egg:waitress#main
listen = localhost:6543

[alembic]
script_location = pyramid_mahasiswa:alembic
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa

[loggers]
keys = root, pyramid_mahasiswa, sqlalchemy, alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = INFO
handlers = console

[logger_pyramid_mahasiswa]
level = DEBUG
handlers =
qualname = pyramid_mahasiswa

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(asctime)s %(levelname)-5.5s [%(name)s:%(lineno)s][%(threadName)s] %(message)s
```

## Cara Menjalankan Aplikasi

### 1. Migrasi Database

```bash
alembic -c development.ini upgrade head
```

### 2. Inisialisasi Data Awal (Seeding)

```bash
python -m pyramid_mahasiswa.scripts.initialize_db development.ini
```

### 3. Jalankan Server

```bash
pserve development.ini --reload
```

Aplikasi berjalan di:  
**http://localhost:6543**

---

## Dokumentasi API

### 1. Get All Matakuliah  
```
GET /api/matakuliah
```

### 2. Get Detail Matakuliah  
```
GET /api/matakuliah/{id}
```

### 3. Add Matakuliah  
```
POST /api/matakuliah
```

### 4. Update Matakuliah  
```
PUT /api/matakuliah/{id}
```

### 5. Delete Matakuliah  
```
DELETE /api/matakuliah/{id}
```

---

## Testing (Pengujian)

### Test GET
```powershell
curl.exe -X GET http://localhost:6543/api/matakuliah
```

### Test POST
```powershell
curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\": \"IF999\", \"nama_mk\": \"Testing API\", \"sks\": 2, \"semester\": 6}"
```

### Test PUT
```powershell
curl.exe -X PUT http://localhost:6543/api/matakuliah/1 -H "Content-Type: application/json" -d "{\"sks\": 4}"
```

### Test DELETE
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

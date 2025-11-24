# Aplikasi Manajemen Matakuliah

Tugas Praktikum Pemrograman Web (Pyramid Framework).

**Identitas:**
- **Nama:** Adi Septriansyah
- **NIM:** 123140021
- **Kelas:** RA

---

## 1. Instalasi

Buka terminal di folder proyek ini:

```bash
# 1. Setup Environment
python -m venv venv
.\venv\Scripts\activate

# 2. Install Aplikasi & Driver
pip install -e .
pip install psycopg2-binary
```

---

## 2. Konfigurasi Database

Pastikan database pyramid_mahasiswa sudah dibuat.

Buat file baru bernama development.ini di root folder, lalu salin konfigurasi berikut:

```ini
[app:main]
use = egg:pyramid_mahasiswa
pyramid.reload_templates = true
pyramid.includes =
    pyramid_debugtoolbar
    pyramid_tm

# Konfigurasi Standar Modul (pyramid_user)
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa

retry.attempts = 3

[server:main]
use = egg:waitress#main
listen = localhost:6543

[alembic]
script_location = pyramid_mahasiswa:alembic
sqlalchemy.url = postgresql://pyramid_user:pyramid_pass@localhost:5432/pyramid_mahasiswa

# Logging configuration
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

---

## 3. Menjalankan Aplikasi

```bash
# 1. Migrasi Tabel
alembic -c development.ini upgrade head

# 2. Isi Data Awal
python -m pyramid_mahasiswa.scripts.initialize_db development.ini

# 3. Start Server
pserve development.ini --reload
```

Akses API:  
http://localhost:6543/api/matakuliah

---

## 4. Testing API

Gunakan curl (PowerShell):

### GET
```powershell
curl.exe -X GET http://localhost:6543/api/matakuliah
```

### POST
```powershell
curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\": \"IF111\", \"nama_mk\": \"Test\", \"sks\": 3, \"semester\": 1}"
```

### PUT
```powershell
curl.exe -X PUT http://localhost:6543/api/matakuliah/1 -H "Content-Type: application/json" -d "{\"sks\": 4}"
```

### DELETE
```powershell
curl.exe -X DELETE http://localhost:6543/api/matakuliah/1
```

---

## Bukti Screenshot

### Bukti GET
![Bukti GET](screenshots/1.png)

### Bukti POST
![Bukti POST](screenshots/2.png)

### Bukti PUT
![Bukti PUT](screenshots/3.png)

### Bukti DELETE
![Bukti DELETE](screenshots/4.png)

---

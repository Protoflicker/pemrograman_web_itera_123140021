# TugasManager

## Penjelasan Singkat dan Fitur-fitur

Aplikasi ini berfungsi sebagai agenda digital pribadi bagi mahasiswa. Pengguna dapat dengan cepat menambahkan tugas baru, lengkap dengan mata kuliah dan tanggal deadline. Fitur utamanya adalah kalender interaktif yang memberikan visualisasi deadline secara jelas, serta daftar tugas yang otomatis dikelompokkan per mata kuliah dan diurutkan berdasarkan tanggal deadline terdekat. Semua data disimpan secara lokal di browser, sehingga tugas tidak akan hilang bahkan setelah browser ditutup.

## Cara Menggunakan Aplikasi

Berikut adalah panduan langkah demi langkah untuk menggunakan fitur-fitur utama aplikasi:

### Menambah Tugas Baru
- Isi Nama Tugas, Mata Kuliah, dan pilih Deadline pada form di bagian atas.
- Untuk Mata Kuliah, Anda bisa mengetik nama baru atau memilih dari daftar yang sudah ada dengan menekan ikon panah.
- Klik tombol "Tambah Tugas". Tugas akan otomatis muncul di kalender dan di daftar tugas di bawah.

### Mengelola Daftar Tugas
- **Menandai Selesai:** Klik tombol "Selesai" pada sebuah tugas. Tulisannya akan tercoret, dan indikator di kalender akan berubah menjadi abu-abu. Klik tombol "Batal" untuk mengembalikannya.
- **Menghapus Tugas:** Klik tombol "Hapus" untuk menghilangkan tugas secara permanen.

### Menggunakan Kalender dan Filter
- **Melihat Deadline:** Tanggal di kalender akan memiliki titik di bawahnya jika ada tugas pada hari itu (merah = belum selesai, abu-abu = sudah selesai).
- **Filter Berdasarkan Tanggal:** Klik pada tanggal mana pun di kalender untuk menampilkan hanya tugas-tugas dengan deadline pada hari itu. Untuk kembali, klik lagi tanggal yang sama atau tombol "Matikan Filter Tanggal".
- **Filter Berdasarkan Mata Kuliah/Status:** Gunakan dropdown di bawah kalender untuk menyaring tugas berdasarkan mata kuliah atau statusnya.

## Daftar Fitur yang Telah Diimplementasikan

### Fungsionalitas CRUD:
- **Create:** Menambah tugas baru melalui form.
- **Read:** Menampilkan semua tugas dalam daftar yang terorganisir.
- **Update:** Menandai tugas sebagai "Selesai" atau "Batal" jika ingin merubah tugas yang selesai menjadi belum selesai.
- **Delete:** Menghapus tugas.
- **Penyimpanan Lokal:** Semua data tugas disimpan secara otomatis di localStorage.

### Kalender Interaktif:
- Menampilkan deadline tugas dengan indikator warna (merah untuk belum selesai, abu-abu untuk sudah selesai).
- Berfungsi sebagai filter tanggal saat diklik.

### Filter & Pencarian:
- Filter tugas berdasarkan Mata Kuliah melalui dropdown.
- Filter tugas berdasarkan Status (Semua, Selesai, Belum Selesai).

### Pengelompokan & Pengurutan:
- Daftar tugas otomatis dikelompokkan per mata kuliah.
- Tugas diurutkan otomatis berdasarkan deadline terdekat.

### Statistik Tugas:
- Menampilkan jumlah tugas yang belum selesai secara real-time.

### Validasi Form:
- Mencegah pengiriman data yang tidak valid atau kosong.

## Penjelasan Teknis dan Implementasi ES6+

### Penggunaan localStorage (Asli)
Aplikasi ini memanfaatkan Web Storage API untuk memastikan data tugas pengguna tidak hilang.

**Penyimpanan Data:**  
Setiap kali ada perubahan data (menambah, menghapus, atau mengubah status tugas), fungsi `saveDataAndRefreshUI()` dipanggil.  
`localStorage.setItem('tasks', JSON.stringify(tasks));` akan mengubah array tasks menjadi format string JSON dan menyimpannya di browser pengguna dengan key `'tasks'`.

**Pengambilan Data:**  
Saat halaman pertama kali dimuat,  
`this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];`  
akan mencoba mengambil data dari localStorage. Jika ada, data dikembalikan menjadi array. Jika tidak ada, digunakan array kosong.

### Validasi Form (Asli)
Aplikasi menerapkan dua lapis validasi:

- **Validasi HTML:** Atribut `required` pada `<input>` mencegah form dikirim jika ada kolom kosong.
- **Validasi JavaScript:** Pada `addTask()`, terdapat pengecekan `if (!name || !course || !deadline)` untuk memastikan data lengkap.

---

## Refactoring ke JavaScript Modern (ES6+)


### Modules (import/export)
Logika aplikasi dipecah menjadi dua file:

- `js/app.js` — Logika inti aplikasi.  
- `js/index.js` — Entry point aplikasi.

`app.js` menggunakan `export class`, sedangkan `index.js` menggunakan `import`.

### Classes
Semua logika diwrap dalam class `TaskManager`.  
Variabel global dan elemen DOM menjadi properti class, dan semua fungsi menjadi method.

### let dan const
- Semua `var` diganti.
- `const` digunakan untuk referensi tetap.
- `let` digunakan untuk counter loop.

### Arrow Functions
- Digunakan pada event listener agar konteks `this` tetap konsisten.
- Digunakan di metode array seperti `.filter`, `.reduce`, `.sort`, `.find`, `.every`.

### Async/Await dan Promise
- `initialize()` diubah menjadi `async`.
- `await new Promise(resolve => setTimeout(resolve, 500))` digunakan untuk simulasi loading.

### Modern Array Methods
- **reduce()** digunakan di `updateIncompleteCount()` dan `renderTasks()`.
- **filter()** digunakan untuk filter status/matkul/tanggal.
- **find()** digunakan untuk mencari task tertentu.
- **every()** digunakan pada calendar checking.

### Destructuring, Shorthand, Template Literals
- Destructuring pada array & object (`[year, month, day]`, `{ id, name, deadline }`).
- Shorthand pada pembuatan objek.
- Template literal untuk string yang lebih bersih.

### For...of Loop
Menggantikan loop tradisional di beberapa bagian untuk meningkatkan keterbacaan.

---

## Screenshot Aplikasi

### 1. Menambahkan Tugas Baru

<img src="screenshot/1.jpg" width="600">
<img src="screenshot/2.jpg" width="600">
<img src="screenshot/3.jpg" width="600">

Form untuk menambah tugas baru, dengan dropdown untuk memilih mata kuliah yang sudah ada.

---

### 2. Kalender Tugas

<img src="screenshot/4.jpg" width="600">

Menunjukkan kalender dengan simbol merah untuk tugas yang belum selesai dan abu-abu untuk tugas yang sudah selesai.

---

### 3. Fitur Filter

<img src="screenshot/5.jpg" width="600">
<img src="screenshot/6.jpg" width="600">

Contoh penggunaan filter berdasarkan tanggal di kalender dan mata kuliah tertentu pada dropdown.

---

Jika ingin mencoba aplikasi secara langsung bisa mengunjungi link berikut:  
https://protoflicker.github.io/tugasmanager/

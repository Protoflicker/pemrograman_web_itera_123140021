# Aplikasi Manajemen Tugas Mahasiswa 🎓

Aplikasi web interaktif yang dirancang untuk membantu mahasiswa mengelola semua tugas akademik mereka di satu tempat. Dibangun dengan **HTML**, **CSS**, dan **JavaScript** vanilla, aplikasi ini menyediakan antarmuka yang bersih dan fungsional dengan penyimpanan data persisten menggunakan `localStorage` browser.

---

## Penjelasan Singkat dan Fitur-fitur

Aplikasi ini berfungsi sebagai agenda digital pribadi bagi mahasiswa. Pengguna dapat dengan cepat menambahkan tugas baru, lengkap dengan mata kuliah dan tanggal *deadline*. Fitur utamanya adalah **kalender interaktif** yang memberikan visualisasi *deadline* secara jelas, serta **daftar tugas yang otomatis dikelompokkan** per mata kuliah dan diurutkan berdasarkan tanggal *deadline* terdekat. Semua data disimpan secara lokal di browser, sehingga tugas tidak akan hilang bahkan setelah browser ditutup.

---

## Screenshot Aplikasi

Berikut adalah beberapa tangkapan layar yang menunjukkan fitur-fitur utama aplikasi:

**1. Tampilan Utama**
<br>
**
<br>
*Tampilan utama aplikasi, menunjukkan kalender di bagian atas dan daftar tugas yang sudah dikelompokkan dan diurutkan di bawahnya.*

**2. Menambahkan Tugas Baru**
<br>
**
<br>
*Form untuk menambah tugas baru, dengan *dropdown* untuk memilih mata kuliah yang sudah ada dan pratinjau format tanggal `DD/MM/YY`.*

**3. Fitur Filter**
<br>
**
<br>
*Contoh penggunaan filter dengan memilih tanggal di kalender dan memfilter berdasarkan mata kuliah tertentu dari *dropdown*.*

---

## Cara Menjalankan Aplikasi

Untuk menjalankan aplikasi ini di komputer Anda, ikuti langkah-langkah sederhana berikut:

1.  Pastikan Anda memiliki tiga file berikut dalam **satu folder yang sama**:
    * `index.html`
    * `index.css`
    * `index.js`
2.  Buka file `index.html` menggunakan browser web modern apa pun (seperti Google Chrome, Mozilla Firefox, atau Microsoft Edge).
3.  Aplikasi siap untuk digunakan!

---

## Daftar Fitur yang Telah Diimplementasikan

-   **[✔️] Fungsionalitas CRUD Penuh:**
    -   **Create:** Menambah tugas baru melalui form.
    -   **Read:** Menampilkan semua tugas dalam daftar yang terorganisir.
    -   **Update:** Menandai tugas sebagai "Selesai" atau "Batal".
    -   **Delete:** Menghapus tugas yang tidak lagi diperlukan.
-   **[✔️] Penyimpanan Lokal:** Semua data tugas disimpan secara otomatis di `localStorage`.
-   **[✔️] Kalender Interaktif:**
    -   Menampilkan *deadline* tugas dengan indikator warna (merah untuk belum selesai, abu-abu untuk sudah selesai).
    -   Berfungsi sebagai filter tanggal saat diklik.
-   **[✔️] Filter & Pencarian:**
    -   Filter tugas berdasarkan Mata Kuliah melalui *dropdown*.
    -   Filter tugas berdasarkan Status (Semua, Selesai, Belum Selesai).
-   **[✔️] Pengelompokan & Pengurutan:**
    -   Daftar tugas otomatis dikelompokkan per mata kuliah.
    -   Tugas diurutkan otomatis berdasarkan *deadline* terdekat.
-   **[✔️] Statistik Tugas:** Menampilkan jumlah tugas yang belum selesai secara *real-time*.
-   **[✔️] Validasi Form:** Mencegah pengiriman data yang tidak valid atau kosong.

---

## Penjelasan Teknis

#### Penggunaan `localStorage`

Aplikasi ini memanfaatkan Web Storage API untuk memastikan data tugas pengguna tidak hilang.

-   **Penyimpanan Data**: Setiap kali ada perubahan data (menambah, menghapus, atau mengubah status tugas), fungsi `saveDataAndRefreshUI()` dipanggil. Di dalamnya, baris `localStorage.setItem('tasks', JSON.stringify(tasks));` akan mengubah array `tasks` menjadi format string JSON dan menyimpannya di browser pengguna dengan *key* `'tasks'`.
-   **Pengambilan Data**: Saat halaman pertama kali dimuat, baris `var tasks = JSON.parse(localStorage.getItem('tasks')) || [];` akan dieksekusi. Kode ini mencoba mengambil data dari `localStorage` menggunakan *key* `'tasks'`. Jika data ada, `JSON.parse()` akan mengubahnya kembali menjadi array JavaScript. Jika tidak ada data (misalnya saat pertama kali membuka aplikasi), sebuah array kosong `[]` akan digunakan sebagai nilai *default*.

#### Validasi Form

Untuk memastikan integritas data, aplikasi menerapkan dua lapis validasi:

1.  **Validasi Sisi Klien (HTML):** Pada file `index.html`, setiap elemen `<input>` yang wajib diisi memiliki atribut `required`. Ini adalah mekanisme pertahanan pertama yang disediakan oleh browser untuk mencegah form dikirim jika ada kolom yang kosong.
2.  **Validasi Sisi Skrip (JavaScript):** Sebelum data baru ditambahkan ke array `tasks`, fungsi `addTask()` di `index.js` melakukan pengecekan ulang dengan baris `if (!name || !course || !deadline)`. Jika salah satu dari variabel ini kosong, sebuah `alert` akan ditampilkan kepada pengguna, dan proses penambahan tugas akan dihentikan. Ini memastikan tidak ada data yang tidak lengkap yang masuk ke dalam sistem.
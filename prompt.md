# Prompt Website Ulang Tahun untuk Pacar

Buat sebuah website ulang tahun yang romantis, personal, hangat, dan elegan untuk pacarku. Website ini harus terasa seperti hadiah digital yang dibuat khusus untuknya, bukan seperti template ulang tahun biasa.

## Data yang Bisa Diganti

Gunakan data berikut sebagai placeholder yang mudah diedit:

- Nama pacar: `Jani Sayang Rinjani (bubul)`
- Nama pengirim: `Ihzra Fahrullizian (dudut)`
- Usia: `21`
- Tanggal ulang tahun: `24 Agustus 2005`
- Tanggal mulai hubungan: `28 Juni 2026`
- Pesan utama: `[TULIS PESAN ULANG TAHUN YANG PERSONAL]`
- Harapan untuknya: `[TULIS HARAPAN DAN DOA]`
- Daftar foto: `[FOTO 1]`, `[FOTO 2]`, `[FOTO 3]`, `[FOTO 4]`
- Lagu latar: `[URL ATAU FILE LAGU]`

## Arah Visual

- Gunakan gaya visual scrapbook digital yang romantis dan modern.
- Pilih palet warna blush pink, dusty rose, cream, burgundy, dan sedikit aksen gold. Hindari tampilan yang terlalu norak atau penuh ornamen.
- Gunakan kombinasi font yang ekspresif untuk judul dan font sans-serif yang bersih untuk isi teks. Jangan gunakan Arial, Roboto, atau Inter sebagai font utama.
- Tambahkan tekstur kertas halus, bingkai foto, pita, tulisan tangan, dan elemen dekoratif kecil yang terasa personal.
- Gunakan animasi lembut seperti fade-in, floating hearts yang tidak berlebihan, reveal saat scroll, dan efek confetti hanya pada momen penting.
- Pastikan website tetap nyaman dibaca, tidak terlalu ramai, dan memiliki kontras warna yang baik.

## Struktur Halaman

### 1. Layar Pembuka

Buat layar pembuka yang langsung menarik perhatian:

- Tampilkan kalimat: `Selamat ulang tahun, [NAMA PACAR]`.
- Tambahkan subteks pendek: `Ada hadiah kecil yang ingin aku tunjukkan untukmu.`
- Sediakan tombol dengan ikon hadiah dan teks `Buka hadiahmu`.
- Saat tombol ditekan, tampilkan animasi pembukaan yang halus lalu masuk ke halaman utama.
- Jangan gunakan halaman landing page yang terasa seperti promosi produk.

### 2. Hero Utama

- Tampilkan nama `[NAMA PACAR]` sebagai fokus utama.
- Tambahkan usia dan tanggal ulang tahunnya.
- Gunakan foto terbaik sebagai visual utama dengan crop yang tetap menjaga wajah terlihat jelas.
- Tampilkan pesan singkat: `Hari ini dunia merayakan seseorang yang sangat berarti untukku.`
- Tambahkan indikator scroll yang halus agar pengguna tahu masih ada cerita di bawah.

### 3. Surat Cinta

Buat bagian seperti surat yang ditulis tangan:

- Tampilkan pesan utama dari `[NAMAMU]` kepada `[NAMA PACAR]`.
- Pecah teks menjadi paragraf pendek agar nyaman dibaca di ponsel.
- Gunakan animasi teks muncul perlahan ketika bagian terlihat di layar.
- Akhiri dengan tanda tangan: `Dengan cinta, [NAMAMU]`.

### 4. Galeri Kenangan

- Buat galeri foto responsif dengan layout masonry atau polaroid yang sedikit tidak simetris namun tetap rapi.
- Setiap foto memiliki caption singkat, misalnya `Hari pertama kita`, `Momen favoritku`, atau `[CAPTION FOTO]`.
- Ketika foto diklik, buka lightbox dengan transisi lembut.
- Sediakan tombol navigasi foto dan dukung keyboard Escape untuk menutup lightbox.
- Gunakan lazy loading untuk gambar.

### 5. Timeline Hubungan

Buat timeline sederhana dan emosional yang menampilkan:

- `[TANGGAL JADIAN]` - `Awal dari cerita kita`
- `[TANGGAL MOMEN 2]` - `[DESKRIPSI MOMEN 2]`
- `[TANGGAL MOMEN 3]` - `[DESKRIPSI MOMEN 3]`
- `[TANGGAL SEKARANG]` - `Masih banyak cerita yang ingin kita buat bersama`

Timeline harus terlihat baik di desktop dan berubah menjadi susunan vertikal yang jelas di mobile.

### 6. Daftar Harapan

Tampilkan harapan untuk `[NAMA PACAR]` dalam bentuk kartu atau catatan kecil:

- Semoga selalu sehat dan bahagia.
- Semoga semua impianmu satu per satu menjadi nyata.
- Semoga kamu selalu dikelilingi orang-orang yang menyayangimu.
- Semoga kita terus menemukan alasan untuk tersenyum bersama.
- Tambahkan `[HARAPAN TAMBAHAN]`.

### 7. Interaksi Kejutan

Tambahkan fitur interaktif yang sederhana tetapi berkesan:

- Tombol `Peluk virtual` yang memunculkan animasi hati dan pesan singkat.
- Tombol `Satu hal lagi` yang membuka pesan rahasia atau kejutan terakhir.
- Setelah pesan rahasia terbuka, tampilkan confetti singkat dan kalimat: `Aku sayang kamu, hari ini dan setiap hari.`
- Sediakan kontrol musik yang jelas: play, pause, dan mute. Musik tidak boleh otomatis diputar dengan suara tanpa interaksi pengguna.

### 8. Penutup

- Tampilkan kalimat besar: `Selamat ulang tahun, [NAMA PACAR].`
- Tambahkan: `Terima kasih sudah hadir di hidupku.`
- Sertakan satu foto penutup yang hangat.
- Buat footer kecil dengan teks: `Dibuat dengan cinta oleh [NAMAMU]`.

## Persyaratan UX dan Teknis

- Website harus mobile-first dan tampil baik pada lebar layar ponsel, tablet, dan desktop.
- Gunakan HTML, CSS, dan JavaScript modern, atau React jika proyek sudah menggunakan React.
- Pisahkan komponen dan data agar nama, pesan, foto, tanggal, serta warna mudah diubah.
- Gunakan semantic HTML, alt text untuk setiap gambar, focus state yang terlihat, dan navigasi keyboard.
- Hormati `prefers-reduced-motion` dengan mengurangi atau menonaktifkan animasi bagi pengguna yang memintanya.
- Pastikan tidak ada teks yang terpotong, bertumpuk, atau keluar dari viewport.
- Gunakan tombol yang jelas dengan ikon yang sesuai, tooltip untuk ikon yang tidak umum, dan area sentuh minimal 44px di perangkat mobile.
- Optimalkan gambar agar halaman tetap ringan.
- Jangan memakai modal berlebihan, autoplay audio bersuara, gradient ungu generik, atau dekorasi yang mengganggu isi.
- Sediakan keadaan kosong atau fallback yang baik jika foto atau lagu belum diisi.
- Hasil akhir harus terasa intim, tulus, dan dibuat khusus untuk satu orang.

## Output yang Diminta

Berikan:

1. Struktur file proyek.
2. Kode lengkap untuk setiap file yang diperlukan.
3. Instruksi singkat untuk mengganti nama, teks, foto, tanggal, dan lagu.
4. Cara menjalankan website secara lokal.
5. Pastikan semua interaksi utama dapat digunakan dan tidak hanya berupa tampilan statis.

Mulai dengan membuat versi yang sudah berfungsi menggunakan placeholder di atas. Prioritaskan pengalaman emosional, keterbacaan, performa, dan tampilan yang indah di perangkat mobile.

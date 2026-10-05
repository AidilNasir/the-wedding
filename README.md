# 💍 The Wedding - Undangan Pernikahan Digital Elegan & Modern

Website undangan pernikahan digital (*digital wedding invitation*) berbasis web yang elegan, interaktif, responsif, dan siap digunakan sebagai portofolio maupun template untuk pesanan klien.

---

## ✨ Fitur Unggulan

- **💌 Sampul / Cover Interaktif**: Halaman depan eksklusif dengan nama tamu yang dipersonalisasi serta animasi transisi saat membuka undangan.
- **🎵 Pemutar Musik Latar (Floating Player)**: Dilengkapi tombol logo musik melayang di sudut layar untuk kontrol putar/jeda lagu latar secara mulus.
- **👫 Profil Mempelai**: Informasi mempelai pria dan wanita dengan desain elegan bertema *luxury dark & gold*.
- **⏳ Wedding Countdown & Jadwal Acara**:
  - Penghitung waktu mundur (*Hari, Jam, Menit, Detik*).
  - Kartu jadwal acara **Akad Nikah** & **Resepsi Pernikahan**.
  - Tombol simpan ke **Google Calendar** dan unduh file kalender **iCal (.ics)**.
  - Tautan petunjuk arah langsung ke **Google Maps**.
- **📖 Linimasa Kisah Cinta (Love Story)**: Menampilkan perjalanan dan momen berharga kedua mempelai.
- **🎥 Siaran Langsung (Live Streaming)**: Fasilitas bagi tamu undangan yang berhalangan hadir untuk menyaksikan acara secara virtual.
- **📸 Galeri Foto Kolase Prewedding**: Tata letak kolase foto modern dan dinamis yang rapi di berbagai ukuran layar ponsel maupun desktop.
- **🎁 Amplop Digital & RSVP**:
  - Kemudahan kirim tanda kasih melalui nomor rekening bank atau QRIS dengan fitur salin nomor rekening instan.
  - Formulir konfirmasi kehadiran tamu (*Hadir* / *Berhalangan*).
- **✍️ Buku Tamu & Doa Restu (Wishes)**: Kolom interaktif untuk mengirimkan ucapan selamat dan doa restu dilengkapi animasi confetti yang meriah.
- **📱 Responsif & Ringan**: Tampilan optimal di smartphone, tablet, maupun layar desktop.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Animasi & Interaktivitas**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) & [Motion](https://motion.dev/)
- **Font**: Cormorant Garamond & Montserrat (Google Fonts)

---

## 🚀 Cara Menjalankan Proyek di Lokal

### Prasyarat
- Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas direkomendasikan).

### Langkah Instalasi

1. **Clone atau Buka Direktori Proyek**:
   ```bash
   cd the-wedding
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di: `http://localhost:3000`

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

5. **Pratinjau Hasil Build**:
   ```bash
   npm run preview
   ```

---

## 🎯 Personalisasi Nama Tamu (URL Parameter)

Anda dapat mengirimkan tautan undangan dengan nama tamu yang otomatis terisi pada sampul depan menggunakan query parameter `?to=` atau `?guest=`:

```text
http://localhost:3000/?to=Bapak+Ahmad+Subarjo
http://localhost:3000/?to=Keluarga+Besar+Haji+Sulaiman
```

---

## ⚙️ Kustomisasi Data & Konten

Semua data teks, informasi mempelai, tanggal acara, nomor rekening, cerita, dan konfigurasi musik dapat diubah dengan mudah pada file:

```
src/data/weddingData.ts
```

Foto dan file audio dapat diperbarui di dalam direktori:
- Foto galeri & profil: `public/images/` atau `src/assets/`
- Audio musik latar: `public/audio/`

---

## 👨‍💻 Kontributor & Kredit

- **Design & Developed by**: **A² Dev**
- **Musik Latar**: Lagu Tradisional Bugis - *Cuppe Atikku*

---

## 📄 Lisensi (License)

Proyek ini dilindungi di bawah lisensi **MIT License** © 2026 **A² Dev**.

Silakan lihat file [LICENSE](LICENSE) untuk informasi hak cipta dan ketentuan penggunaan lebih lanjut.

# PRD — SocialHub: Campus Social & Prediction Platform

> **Meet People. Share Moments. Predict Campus Life.**

---

## 1. Document Control & Executive Summary

### 1.1 Document Control

| Atribut | Nilai |
|---|---|
| Nama Produk | SocialHub — Campus Social & Prediction Platform |
| Tagline | Meet People. Share Moments. Predict Campus Life. |
| Institusi | Cakrawala University |
| Target Kampus | Kemang & Sudirman |
| Jenis Proyek | University Hackathon |
| Durasi Hackathon | 5 jam |
| Versi Dokumen | 1.0 (Hackathon MVP) |
| Platform | Responsive Web Application (Desktop & Mobile) |
| Tim & Role | **Roy** — Social Discovery Lead (`roy-work`)<br>**Surya** — Campus Pulse Lead (`surya-work`)<br>**Fachri** — Core Architecture, Data & Pitch Lead (`fachri-work`) |
| Status | Disetujui untuk eksekusi |

### 1.2 Product Overview & Value Proposition

SocialHub adalah platform sosial digital untuk mahasiswa Cakrawala University yang menggabungkan dua fitur dalam satu aplikasi:

- **Social Discovery:** Mahasiswa menemukan teman, study buddy, partner proyek, teman nongkrong, atau pasangan melalui kartu swipe. Pencarian dapat difilter per kampus (Kemang atau Sudirman) dan per tujuan, sehingga mahasiswa bisa berkenalan lintas prodi dan lintas kampus tanpa harus menunggu kebetulan bertemu.
- **Campus Pulse:** Prediction market ringan tentang kejadian kampus sehari-hari, misalnya hasil pertandingan futsal di Cakrawala Arena, jumlah peserta acara, atau prodi pemenang lomba. Mahasiswa memprediksi dengan Virtual Campus XP dan melihat peringkat di leaderboard.

**Nilai utama:**

| Pengguna | Nilai yang Diterima |
|---|---|
| Mahasiswa | Mudah menemukan teman dan partner belajar lintas prodi serta lintas kampus. |
| Mahasiswa | Ikut merasakan denyut kehidupan kampus lewat prediksi yang interaktif. |
| Komunitas kampus | Melihat antusiasme mahasiswa terhadap suatu acara melalui persentase prediksi. |
| Tim hackathon | Mendapatkan prototipe demo yang utuh dengan 2 modul berfungsi dan data simulasi yang konsisten. |

### 1.3 Compliance & Safety Disclaimer

> ⚠️ **Disclaimer Wajib**
>
> 1. **Bukan judi atau taruhan.** SocialHub tidak menerima, menyimpan, atau memproses uang sungguhan dalam bentuk apa pun. Tidak ada fitur deposit, penarikan (withdrawal), maupun transfer nilai ke luar aplikasi.
> 2. **Virtual Campus XP tanpa nilai uang.** Seluruh sistem prediksi hanya menggunakan *Virtual Campus XP*, yaitu poin reputasi virtual. XP tidak dapat dibeli, ditukar, dipindahtangankan, atau diuangkan. XP hanya berfungsi sebagai penanda reputasi di leaderboard.
> 3. **Data simulasi untuk demo.** Seluruh profil mahasiswa, topik prediksi, pesan chat, dan skor leaderboard dalam versi ini bersifat **fiktif**. Data disimpan secara lokal di browser (`localStorage`) dan tidak dikirim ke server mana pun.
> 4. **Tidak ada klaim pengguna aktual.** Target angka pada dokumen ini adalah target demonstrasi, bukan jumlah pengguna nyata.
> 5. **Tidak ada pemrosesan data pribadi nyata.** Mahasiswa yang muncul di demo adalah karakter fiktif. Pengguna tidak diminta memasukkan NIM, email kampus, atau data identitas lain.

---

## 2. Problem Statement & Target Personas

### 2.1 Social Connection Problem

Mahasiswa Cakrawala University, khususnya yang tersebar di dua kampus (Kemang dan Sudirman), sering kesulitan:

- Menemukan teman baru di luar program studi sendiri.
- Mengenal mahasiswa dari angkatan yang berbeda.
- Menemukan rekan dengan minat serupa untuk belajar, berproyek, atau sekadar nongkrong.
- Membangun koneksi dengan mahasiswa dari kampus lain, padahal banyak kegiatan lintas kampus berlangsung.
- Mendapatkan study buddy yang cocok dengan jadwal dan tujuan belajar.

Saat ini, interaksi sosial mahasiswa bergantung pada pertemuan kebetulan di kelas atau pada media sosial umum yang tidak dirancang untuk komunitas kampus. Akibatnya, koneksi yang sebenarnya bisa terjadi sering tidak pernah terbentuk.

### 2.2 Campus Engagement Problem

Mahasiswa sering tidak tahu:

- Aktivitas apa yang sedang ramai di kampus.
- Kompetisi atau pertandingan apa yang akan berlangsung.
- Siapa yang kemungkinan memenangkan suatu pertandingan atau lomba.
- Acara apa yang akan diselenggarakan dan seberapa besar antusiasmenya.
- Topik apa yang sedang dibicarakan mahasiswa.

Belum ada satu wadah yang menggabungkan diskusi komunitas dengan prediksi kejadian kampus secara interaktif dan terukur.

### 2.3 Proposed Solution

SocialHub menghadirkan satu ruang digital yang:

1. Mempertemukan mahasiswa lintas prodi dan kampus melalui *Social Discovery*.
2. Menghidupkan komunitas kampus melalui *Campus Pulse*, yaitu prediksi kolektif dengan Virtual Campus XP.

### 2.4 Target Personas

| Persona | Deskripsi | Kebutuhan Utama | Fitur Terkait |
|---|---|---|---|
| **Mahasiswa Reguler** (Primary) | Mahasiswa S1 Data Science semester 2–3 di Kemang atau Sudirman. | Teman belajar, partner proyek, teman nongkrong, dan hiburan kampus. | Social Discovery, Campus Pulse |
| **Event Organizer / Komunitas Kampus** (Secondary) | Ketua UKM, panitia acara, atau pengurus komunitas mahasiswa. | Membuat prediksi seputar acara dan melihat antusiasme peserta. | Create Prediction, Campus Pulse |
| **Campus Admin** (Secondary, simulasi) | Pengelola kampus yang memastikan konten wajar. | Memastikan prediksi tidak melanggar aturan. | Pada demo hanya diwakili oleh aturan konten dan tombol Reset Demo Data. Moderasi penuh masuk *Future Roadmap*. |

#### Persona Detail: Mahasiswa Reguler

- **Contoh:** Mahasiswa Data Science di Kemang yang ingin mencari teman belajar untuk statistik dan tertarik ikut futsal di Sudirman.
- **Pain points:** Kelas yang berbeda kampus, sulit berkenalan di luar kelas, tidak tahu acara kampus.
- **Keberhasilan bagi persona ini:** Mendapat satu match yang relevan dan ikut memprediksi satu kejadian kampus dalam 5 menit pertama.

---

## 3. Functional Requirements & User Stories (MVP Scope)

### 3.1 Prinsip Prioritas (MoSCoW)

| Prioritas | Arti | Diterapkan pada Demo Hari Ini |
|---|---|---|
| **Must-Have** | Wajib ada agar demo berjalan dan tujuan hackathon tercapai. | Ya |
| **Should-Have** | Penting dan sebaiknya ada, tetapi dapat dikorbankan jika waktu mepet. | Sebagian |
| **Could-Have** | Menambah nilai, dikerjakan hanya jika semua Must-Have selesai. | Tidak diprioritaskan |
| **Won't-Have (Future Roadmap)** | Tidak dikerjakan pada versi ini. | Tidak |

### 3.2 Ringkasan Cakupan

| Kode | Fitur | Prioritas | Branch | Status |
|---|---|---|---|---|
| DSC | Social Discovery (Swipe, Filter, Mutual Match, Chat Simulation) | Must-Have | `roy-work` | Wajib |
| CPL | Campus Pulse (List, Voting XP, Bar Persentase, Create, Leaderboard) | Must-Have | `surya-work` | Wajib |
| CORE | Core System (Session default, Header XP, Persistensi, Reset Demo, Mock Data) | Must-Have | `fachri-work` | Wajib |
| — | Login / autentikasi simulasi | Won't-Have | — | Dihapus, sesi default langsung aktif |
| — | Halaman Home dashboard terpisah | Could-Have | — | Digantikan oleh tab Discover sebagai landing |
| — | Halaman Profile (lihat dan edit) | Could-Have | — | Hanya tampilan read-only jika sempat |
| — | Moderasi: report dan admin review | Won't-Have | — | Future Roadmap |
| — | Prediction Detail halaman terpisah | Could-Have | `surya-work` | Detail ditampilkan di dalam `VoteCard` |

### 3.3 Modul 1 — Social Discovery (`roy-work`)

**Tujuan modul:** Pengguna dapat menjelajahi profil mahasiswa, menyukai atau melewati profil, dan memulai percakapan setelah match.

#### User Stories

| ID | User Story | Prioritas |
|---|---|---|
| DSC-01 | Sebagai mahasiswa, saya ingin melihat kartu profil mahasiswa lain agar saya bisa mengenal mereka. | Must |
| DSC-02 | Sebagai mahasiswa, saya ingin swipe kanan untuk menyukai profil agar saya bisa menunjukkan ketertarikan. | Must |
| DSC-03 | Sebagai mahasiswa, saya ingin swipe kiri untuk melewati profil agar saya tidak melihat profil yang tidak relevan lagi. | Must |
| DSC-04 | Sebagai mahasiswa, saya ingin memfilter profil berdasarkan kampus (Kemang atau Sudirman) agar saya bisa mencari teman di kampus tertentu. | Must |
| DSC-05 | Sebagai mahasiswa, saya ingin memfilter profil berdasarkan tujuan (*Study Buddy*, *Project Partner*, *Hangout*, *Dating*) agar pencarian sesuai kebutuhan saya. | Must |
| DSC-06 | Sebagai mahasiswa, saya ingin mendapat notifikasi pop-up saat ada *mutual match* agar saya tahu koneksi berhasil. | Must |
| DSC-07 | Sebagai mahasiswa, saya ingin membuka simulasi chat dengan match saya agar saya bisa mencoba berkomunikasi. | Must |
| DSC-08 | Sebagai mahasiswa, saya ingin melihat minat dan prodi pada kartu agar saya bisa menilai kecocokan. | Must |
| DSC-09 | Sebagai mahasiswa, saya ingin tombol aksi (like/pass) juga tersedia tanpa swipe agar nyaman di desktop. | Should |
| DSC-10 | Sebagai mahasiswa, saya ingin melihat daftar match saya agar mudah kembali ke chat. | Should |

#### Acceptance Criteria

**DSC-01 — Kartu Profil**
- [ ] Setiap kartu menampilkan avatar (emoji), nama, prodi, angkatan, kampus, bio singkat, dan minimal 2 minat.
- [ ] Kartu tidak menampilkan data yang tidak ada di `UserProfile`.
- [ ] Jika seluruh profil yang cocok dengan filter sudah habis, tampil pesan kosong: "Kamu sudah melihat semua profil di filter ini."

**DSC-02 & DSC-03 — Swipe**
- [ ] Swipe kanan dan swipe kiri berfungsi di mobile (sentuh) dan desktop (drag mouse atau tombol).
- [ ] Setiap aksi berpindah ke kartu berikutnya dalam waktu kurang dari 300 ms (tanpa delay jaringan).
- [ ] Profil yang sudah di-swipe tidak muncul lagi selama sesi yang sama.

**DSC-04 & DSC-05 — Filter**
- [ ] Filter kampus dan tujuan dapat dikombinasikan (misalnya: Kemang + Dating).
- [ ] Mengubah filter langsung memperbarui daftar kartu tanpa reload halaman.
- [ ] Profil yang tidak memiliki tujuan yang dipilih tidak muncul.

**DSC-06 — Mutual Match**
- [ ] Pop-up match muncul hanya jika swipe kanan pada profil dengan `willLikeBack: true`.
- [ ] Pop-up menampilkan avatar dan nama kedua pihak serta tombol "Kirim Pesan" dan "Lanjut Swipe".
- [ ] Match yang sudah terjadi tersimpan di `localStorage` dan tidak memunculkan pop-up dua kali untuk profil yang sama.
- [ ] Callback `onMatch(profile)` dipanggil tepat satu kali per match.

**DSC-07 — Chat Simulation**
- [ ] Pengguna dapat mengetik dan mengirim pesan.
- [ ] Balasan otomatis muncul setelah jeda 1–2 detik, diambil dari `autoReplies` di `mockData.js`.
- [ ] Riwayat chat per match tersimpan dan tetap ada setelah refresh.
- [ ] Pesan kosong tidak dapat dikirim.

**DSC-08 — Informasi Kartu**
- [ ] Prodi dan minat yang sama dengan pengguna (jika ada) ditandai dengan warna berbeda.

**DSC-09 & DSC-10 — Should-Have**
- [ ] Tombol like/pass berfungsi sebagai alternatif swipe.
- [ ] Daftar match menampilkan semua match aktif dan membuka chat saat diklik.

### 3.4 Modul 2 — Campus Pulse (`surya-work`)

**Tujuan modul:** Pengguna dapat melihat prediksi kampus, memberikan suara dengan Virtual Campus XP, melihat perubahan persentase secara langsung, membuat prediksi baru, dan melihat peringkat.

#### Aturan Bisnis Campus Pulse

| Aturan | Nilai |
|---|---|
| Mata uang | Virtual Campus XP (tanpa nilai uang) |
| Saldo awal pengguna | 1.000 XP |
| Stake per vote | 100 XP (tetap, tidak dapat dinegosiasi pada demo) |
| Satu vote per prediksi | Ya. Setelah memilih, pengguna tidak dapat mengubah pilihan di prediksi yang sama. |
| Pilihan jawaban | Dua sisi: **Ya** dan **Tidak** |
| Persentase | `yesPercent = round(pool.yes / (pool.yes + pool.no) × 100)`. Jika total pool 0, tampilkan 50 / 50. |
| Saldo tidak cukup | Vote ditolak dengan pesan "XP kamu tidak cukup". |
| Bonus pembuat prediksi | +50 XP per prediksi yang berhasil dibuat (untuk menjaga dinamika leaderboard). Bonus hanya diberikan sekali per prediksi. |
| Batas pembuatan | Maksimal 3 prediksi baru per sesi demo, untuk mencegah spam saat demo. |

#### User Stories

| ID | User Story | Prioritas |
|---|---|---|
| CPL-01 | Sebagai mahasiswa, saya ingin melihat daftar prediksi kampus yang sedang terbuka agar saya tahu apa yang bisa saya prediksi. | Must |
| CPL-02 | Sebagai mahasiswa, saya ingin memilih Ya atau Tidak pada sebuah prediksi menggunakan Campus XP agar saya ikut berpartisipasi. | Must |
| CPL-03 | Sebagai mahasiswa, saya ingin melihat bar persentase yang berubah setelah saya atau orang lain memilih agar saya tahu tren komunitas. | Must |
| CPL-04 | Sebagai mahasiswa, saya ingin membuat prediksi baru melalui modal agar saya bisa menanyakan hal yang sedang ramai di kampus. | Must |
| CPL-05 | Sebagai mahasiswa, saya ingin melihat leaderboard yang diurutkan berdasarkan saldo XP agar saya tahu posisi saya. | Must |
| CPL-06 | Sebagai mahasiswa, saya ingin melihat saldo XP saya di header agar saya tahu berapa yang tersisa. | Must |
| CPL-07 | Sebagai mahasiswa, saya ingin memfilter prediksi berdasarkan kampus dan kategori agar lebih mudah menemukan topik yang saya minati. | Should |
| CPL-08 | Sebagai mahasiswa, saya ingin melihat sisa waktu (*closesAt*) pada setiap prediksi agar tahu kapan voting ditutup. | Should |
| CPL-09 | Sebagai mahasiswa, saya ingin melihat riwayat vote saya agar tahu prediksi mana yang sudah saya ikuti. | Should |
| CPL-10 | Sebagai pengguna, saya ingin dapat menyelesaikan (*resolve*) prediksi secara manual pada demo agar leaderboard bisa dibagikan ke pemenang. | Could |

#### Acceptance Criteria

**CPL-01 — Daftar Prediksi**
- [ ] Minimal 8 prediksi seed tampil dari `mockData.js`.
- [ ] Setiap item menampilkan pertanyaan, kategori, kampus, jumlah peserta, dan bar persentase.
- [ ] Prediksi dengan `status: "closed"` tampil dengan label "Ditutup" dan tombol vote dinonaktifkan.

**CPL-02 — Voting**
- [ ] Klik Ya atau Tidak mengurangi saldo sebesar 100 XP.
- [ ] `pool` pada sisi yang dipilih bertambah 100.
- [ ] Vote yang sama tidak bisa dilakukan dua kali (tombol berubah menjadi "Sudah Vote").
- [ ] Jika saldo kurang dari 100, tombol vote menampilkan pesan error dan saldo tidak berubah.
- [ ] Callback `onVote(marketId, side)` mengembalikan `true` jika berhasil, `false` jika gagal.

**CPL-03 — Bar Persentase Dinamis**
- [ ] Bar terisi sesuai `yesPercent` dan memiliki transisi animasi maksimal 500 ms.
- [ ] Persentase Ya dan Tidak selalu berjumlah 100%.
- [ ] Saat pool total 0, bar tampil 50 / 50 dan tidak menampilkan error NaN.
- [ ] Perubahan bar terlihat langsung tanpa reload halaman.

**CPL-04 — Create Prediction**
- [ ] Modal memiliki field: pertanyaan (10–120 karakter), kategori (dropdown), kampus (Kemang / Sudirman / Keduanya), dan tanggal tutup.
- [ ] Tombol "Buat" nonaktif jika field wajib kosong atau pertanyaan kurang dari 10 karakter.
- [ ] Setelah berhasil, prediksi baru langsung muncul di bagian atas daftar.
- [ ] Pembuat mendapat bonus 50 XP.
- [ ] Setelah 3 prediksi dibuat, tombol "Buat" menampilkan pesan batas tercapai.
- [ ] Callback `onCreatePrediction(payload)` mengembalikan objek prediksi yang sudah lengkap dengan `id`.

**CPL-05 — Leaderboard**
- [ ] Menampilkan top 10 pengguna berdasarkan `xp`, termasuk pengguna saat ini.
- [ ] Pengguna saat ini diberi highlight.
- [ ] Urutan berubah setelah vote atau bonus XP.
- [ ] Jika XP sama, urutan ditentukan berdasarkan nama (A–Z) agar stabil.

**CPL-06 — Header XP**
- [ ] Saldo XP tampil di header pada semua tab.
- [ ] Saldo diperbarui secara sinkron setelah vote atau create prediction.

**CPL-07 — Filter Prediksi (Should)**
- [ ] Filter kampus dan kategori dapat dikombinasikan.

**CPL-08 — Waktu Tutup (Should)**
- [ ] Format waktu tersisa mudah dibaca, misalnya "2 jam lagi" atau "Ditutup".

**CPL-09 — Riwayat Vote (Should)**
- [ ] Riwayat menampilkan prediksi yang sudah divote beserta pilihan dan jumlah XP.

**CPL-10 — Resolve Manual (Could)**
- [ ] Tombol khusus demo menetapkan hasil "Ya" atau "Tidak". Pot dibagikan proporsional ke pemilih pemenang. Hanya dikerjakan jika Must-Have Campus Pulse selesai.

### 3.5 Modul 3 — Core System & Persistence (`fachri-work`)

**Tujuan modul:** Menyediakan fondasi aplikasi, sesi default, persistensi data, dan konten simulasi.

#### User Stories

| ID | User Story | Prioritas |
|---|---|---|
| CORE-01 | Sebagai pengguna, saya ingin langsung masuk ke aplikasi tanpa login agar demo tidak memakan waktu. | Must |
| CORE-02 | Sebagai pengguna, saya ingin memulai dengan saldo 1.000 XP agar bisa langsung mencoba voting. | Must |
| CORE-03 | Sebagai pengguna, saya ingin data saya (XP, vote, match, chat, prediksi baru) tetap ada setelah refresh agar demo tidak hilang. | Must |
| CORE-04 | Sebagai presenter, saya ingin tombol Reset Demo Data agar saya bisa mengulang demo dari kondisi awal. | Must |
| CORE-05 | Sebagai pengguna, saya ingin berpindah antar tab Discover, Campus Pulse, dan Leaderboard melalui navbar agar mudah dinavigasi. | Must |
| CORE-06 | Sebagai tim, kami ingin seluruh data simulasi berada di satu file agar konsisten. | Must |
| CORE-07 | Sebagai presenter, saya ingin tampilan rapi di layar proyektor dan HP agar demo meyakinkan. | Should |
| CORE-08 | Sebagai tim, kami ingin pitch deck tersimpan dan siap ditampilkan saat presentasi. | Should |

#### Acceptance Criteria

**CORE-01 — Sesi Default**
- [ ] Aplikasi langsung menampilkan tab Discover saat dibuka.
- [ ] Tidak ada halaman login, registrasi, atau pemilihan akun.
- [ ] Pengguna saat ini memiliki `id: "me"` dan nama "Kamu" sebagai default.

**CORE-02 — Saldo Awal**
- [ ] Saldo XP awal adalah 1.000 pada sesi baru.
- [ ] Saldo tidak pernah bernilai negatif.

**CORE-03 — Persistensi**
- [ ] Semua perubahan state disimpan ke `localStorage` setiap kali terjadi perubahan.
- [ ] Setelah refresh, state kembali sama persis dengan sebelum refresh.
- [ ] Jika data `localStorage` rusak atau tidak valid, aplikasi memuat ulang data seed tanpa crash.

**CORE-04 — Reset Demo Data**
- [ ] Tombol Reset ada di Header atau halaman pengaturan kecil.
- [ ] Reset meminta konfirmasi sebelum menghapus data.
- [ ] Setelah reset, saldo kembali 1.000 XP, seluruh vote dan prediksi buatan pengguna hilang, match dan chat dikosongkan, dan 8 prediksi seed kembali.

**CORE-05 — Navigasi**
- [ ] Navbar memiliki 3 tab: Discover, Campus Pulse, Leaderboard.
- [ ] Tab aktif memiliki indikator visual yang jelas.
- [ ] Perpindahan tab tidak menghapus state halaman lain.

**CORE-06 — Data Seed**
- [ ] `src/data/mockData.js` berisi minimal 12 `UserProfile` dan 8 `PredictionMarket`.
- [ ] Setiap profil memiliki kampus Kemang atau Sudirman.
- [ ] Data seed mengikuti skema pada Bagian 4.

---

## 4. Data Schema & Component Contracts (Technical Spec)

### 4.1 Konvensi Penamaan

| Aturan | Contoh |
|---|---|
| Field JSON memakai camelCase | `willLikeBack`, `closesAt` |
| ID berbentuk string | `"u01"`, `"pm01"`, `"me"` |
| Nilai enum memakai huruf kecil dengan underscore | `"study_buddy"`, `"project_partner"` |
| Nama kampus memakai kapitalisasi awal | `"Kemang"`, `"Sudirman"` |
| Timestamp memakai ISO 8601 | `"2026-11-21T15:00:00+07:00"` |
| Uang atau XP selalu integer | `1000`, `100` |

### 4.2 Enum Global

```json
{
  "campus": ["Kemang", "Sudirman"],
  "goal": ["study_buddy", "project_partner", "hangout", "dating"],
  "marketCategory": ["sports", "akademik", "event", "kantin", "komunitas"],
  "marketStatus": ["open", "closed", "resolved"],
  "side": ["yes", "no"]
}
```

### 4.3 Skema `UserProfile`

Digunakan untuk kartu Discover dan leaderboard. Minimal 12 sampel di `mockData.js`.

```json
{
  "id": "u01",
  "name": "Raka Pratama",
  "campus": "Kemang",
  "prodi": "Data Science",
  "angkatan": 2025,
  "avatar": "🧑🏻‍💻",
  "bio": "Suka ngoding sambil dengerin lofi. Cari teman ngerjain tugas statistik.",
  "interests": ["Coding", "Futsal", "Kopi"],
  "goals": ["study_buddy", "project_partner"],
  "willLikeBack": true
}
```

| Field | Tipe | Wajib | Aturan |
|---|---|---|---|
| `id` | string | Ya | Unik. Format `u01` sampai `u12` untuk seed. |
| `name` | string | Ya | 3–40 karakter. |
| `campus` | enum | Ya | `Kemang` atau `Sudirman`. |
| `prodi` | string | Ya | Contoh: `Data Science`, `Informatika`, `Manajemen`, `DKV`. |
| `angkatan` | integer | Ya | Tahun masuk, antara 2023 dan 2026. |
| `avatar` | string | Ya | Satu emoji. |
| `bio` | string | Ya | Maksimal 140 karakter. |
| `interests` | string[] | Ya | 2–5 item. |
| `goals` | enum[] | Ya | Minimal 1 item dari `goal`. |
| `willLikeBack` | boolean | Ya | Khusus demo. `true` berarti swipe kanan akan menghasilkan match. |

**Aturan distribusi seed (12 profil):**
- Minimal 5 profil di Kemang dan 5 di Sudirman.
- Minimal 6 profil dengan `willLikeBack: true`.
- Setiap tujuan (`goal`) muncul minimal di 3 profil.
- Minimal 4 prodi berbeda.

### 4.4 Skema `PredictionMarket`

Digunakan untuk daftar dan detail voting di Campus Pulse. Minimal 8 sampel di `mockData.js`.

```json
{
  "id": "pm01",
  "question": "Futsal Cakrawala Arena: Kemang menang lawan Sudirman?",
  "category": "sports",
  "campus": "Both",
  "createdBy": "u03",
  "status": "open",
  "closesAt": "2026-11-21T17:00:00+07:00",
  "pool": { "yes": 1200, "no": 800 },
  "votes": [
    { "userId": "u05", "side": "yes", "amount": 100 },
    { "userId": "u09", "side": "no", "amount": 100 }
  ]
}
```

| Field | Tipe | Wajib | Aturan |
|---|---|---|---|
| `id` | string | Ya | Format `pm01` sampai `pm08` untuk seed, `pm-<timestamp>` untuk buatan pengguna. |
| `question` | string | Ya | 10–120 karakter, diakhiri tanda tanya. |
| `category` | enum | Ya | Salah satu dari `marketCategory`. |
| `campus` | enum | Ya | `Kemang`, `Sudirman`, atau `Both`. |
| `createdBy` | string | Ya | ID user pembuat (`u01`–`u12` atau `me`). |
| `status` | enum | Ya | `open`, `closed`, atau `resolved`. |
| `closesAt` | string (ISO) | Ya | Waktu tutup voting. |
| `pool` | object | Ya | `{ yes: integer, no: integer }`. Total XP per sisi. |
| `votes` | array | Ya | Daftar vote. Setiap item: `{ userId, side, amount }`. |
| `outcome` | enum / null | Tidak | Diisi hanya jika `status: "resolved"`. |

**Aturan seed (8 prediksi):**
- Minimal 2 prediksi per kampus (Kemang, Sudirman) dan minimal 1 bertipe `Both`.
- Minimal 3 kategori berbeda.
- Minimal 2 prediksi berstatus `open` dengan `closesAt` yang masih di masa depan saat demo.
- Minimal 1 prediksi berstatus `closed` untuk menunjukkan label ditutup.
- Pool awal tidak boleh 0:0, kecuali untuk satu prediksi yang memang diuji sebagai kasus 50/50.

### 4.5 Skema `CurrentUser` (Session)

```json
{
  "id": "me",
  "name": "Kamu",
  "xp": 1000,
  "votes": { "pm01": "yes" },
  "matches": ["u01", "u05"],
  "chats": {
    "u01": [
      { "from": "me", "text": "Hai, mau bareng ngerjain tugas?", "sentAt": "2026-11-21T14:02:00+07:00" },
      { "from": "u01", "text": "Boleh! Besok di Kemang ya.", "sentAt": "2026-11-21T14:02:03+07:00" }
    ]
  },
  "createdMarkets": ["pm-1732170000000"],
  "bonusClaimed": ["pm-1732170000000"]
}
```

| Field | Tipe | Aturan |
|---|---|---|
| `xp` | integer | Mulai 1000. Minimal 0. |
| `votes` | object | Map `marketId` ke `side`. Satu vote per prediksi. |
| `matches` | string[] | Daftar `userId` yang sudah match. |
| `chats` | object | Map `userId` ke array pesan. |
| `createdMarkets` | string[] | Maksimal 3. |
| `bonusClaimed` | string[] | Mencegah bonus ganda. |

### 4.6 Kunci `localStorage`

| Kunci | Isi | Pemilik Tulis |
|---|---|---|
| `socialhub:v1:user` | Objek `CurrentUser` | `storage.js` (via `App.jsx`) |
| `socialhub:v1:predictions` | Array `PredictionMarket` | `storage.js` (via `App.jsx`) |
| `socialhub:v1:meta` | `{ seededAt, version }` | `storage.js` |

Versi `v1` pada kunci memudahkan reset total jika skema berubah saat hackathon.

### 4.7 Kontrak Props dan Fungsi

Komponen **tidak** mengakses `localStorage` secara langsung. Semua data dan aksi melewati `App.jsx`.

#### `storage.js` (Fachri)

| Fungsi | Parameter | Return | Keterangan |
|---|---|---|---|
| `loadUser()` | — | `CurrentUser` | Membaca user dari storage. Jika kosong atau rusak, kembalikan seed default. |
| `saveUser(user)` | `CurrentUser` | `void` | Menyimpan user. |
| `loadPredictions()` | — | `PredictionMarket[]` | Membaca prediksi. Jika kosong, kembalikan 8 seed. |
| `savePredictions(list)` | `PredictionMarket[]` | `void` | Menyimpan prediksi. |
| `resetDemo()` | — | `void` | Menghapus kedua kunci dan memuat ulang seed. |

#### `App.jsx` (Fachri)

Menyimpan state global, meneruskan props ke halaman, dan menangani aksi.

| Aksi | Dipanggil oleh | Efek |
|---|---|---|
| `handleMatch(profile)` | `DiscoverPage` | Menambah `profile.id` ke `user.matches`. Menyimpan. |
| `handleVote(marketId, side)` | `PulsePage` | Mengurangi 100 XP, menambah `pool[side]`, mencatat vote. Mengembalikan `boolean`. |
| `handleCreatePrediction(payload)` | `PulsePage` | Membuat prediksi, memberi bonus 50 XP, mengembalikan objek prediksi baru. |
| `handleSendMessage(userId, text)` | `DiscoverPage` | Menambah pesan ke `user.chats[userId]`. |
| `handleReset()` | `Header` | Memanggil `resetDemo()` dan memuat ulang state. |

#### `DiscoverPage` (Roy)

| Prop | Tipe | Keterangan |
|---|---|---|
| `profiles` | `UserProfile[]` | Seluruh profil seed. Filter dilakukan di dalam komponen. |
| `currentUser` | `CurrentUser` | Untuk menentukan match dan chat. |
| `onMatch` | `(profile) => void` | Dipanggil tepat sekali saat mutual match. |
| `onSendMessage` | `(userId, text) => void` | Dipanggil saat pesan dikirim. |

#### `PulsePage` (Surya)

| Prop | Tipe | Keterangan |
|---|---|---|
| `predictions` | `PredictionMarket[]` | Seluruh prediksi. |
| `currentUser` | `CurrentUser` | Untuk saldo dan status vote. |
| `onVote` | `(marketId, side) => boolean` | `true` jika berhasil. |
| `onCreatePrediction` | `(payload) => PredictionMarket \| null` | `null` jika gagal (batas tercapai atau validasi). |
| `profiles` | `UserProfile[]` | Untuk menampilkan nama pembuat dan leaderboard. |

#### `Leaderboard` (Surya, di dalam `PulsePage` atau tab terpisah)

| Prop | Tipe | Keterangan |
|---|---|---|
| `users` | `Array<{ id, name, xp }>` | Gabungan profil seed dan user saat ini. |
| `currentUserId` | string | Untuk highlight. |

> **Catatan perubahan kontrak:** Versi README sebelumnya menggunakan `onSpendXp(amount)`. Kontrak ini diganti menjadi `onVote(marketId, side)` agar logika voting (pool dan vote tunggal) berada di satu tempat. Perubahan ini disepakati dan berlaku mulai dokumen ini.

#### Aturan Kontrak

1. Perubahan nama field atau props wajib disetujui ketiga anggota tim.
2. Jika butuh field baru, Roy dan Surya meminta kepada Fachri, lalu Fachri memperbarui `mockData.js` dan dokumen ini.
3. Tidak ada komponen yang menulis langsung ke `localStorage`.

---

## 5. Non-Functional Requirements & Demo Success Metrics

### 5.1 Responsivitas

| Kriteria | Target |
|---|---|
| Mobile-first | Layout dirancang mulai dari lebar 360 px. |
| Tablet | Layout tetap rapi pada lebar 768 px. |
| Desktop | Layout optimal pada lebar 1280 px ke atas. Kartu Discover tidak melebar lebih dari 420 px. |
| Orientasi | Potrait dan landscape di HP tidak memotong tombol aksi. |
| Proyektor | Teks utama minimal 16 px. Kontras teks memenuhi WCAG AA (rasio minimal 4.5:1). |

### 5.2 Performa

| Kriteria | Target |
|---|---|
| Waktu muat awal | Kurang dari 2 detik pada koneksi lokal (`npm run dev`) dan hasil `npm run build` yang dibuka lewat `vite preview`. |
| Respons aksi | Swipe, vote, dan kirim chat terlihat hasilnya dalam 300 ms. |
| Jaringan | Tidak ada panggilan API eksternal. Semua data berasal dari `mockData.js` dan `localStorage`. |
| Ukuran `localStorage` | Di bawah 1 MB per kunci. |

### 5.3 Keandalan & Stabilitas

- Tidak ada error merah di console browser saat alur demo utama dijalankan.
- `npm run build` berhasil tanpa error sebelum presentasi.
- Refresh browser di tengah alur tidak menghilangkan data.
- Data `localStorage` yang rusak tidak membuat aplikasi crash.

### 5.4 Kompatibilitas Browser

- Google Chrome dan Microsoft Edge versi terbaru (wajib).
- Safari di iOS versi terbaru (disarankan).
- Firefox (opsional).

### 5.5 Aksesibilitas Dasar

- Tombol Ya, Tidak, Like, dan Pass memiliki label teks atau `aria-label`.
- Navigasi dapat dilakukan dengan keyboard (Tab dan Enter).
- Modal dapat ditutup dengan tombol Escape.

### 5.6 Demo Success Metrics

| Metrik | Target Demo | Cara Verifikasi |
|---|---:|---|
| Modul utama berfungsi | 3 (DSC, CPL, CORE) | Checklist smoke test |
| Sample student profiles | Minimal 12 | Hitung item `profiles` |
| Sample prediction markets | Minimal 8 | Hitung item `predictions` |
| Swipe interaction | Berfungsi | Demo langsung |
| Mutual matching | Berfungsi | Swipe kanan ke profil `willLikeBack: true` |
| Chat simulation | Berfungsi | Kirim pesan dan dapat balasan |
| Create prediction | Berfungsi | Buat prediksi, muncul di daftar |
| Vote prediction | Berfungsi | Vote, bar berubah, XP berkurang |
| Leaderboard | Dinamis | Urutan berubah setelah vote |
| Persistensi | Berfungsi | Refresh tidak menghilangkan data |
| Reset demo | Berfungsi | Reset mengembalikan kondisi awal |
| Responsive | Desktop dan mobile | Cek di DevTools mode mobile |

### 5.7 Skenario Demo Utama (Golden Path)

Alur ini menjadi kriteria "demo berhasil". Presenter menjalankannya tanpa menyimpang.

1. Aplikasi dibuka, saldo 1.000 XP tampil di header.
2. Presenter memfilter **Kemang + Dating**, lalu swipe kanan pada profil dengan `willLikeBack: true`.
3. Pop-up Mutual Match muncul. Presenter klik "Kirim Pesan".
4. Presenter mengirim satu pesan. Balasan otomatis muncul.
5. Presenter pindah ke **Campus Pulse**, memilih satu prediksi terbuka, dan klik "Ya".
6. Saldo XP berkurang 100. Bar persentase berubah.
7. Presenter membuat prediksi baru lewat modal. Prediksi muncul di atas daftar. Saldo bertambah 50 XP.
8. Presenter membuka **Leaderboard** dan menunjukkan posisi pengguna berubah.
9. Presenter refresh browser. Semua data tetap ada.
10. Presenter klik **Reset Demo Data** untuk menutup demo.

**Kriteria lulus:** Seluruh langkah selesai dalam 4 menit tanpa error.

---

## 6. Engineering Execution & Git Workflow Summary

### 6.1 Kepemilikan Folder dan File

Setiap anggota hanya mengedit file milik sendiri. Ini adalah kunci **zero merge conflict**.

| Branch | Lead | Folder / File yang Boleh Diedit | Tanggung Jawab |
|---|---|---|---|
| `roy-work` | Roy | `src/components/discover/*` | Discover card, filter, Mutual Match Modal, Chat Simulation |
| `surya-work` | Surya | `src/components/pulse/*` | Prediction list, VoteCard, Create modal, Leaderboard |
| `fachri-work` | Fachri | `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/data/*`, `src/lib/*`, `src/components/layout/*`, `README.md`, `PRD.md`, file pitch deck | Core, navbar, header XP, data seed, storage, pitch deck |

**Aturan:**
1. File di luar folder milik sendiri hanya diubah setelah persetujuan pemilik.
2. Jika butuh perubahan di `mockData.js`, minta kepada Fachri.
3. Komponen tidak memanggil `localStorage` langsung.

### 6.2 Alur Git Singkat

| Langkah | Perintah Inti | Siapa |
|---|---|---|
| Inisialisasi | `git init`, commit awal, `git push -u origin main` | Fachri (sekali) |
| Buat branch | `git checkout -b <nama>-work` lalu push | Semua |
| Kerja harian | Commit hanya ke folder milik sendiri | Semua |
| Sinkronisasi | `git pull origin main` setiap ±45 menit | Semua |
| Merge final | Urutan: `fachri-work` → `roy-work` → `surya-work` ke `main` | Semua, sesuai jadwal |

Format commit: `feat(discover):`, `feat(pulse):`, `feat(core):`, `fix(...)`, `style(...)`, `docs(pitch):`.

### 6.3 Jadwal Hackathon 5 Jam (Relatif)

Jadwal memakai waktu relatif terhadap **T** (mulai hackathon) dan **P** (waktu presentasi). Ini menghindari perbedaan jam antar tim.

| Waktu | Kegiatan | Penanggung Jawab |
|---|---|---|
| T+0:00 – T+0:30 | Kickoff, setujui PRD ini, setup repo, buat 3 branch, bagikan `mockData.js` awal | Semua (Fachri memimpin) |
| T+0:30 – T+1:30 | Build paralel. Roy: Swipe & Filter. Surya: List & VoteCard. Fachri: App, Navbar, Header, storage | Masing-masing |
| T+1:30 | Sync pertama: `git pull origin main` di setiap branch | Semua |
| T+1:30 – T+3:00 | Lanjut fitur. Roy: Match & Chat. Surya: Create & Leaderboard. Fachri: Pitch deck (draf) | Masing-masing |
| T+3:00 | Sync kedua dan `npm run build` di setiap branch | Semua |
| T+3:30 | **Code Freeze Fitur.** Hanya perbaikan bug kecil yang boleh | Semua |
| T+3:30 – T+4:00 | Merge bertahap ke `main`: `fachri-work`, lalu `roy-work`, lalu `surya-work` | Masing-masing sesuai urutan |
| T+4:00 – T+4:20 | **Smoke Test** di `main` mengikuti Golden Path (Bagian 5.7) | Semua |
| T+4:20 – T+4:40 | Perbaikan bug di branch pemilik, lalu merge ulang branch tersebut | Pemilik modul |
| T+4:40 | **Final Freeze.** Tidak ada perubahan kode | Semua |
| T+4:40 – T+5:00 | Persiapan presentasi: laptop terhubung charger, browser bersih, zoom 100%, pitch deck siap | Semua |
| P-10 menit | Refresh data demo ke kondisi awal (Reset) dan buka tab Discover | Fachri |

### 6.4 Aturan Smoke Test

- Smoke test dilakukan oleh satu orang sambil dua orang lain mengamati.
- Setiap bug dicatat dengan format: `[MODUL] Langkah | Hasil yang diharapkan | Hasil aktual`.
- Bug yang tidak selesai dalam 15 menit dipindahkan ke "Known Issue" dan demo dijalankan tanpa jalur tersebut.

### 6.5 Strategi Mitigasi Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Waktu 5 jam ternyata kurang | Fitur Could-Have tidak selesai | Setiap modul punya Must-Have yang diprioritaskan terlebih dahulu. Should dan Could dikerjakan hanya setelah Must selesai. |
| Merge conflict di `App.jsx` | Integrasi terhambat | Kepemilikan file ketat. Props kontrak dibekukan sejak T+0:30. |
| Data `localStorage` rusak saat demo | Demo error | Fitur Reset dan `loadUser()` yang tahan error. Siapkan tombol Reset di Header. |
| Mutual match jarang terjadi | Pop-up tidak muncul saat demo | Seed memiliki minimal 6 profil `willLikeBack: true`. Presenter tahu profil mana yang dipakai. |
| Koneksi internet bermasalah | Font atau dependensi gagal dimuat | Tidak ada API eksternal. Gunakan font sistem. |
| Pitch deck belum jadi | Presentasi kurang kuat | Pitch deck dikerjakan Fachri mulai T+1:30 secara paralel, dengan struktur tetap. |

---

## 7. Out of Scope & Future Roadmap

Hal berikut **tidak** dikerjakan pada versi hackathon ini:

| Fitur | Alasan | Target Fase Berikutnya |
|---|---|---|
| University SSO verification | Membutuhkan integrasi kampus | Fase 2 |
| Login dan registrasi | Demo cukup dengan sesi default | Fase 2 |
| Backend dan database | Demo berjalan frontend-only | Fase 2 |
| Real-time chat | Membutuhkan WebSocket | Fase 2 |
| Push notification | Membutuhkan layanan eksternal | Fase 2 |
| Smart recommendation dan AI profile | Tidak masuk MVP | Fase 3 |
| Moderasi dan admin review penuh | Tidak masuk MVP | Fase 2 |
| Halaman Profile edit | Tidak masuk MVP | Fase 2 |
| Integrasi organisasi dan event kampus | Membutuhkan kemitraan | Fase 3 |
| Aplikasi mobile native | Web responsif sudah cukup untuk demo | Fase 3 |
| Analytics lanjutan | Tidak masuk MVP | Fase 3 |

> Fitur di luar daftar ini tidak boleh ditambahkan ke dalam kode hackathon tanpa persetujuan seluruh tim.

---

## 8. Glosarium

| Istilah | Arti |
|---|---|
| Virtual Campus XP | Poin reputasi virtual tanpa nilai uang, dipakai untuk voting dan leaderboard. |
| Prediction Market | Mekanisme prediksi kolektif. Setiap sisi menampung XP dari pemilihnya. |
| Mutual Match | Kondisi ketika dua pengguna saling menyukai. Pada demo, dikontrol oleh `willLikeBack`. |
| Seed Data | Data awal simulasi yang dimuat dari `mockData.js`. |
| Code Freeze | Titik ketika tidak ada fitur baru yang boleh ditambahkan. |
| Smoke Test | Pengujian cepat untuk memastikan alur utama berjalan. |
| Golden Path | Alur demo utama yang menjadi standar keberhasilan. |

---

*Dokumen ini disimpan sebagai `PRD.md` di root repository. Perubahan pada dokumen ini harus disetujui seluruh anggota tim dan dicatat pada tabel Document Control.*

// src/data/mockData.js
// Owner: Fachri (`fachri-work`) — Core Architecture, Data & Pitch Lead
// Sumber kontrak: PRD Bagian 4.1–4.4, 3.3 (DSC-07 autoReplies), 3.5 (CORE-06 Data Seed)
//
// ATURAN: file ini satu-satunya sumber data simulasi (CORE-06).
// Anggota lain tidak mengedit file ini; perubahan field/props lewat kesepakatan tim (PRD 4.7).

/* ------------------------------------------------------------------ */
/* 1. Enum global (PRD 4.2)                                            */
/* ------------------------------------------------------------------ */

export const ENUMS = {
  campus: ['Kemang', 'Sudirman'],
  goal: ['study_buddy', 'project_partner', 'hangout', 'dating'],
  marketCategory: ['sports', 'akademik', 'event', 'kantin', 'komunitas'],
  marketStatus: ['open', 'closed', 'resolved'],
  side: ['yes', 'no'],
};

/** Label tampilan (huruf besar di awal) untuk enum goal. */
export const GOAL_LABEL = {
  study_buddy: 'Study Buddy',
  project_partner: 'Project Partner',
  hangout: 'Hangout',
  dating: 'Dating',
};

/** Label tampilan untuk enum marketCategory. */
export const CATEGORY_LABEL = {
  sports: 'Sports',
  akademik: 'Akademik',
  event: 'Event',
  kantin: 'Kantin',
  komunitas: 'Komunitas',
};

/* ------------------------------------------------------------------ */
/* 2. Util timestamp                                                   */
/* ------------------------------------------------------------------ */

/**
 * Timestamp ISO 8601 dengan offset Asia/Jakarta (+07:00), sesuai contoh PRD 4.1.
 * Dipakai agar seed prediksi "open" selalu punya `closesAt` di masa depan
 * kapan pun demo dijalankan (PRD 4.4 aturan seed).
 */
export function isoJakarta(date = new Date()) {
  const shifted = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  return shifted.toISOString().replace('Z', '+07:00');
}

/** ISO 8601 untuk `hours` jam dari sekarang. */
export function inHours(hours) {
  return isoJakarta(new Date(Date.now() + hours * 60 * 60 * 1000));
}

/* ------------------------------------------------------------------ */
/* 3. UserProfile seed — 12 profil (PRD 4.3)                           */
/*    Kemang: 6 · Sudirman: 6 · willLikeBack true: 9                   */
/*    Goal terdistribusi: study_buddy 6, project_partner 6,            */
/*    hangout 7, dating 5 · 4 prodi berbeda                            */
/* ------------------------------------------------------------------ */

export const SEED_PROFILES = [
  {
    id: 'u01',
    name: 'Raka Pratama',
    campus: 'Kemang',
    prodi: 'Data Science',
    angkatan: 2025,
    avatar: '🧑🏻‍💻',
    bio: 'Suka ngoding sambil dengerin lofi. Cari teman ngerjain tugas statistik.',
    interests: ['Coding', 'Futsal', 'Kopi'],
    goals: ['study_buddy', 'project_partner'],
    willLikeBack: true,
  },
  {
    id: 'u02',
    name: 'Nadia Salsabila',
    campus: 'Kemang',
    prodi: 'DKV',
    angkatan: 2024,
    avatar: '🎨',
    bio: 'Animator amatiran. Bisa bantu bikin mock-up kalau kamu bawa kopi.',
    interests: ['Desain', 'Ilustrasi', 'Film', 'Kopi'],
    goals: ['project_partner', 'hangout'],
    willLikeBack: true,
  },
  {
    id: 'u03',
    name: 'Bagas Nugraha',
    campus: 'Kemang',
    prodi: 'Informatika',
    angkatan: 2023,
    avatar: '⌨️',
    bio: 'Anak backend yang baru belajar frontend. Butuh teman diskusi algoritma.',
    interests: ['Coding', 'Basket', 'Musik'],
    goals: ['study_buddy', 'hangout'],
    willLikeBack: false,
  },
  {
    id: 'u04',
    name: 'Kirana Ayu',
    campus: 'Kemang',
    prodi: 'Manajemen',
    angkatan: 2025,
    avatar: '📊',
    bio: 'Suka ngobrol soal bisnis dan kopi. Jangan ajak aku ngerjain statistika ya.',
    interests: ['Bisnis', 'Kopi', 'Traveling'],
    goals: ['dating', 'hangout'],
    willLikeBack: true,
  },
  {
    id: 'u05',
    name: 'Dimas Aryo',
    campus: 'Kemang',
    prodi: 'Data Science',
    angkatan: 2026,
    avatar: '📈',
    bio: 'Maba yang takut kalkulus. Cari kakak tingkat buat belajar bareng.',
    interests: ['Statistik', 'Coding', 'Badminton'],
    goals: ['study_buddy'],
    willLikeBack: true,
  },
  {
    id: 'u06',
    name: 'Alya Ramadhani',
    campus: 'Kemang',
    prodi: 'DKV',
    angkatan: 2026,
    avatar: '📷',
    bio: 'Fotografer acara kampus. Biasanya nongkrong di kantin samping perpustakaan.',
    interests: ['Fotografi', 'Film', 'Nongkrong', 'Kopi'],
    goals: ['dating', 'hangout', 'project_partner'],
    willLikeBack: true,
  },
  {
    id: 'u07',
    name: 'Fajar Hidayat',
    campus: 'Sudirman',
    prodi: 'Informatika',
    angkatan: 2024,
    avatar: '🕹️',
    bio: 'Kapten tim e-sport kampus. Cari partner bikin game kecil buat lomba.',
    interests: ['Game', 'Coding', 'E-sport'],
    goals: ['project_partner', 'hangout'],
    willLikeBack: true,
  },
  {
    id: 'u08',
    name: 'Intan Permata',
    campus: 'Sudirman',
    prodi: 'Manajemen',
    angkatan: 2025,
    avatar: '☕',
    bio: 'Pencari kantin termurah di Sudirman. Suka diskusi presentasi bareng.',
    interests: ['Kuliner', 'Kopi', 'Musik'],
    goals: ['study_buddy', 'dating'],
    willLikeBack: false,
  },
  {
    id: 'u09',
    name: 'Yusuf Maulana',
    campus: 'Sudirman',
    prodi: 'Data Science',
    angkatan: 2023,
    avatar: '🧮',
    bio: 'Asisten laboratorium statistik. Lari pagi tiap Sabtu, ayo ikut.',
    interests: ['Statistik', 'Data', 'Lari'],
    goals: ['study_buddy', 'project_partner'],
    willLikeBack: true,
  },
  {
    id: 'u10',
    name: 'Tara Anindya',
    campus: 'Sudirman',
    prodi: 'DKV',
    angkatan: 2025,
    avatar: '🎬',
    bio: 'Sibuk bikin film pendek untuk festival. Butuh editor dan teman bedah ide.',
    interests: ['Film', 'Desain', 'Kopi'],
    goals: ['project_partner', 'dating'],
    willLikeBack: true,
  },
  {
    id: 'u11',
    name: 'Gilang Ramadhan',
    campus: 'Sudirman',
    prodi: 'Informatika',
    angkatan: 2026,
    avatar: '🏀',
    bio: 'Maba yang hobinya basket. Kalau ada tugas kelompok, aku yang bikin slide.',
    interests: ['Basket', 'Coding', 'Futsal'],
    goals: ['study_buddy', 'hangout'],
    willLikeBack: false,
  },
  {
    id: 'u12',
    name: 'Melati Kusuma',
    campus: 'Sudirman',
    prodi: 'Manajemen',
    angkatan: 2024,
    avatar: '🌿',
    bio: 'Pengurus BEM yang senang kenalan lintas kampus. Ajak aku ke acara kamu ya.',
    interests: ['Organisasi', 'Kuliner', 'Traveling'],
    goals: ['hangout', 'dating'],
    willLikeBack: true,
  },
];

/* ------------------------------------------------------------------ */
/* 4. XP leaderboard seed                                              */
/*    UserProfile (PRD 4.3) tidak punya field `xp`, jadi nilai XP      */
/*    lawan disimpan terpisah di sini. App.jsx menggabungkannya        */
/*    menjadi users: Array<{ id, name, xp }> untuk Leaderboard 4.7.    */
/* ------------------------------------------------------------------ */

export const SEED_LEADERBOARD_XP = {
  u01: 1850,
  u02: 1620,
  u03: 2140,
  u04: 980,
  u05: 740,
  u06: 1310,
  u07: 2320,
  u08: 1050,
  u09: 1980,
  u10: 1440,
  u11: 860,
  u12: 1690,
};

/* ------------------------------------------------------------------ */
/* 5. PredictionMarket seed — 8 prediksi (PRD 4.4)                     */
/*    Kemang: 4 · Sudirman: 2 · Both: 2                                */
/*    5 kategori · 1 `closed` · pm05 sengaja pool 0:0 (kasus 50/50)    */
/* ------------------------------------------------------------------ */

export const SEED_PREDICTIONS = [
  {
    id: 'pm01',
    question: 'Futsal Cakrawala Arena: Kemang menang lawan Sudirman?',
    category: 'sports',
    campus: 'Both',
    createdBy: 'u03',
    status: 'open',
    closesAt: inHours(3),
    pool: { yes: 1200, no: 800 },
    votes: [
      { userId: 'u05', side: 'yes', amount: 100 },
      { userId: 'u11', side: 'no', amount: 100 },
      { userId: 'u02', side: 'yes', amount: 100 },
    ],
  },
  {
    id: 'pm02',
    question: 'Tim Data Science juara hackathon Cakrawala Expo?',
    category: 'akademik',
    campus: 'Kemang',
    createdBy: 'u01',
    status: 'open',
    closesAt: inHours(5),
    pool: { yes: 900, no: 1100 },
    votes: [
      { userId: 'u03', side: 'yes', amount: 100 },
      { userId: 'u06', side: 'no', amount: 100 },
      { userId: 'u09', side: 'no', amount: 100 },
    ],
  },
  {
    id: 'pm03',
    question: 'Kantin Sudirman buka menu baru sebelum UAS?',
    category: 'kantin',
    campus: 'Sudirman',
    createdBy: 'u08',
    status: 'open',
    closesAt: inHours(8),
    pool: { yes: 600, no: 400 },
    votes: [
      { userId: 'u10', side: 'yes', amount: 100 },
      { userId: 'u12', side: 'no', amount: 100 },
    ],
  },
  {
    id: 'pm04',
    question: 'Kelas Statistika Kemang pindah ke ruang lantai lima?',
    category: 'akademik',
    campus: 'Kemang',
    createdBy: 'u05',
    status: 'open',
    closesAt: inHours(6),
    pool: { yes: 300, no: 700 },
    votes: [
      { userId: 'u01', side: 'no', amount: 100 },
      { userId: 'u06', side: 'no', amount: 100 },
      { userId: 'u04', side: 'yes', amount: 100 },
    ],
  },
  {
    id: 'pm05',
    question: 'Kemang Music Fest tahun ini dihadiri lebih dari 500 mahasiswa?',
    category: 'event',
    campus: 'Kemang',
    createdBy: 'u02',
    status: 'open',
    // Kasus khusus PRD 4.4: pool 0:0 untuk menguji tampilan 50 / 50.
    closesAt: inHours(12),
    pool: { yes: 0, no: 0 },
    votes: [],
  },
  {
    id: 'pm06',
    question: 'UKM Basket Sudirman buka rekrutmen anggota minggu depan?',
    category: 'komunitas',
    campus: 'Sudirman',
    createdBy: 'u11',
    status: 'open',
    closesAt: inHours(9),
    pool: { yes: 450, no: 150 },
    votes: [
      { userId: 'u07', side: 'yes', amount: 100 },
      { userId: 'u12', side: 'yes', amount: 100 },
    ],
  },
  {
    id: 'pm07',
    question: 'Turnamen e-sport antar kampus digelar Jumat ini?',
    category: 'komunitas',
    campus: 'Both',
    createdBy: 'u07',
    status: 'closed',
    closesAt: inHours(-6),
    pool: { yes: 1500, no: 900 },
    votes: [
      { userId: 'u10', side: 'yes', amount: 100 },
      { userId: 'u03', side: 'no', amount: 100 },
      { userId: 'u09', side: 'yes', amount: 100 },
    ],
  },
  {
    id: 'pm08',
    question: 'Kantin Kemang pindah lokasi ke dekat perpustakaan?',
    category: 'kantin',
    campus: 'Kemang',
    createdBy: 'u06',
    status: 'open',
    closesAt: inHours(10),
    pool: { yes: 250, no: 350 },
    votes: [
      { userId: 'u02', side: 'no', amount: 100 },
      { userId: 'u05', side: 'yes', amount: 100 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 6. autoReplies — balasan simulasi chat (PRD 3.3 DSC-07)             */
/*    DiscoverPage (Roy) memilih satu balasan acak setelah jeda 1–2s.  */
/* ------------------------------------------------------------------ */

export const autoReplies = [
  'Hai! Salam kenal ya 😄',
  'Wah kebetulan, aku juga lagi cari teman buat ini.',
  'Boleh banget! Kapan kamu biasanya kosong?',
  'Aku biasanya di kampus siang sampai sore.',
  'Setuju, kita mulai minggu ini aja ya.',
  'Hahaha iya, aku juga ngerasain hal yang sama.',
  'Nanti aku kirim jadwalku ya, biar gampang ketemu.',
  'Oke, kalau gitu kita ketemu di kantin kampus ya.',
  'Eh serius? Itu prodi aku juga lho.',
  'Sip, aku catat ya. Sampai ketemu!',
];

/* ------------------------------------------------------------------ */
/* 7. Aturan bisnis bersama (PRD 3.4) — satu sumber angka untuk tim    */
/* ------------------------------------------------------------------ */

export const RULES = {
  initialXp: 1000, // CORE-02: saldo awal pengguna
  stakeXp: 100, // stake tetap per vote
  createBonusXp: 50, // bonus pembuat prediksi
  maxCreatedMarkets: 3, // batas pembuatan per sesi demo
  sides: ['yes', 'no'],
  marketsPerCampusMin: 2,
};

/**
 * Persentase sisi "Ya" sesuai rumus PRD 3.4:
 * `round(pool.yes / (pool.yes + pool.no) × 100)`; jika total 0 → 50 (kasus 50/50).
 */
export function yesPercent(pool) {
  const yes = Number(pool?.yes) || 0;
  const no = Number(pool?.no) || 0;
  const total = yes + no;
  if (total <= 0) return 50;
  return Math.round((yes / total) * 100);
}

/* ------------------------------------------------------------------ */
/* 8. Ringkasan untuk verifikasi cepat (dipakai saat pitch/smoke test) */
/* ------------------------------------------------------------------ */

export const SEED_SUMMARY = {
  profiles: SEED_PROFILES.length,
  predictions: SEED_PREDICTIONS.length,
  kemang: SEED_PROFILES.filter((p) => p.campus === 'Kemang').length,
  sudirman: SEED_PROFILES.filter((p) => p.campus === 'Sudirman').length,
  willLikeBack: SEED_PROFILES.filter((p) => p.willLikeBack).length,
  autoReplies: autoReplies.length,
};

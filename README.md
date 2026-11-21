# SocialHub — Campus Social & Prediction Platform

> **Meet People. Share Moments. Predict Campus Life.**
> Prototipe hackathon Cakrawala University · target kampus **Kemang** & **Sudirman**

Aplikasi web (Vite + React 18, tanpa backend). Seluruh data simulasi berada di `src/data/mockData.js`
dan disimpan di `localStorage` browser. **Tidak ada API eksternal.** Virtual Campus XP adalah poin
reputasi virtual, bukan uang dan tidak bisa dibeli atau diuangkan.

## Menjalankan

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run build      # cek wajib sebelum presentasi (PRD 5.3)
npm run preview    # uji hasil build
```

## Struktur & Kepemilikan File (PRD 6.1)

| Branch | Folder / File | Status di repo |
|---|---|---|
| `fachri-work` | `src/App.jsx`, `src/main.jsx`, `src/index.css`, `src/data/*`, `src/lib/*`, `src/components/layout/*`, `index.html`, `vite.config.js`, `package.json`, `README.md`, `PRD.md` | Sudah ada |
| `roy-work` | `src/components/discover/*` | Belum ada (placeholder otomatis) |
| `surya-work` | `src/components/pulse/*` | Belum ada (placeholder otomatis) |

## Integrasi Komponen Tim (penting)

`App.jsx` memuat `DiscoverPage`, `PulsePage`, dan `Leaderboard` lewat `src/components/layout/PartLoader.jsx`
(`import.meta.glob`). Artinya:

- `npm run dev` / `npm run build` **tidak pernah error** walau folder tim masih kosong; yang tampil
  adalah panel placeholder berisi daftar props sesuai PRD 4.7.
- Begitu file Roy/Surya masuk ke `src/components/discover/` atau `src/components/pulse/`, komponen
  langsung terpakai **tanpa mengedit `App.jsx`** (menghindari merge conflict di file Fachri).
- Nama file & export yang dikenali: `DiscoverPage.jsx`, `PulsePage.jsx`, `Leaderboard.jsx`,
  atau `index.jsx` di dalam folder tersebut — boleh `export default` atau `export function Nama`.

### Kontrak props yang sudah dikirim `App.jsx`

| Komponen | Props |
|---|---|
| `DiscoverPage` | `profiles` (12 seed), `currentUser`, `onMatch(profile)`, `onSendMessage(userId, text [, from])` |
| `PulsePage` | `predictions`, `currentUser`, `onVote(marketId, side) => boolean`, `onCreatePrediction(payload) => market \| null`, `profiles` |
| `Leaderboard` | `users` (Array<{id,name,xp}>, sudah urut xp desc + nama A–Z), `currentUserId` |

Bantuan bersama dari `src/data/mockData.js`: `ENUMS`, `RULES` (stake 100 XP, bonus 50 XP, maks 3 prediksi),
`GOAL_LABEL`, `CATEGORY_LABEL`, `yesPercent(pool)` (rumus 50/50 otomatis), `autoReplies`, `SEED_PROFILES`,
`SEED_PREDICTIONS`, `SEED_LEADERBOARD_XP`.

## Kelas CSS bersama

`src/index.css` (milik Fachri) sudah menyediakan kelas siap pakai supaya modul Discover/Pulse tidak perlu
CSS baru: `.btn`, `.btn-like`, `.btn-pass`, `.chip`, `.badge`, `.panel`, `.modal*`, `.profile-card`,
`.interest-tag.is-shared`, `.bubble-me/.bubble-them`, `.match-modal`, `.vote-card`, `.progress-yes/.progress-no`,
`.status-closed`, `.leaderboard-row.is-me`, `.empty-state`, `.toast` — daftar lengkap ada di komentar atas file.

## Data seed

- 12 `UserProfile` (6 Kemang, 6 Sudirman, 9 `willLikeBack: true`, 4 prodi, semua goal ≥3 profil).
- 8 `PredictionMarket` (4 Kemang, 2 Sudirman, 2 Both, 5 kategori, 1 `closed`, `pm05` pool 0:0 untuk kasus 50/50).
- `autoReplies`: 10 balasan simulasi chat.
- `closesAt` prediksi `open` dihitung relatif terhadap waktu buka halaman, sehingga selalu di masa depan saat demo.

## Kunci localStorage

`socialhub:v1:user` · `socialhub:v1:predictions` · `socialhub:v1:meta`
Hanya `src/lib/storage.js` yang menyentuh `localStorage`; data rusak otomatis jatuh ke seed tanpa crash.

// src/App.jsx
// Owner: Fachri (`fachri-work`) — Core Architecture
// Sumber kontrak: PRD 4.5 (CurrentUser), 4.7 (kontrak props + aksi App.jsx),
// 3.4 (aturan bisnis Campus Pulse), 3.5 (CORE-01..CORE-05).
//
// App.jsx = satu-satunya tempat state global. Semua perubahan disimpan ke
// localStorage lewat `src/lib/storage.js`. Komponen anak tidak menyentuh
// localStorage (PRD 4.7 aturan 3).
//
// Catatan integrasi tim: `DiscoverPage` (Roy) dan `PulsePage` (Surya) dimuat
// lewat `PartLoader` sehingga build tidak error walau file mereka belum ada.

import { useCallback, useMemo, useState } from 'react';

import Header from './components/layout/Header.jsx';
import Navbar from './components/layout/Navbar.jsx';
import { PartPlaceholder, useTeamComponent } from './components/layout/PartLoader.jsx';

import { ENUMS, RULES, SEED_LEADERBOARD_XP, SEED_PROFILES } from './data/mockData.js';
import {
  MAX_CREATED_MARKETS,
  loadPredictions,
  loadUser,
  resetDemo,
  savePredictions,
  saveUser,
  seedPredictions,
} from './lib/storage.js';

// Array konstan di level modul agar identitasnya stabil antar render.
const DISCOVER_EXPORTS = ['DiscoverPage', 'Discover'];
const DISCOVER_HINTS = ['discover', 'page'];
const PULSE_EXPORTS = ['PulsePage', 'Pulse', 'PulseTab', 'CampusPulse'];
const PULSE_HINTS = ['pulse', 'page'];
const LEADERBOARD_EXPORTS = ['Leaderboard', 'LeaderboardTab', 'PulseLeaderboard'];
const LEADERBOARD_HINTS = ['leaderboard'];

const CAMPUS_OPTIONS = ['Kemang', 'Sudirman', 'Both'];

/* ------------------------------------------------------------------ */
/* Util kecil                                                          */
/* ------------------------------------------------------------------ */

const nowIso = () => new Date().toISOString();

const trimText = (v) => (typeof v === 'string' ? v.trim() : '');

/** Jumlah peserta unik pada sebuah prediksi (untuk label "peserta"). */
function participantCount(market) {
  const ids = new Set((market?.votes || []).map((v) => v?.userId).filter(Boolean));
  return ids.size;
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  // Muat state awal dari storage (seed otomatis bila kosong/rusak) — CORE-03.
  const [user, setUser] = useState(() => loadUser());
  const [predictions, setPredictions] = useState(() => loadPredictions());
  const [activeTab, setActiveTab] = useState('discover'); // CORE-01: landing = Discover
  const [toast, setToast] = useState(null);

  const pushToast = useCallback((message, tone = 'info') => {
    setToast({ message, tone, id: Date.now() });
    window.setTimeout(() => setToast((cur) => (cur?.message === message ? null : cur)), 2600);
  }, []);

  /* -------------------------- Aksi: Match -------------------------- */
  // PRD 4.7: handleMatch(profile) → tambah profile.id ke user.matches, simpan.
  const handleMatch = useCallback((profile) => {
    if (!profile?.id) return false;
    setUser((prev) => {
      if (prev.matches.includes(profile.id)) return prev; // tidak dobel
      const next = { ...prev, matches: [...prev.matches, profile.id] };
      saveUser(next);
      return next;
    });
    return true;
  }, []);

  /* -------------------------- Aksi: Vote --------------------------- */
  // PRD 4.7: handleVote(marketId, side) → true jika berhasil.
  const handleVote = useCallback(
    (marketId, side) => {
      if (side !== 'yes' && side !== 'no') return false;
      const market = predictions.find((m) => m.id === marketId);
      if (!market) return false;
      if (market.status !== 'open') {
        pushToast('Voting untuk prediksi ini sudah ditutup.', 'warn');
        return false;
      }
      if (user.votes[marketId]) {
        pushToast('Kamu sudah vote di prediksi ini.', 'warn');
        return false;
      }
      if (user.xp < RULES.stakeXp) {
        pushToast('XP kamu tidak cukup', 'error');
        return false;
      }

      const nextPredictions = predictions.map((m) =>
        m.id !== marketId
          ? m
          : {
              ...m,
              pool: { ...m.pool, [side]: (m.pool?.[side] || 0) + RULES.stakeXp },
              votes: [...(m.votes || []), { userId: user.id, side, amount: RULES.stakeXp }],
            },
      );
      const nextUser = {
        ...user,
        xp: Math.max(0, user.xp - RULES.stakeXp),
        votes: { ...user.votes, [marketId]: side },
      };

      setUser(nextUser);
      setPredictions(nextPredictions);
      saveUser(nextUser);
      savePredictions(nextPredictions);
      return true;
    },
    [predictions, user, pushToast],
  );

  /* --------------------- Aksi: Create Prediction ------------------- */
  // PRD 4.7: handleCreatePrediction(payload) → objek prediksi | null.
  const handleCreatePrediction = useCallback(
    (payload) => {
      const question = trimText(payload?.question);
      const category = trimText(payload?.category);
      const campus = trimText(payload?.campus);
      const closesAt = payload?.closesAt;

      if (question.length < 10 || question.length > 120) {
        pushToast('Pertanyaan harus 10–120 karakter.', 'error');
        return null;
      }
      if (!ENUMS.marketCategory.includes(category)) {
        pushToast('Kategori tidak valid.', 'error');
        return null;
      }
      if (!CAMPUS_OPTIONS.includes(campus)) {
        pushToast('Kampus tidak valid.', 'error');
        return null;
      }
      if (typeof closesAt !== 'string' || closesAt === '' || Number.isNaN(Date.parse(closesAt))) {
        pushToast('Tanggal tutup tidak valid.', 'error');
        return null;
      }
      if (user.createdMarkets.length >= MAX_CREATED_MARKETS) {
        pushToast('Batas 3 prediksi per sesi demo sudah tercapai.', 'warn');
        return null;
      }

      const market = {
        id: `pm-${Date.now()}`,
        question,
        category,
        campus,
        createdBy: user.id,
        status: 'open',
        closesAt,
        pool: { yes: 0, no: 0 },
        votes: [],
      };

      const nextPredictions = [market, ...predictions]; // muncul di bagian atas daftar
      const claimBonus = !user.bonusClaimed.includes(market.id);
      const nextUser = {
        ...user,
        xp: user.xp + (claimBonus ? RULES.createBonusXp : 0),
        createdMarkets: [...user.createdMarkets, market.id].slice(0, MAX_CREATED_MARKETS),
        bonusClaimed: claimBonus ? [...user.bonusClaimed, market.id] : user.bonusClaimed,
      };

      setUser(nextUser);
      setPredictions(nextPredictions);
      saveUser(nextUser);
      savePredictions(nextPredictions);
      pushToast(`Prediksi dibuat. +${RULES.createBonusXp} XP bonus!`, 'success');
      return market;
    },
    [predictions, user, pushToast],
  );

  /* ---------------------- Aksi: Kirim pesan ------------------------ */
  // PRD 4.7: handleSendMessage(userId, text) → tambah pesan ke user.chats[userId].
  const handleSendMessage = useCallback(
    (userId, text, from = 'me') => {
      const clean = trimText(text);
      if (!userId || !clean) return false; // pesan kosong tidak dikirim (DSC-07)

      setUser((prev) => {
        const thread = prev.chats?.[userId] || [];
        const next = {
          ...prev,
          chats: {
            ...prev.chats,
            [userId]: [...thread, { from, text: clean, sentAt: nowIso() }],
          },
        };
        saveUser(next);
        return next;
      });
      return true;
    },
    [],
  );

  /* -------------------------- Aksi: Reset -------------------------- */
  // CORE-04: konfirmasi ditangani Header, di sini hanya reset + muat ulang state.
  const handleReset = useCallback(() => {
    const fresh = resetDemo();
    setUser(fresh.user);
    setPredictions(fresh.predictions);
    setActiveTab('discover'); // P-10 menit: buka tab Discover setelah reset
    pushToast('Demo data direset ke kondisi awal.', 'success');
  }, [pushToast]);

  /* --------------------- Data turunan: Leaderboard ----------------- */
  // Leaderboard menerima Array<{ id, name, xp }> (PRD 4.7).
  // Urutan: xp desc, lalu nama A–Z agar stabil saat XP seri (CPL-05).
  const leaderboardUsers = useMemo(() => {
    const others = SEED_PROFILES.map((p) => ({
      id: p.id,
      name: p.name,
      xp: SEED_LEADERBOARD_XP[p.id] ?? 500,
    }));
    const me = { id: user.id, name: user.name, xp: user.xp };
    return [...others, me].sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name, 'id'));
  }, [user.id, user.name, user.xp]);

  const stats = useMemo(
    () => ({
      open: predictions.filter((m) => m.status === 'open').length,
      totalVotes: predictions.reduce((sum, m) => sum + participantCount(m), 0),
    }),
    [predictions],
  );

  /* --------------- Komponen tim (Roy & Surya), dimuat aman --------- */
  const discoverPart = useTeamComponent('discover', DISCOVER_EXPORTS, DISCOVER_HINTS);
  const pulsePart = useTeamComponent('pulse', PULSE_EXPORTS, PULSE_HINTS);
  const leaderboardPart = useTeamComponent('pulse', LEADERBOARD_EXPORTS, LEADERBOARD_HINTS);

  const DiscoverComp = discoverPart.Comp;
  const PulseComp = pulsePart.Comp;
  const LeaderboardComp = leaderboardPart.Comp;

  return (
    <div className="app">
      <Header user={user} onReset={handleReset} />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="app-main">
        {activeTab === 'discover' &&
          (DiscoverComp ? (
            <DiscoverComp
              profiles={SEED_PROFILES}
              currentUser={user}
              onMatch={handleMatch}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <PartPlaceholder
              owner="roy-work"
              title="DiscoverPage belum tersedia"
              note="Modul Social Discovery akan muncul di sini begitu src/components/discover/ masuk. Kontrak props di bawah sudah sesuai PRD 4.7, jadi tidak perlu mengubah App.jsx."
              propsContract={[
                ['profiles', 'UserProfile[]'],
                ['currentUser', 'CurrentUser'],
                ['onMatch', '(profile) => void'],
                ['onSendMessage', '(userId, text) => void'],
              ]}
            />
          ))}

        {activeTab === 'pulse' &&
          (PulseComp ? (
            <PulseComp
              predictions={predictions}
              currentUser={user}
              onVote={handleVote}
              onCreatePrediction={handleCreatePrediction}
              profiles={SEED_PROFILES}
            />
          ) : (
            <PartPlaceholder
              owner="surya-work"
              title="PulsePage belum tersedia"
              note="Modul Campus Pulse akan muncul di sini begitu src/components/pulse/ masuk. Kontrak props di bawah sudah sesuai PRD 4.7."
              propsContract={[
                ['predictions', 'PredictionMarket[]'],
                ['currentUser', 'CurrentUser'],
                ['onVote', '(marketId, side) => boolean'],
                ['onCreatePrediction', '(payload) => PredictionMarket | null'],
                ['profiles', 'UserProfile[]'],
              ]}
            />
          ))}

        {activeTab === 'leaderboard' &&
          (LeaderboardComp ? (
            <LeaderboardComp users={leaderboardUsers} currentUserId={user.id} />
          ) : (
            <PartPlaceholder
              owner="surya-work"
              title="Leaderboard belum tersedia"
              note="Tab Leaderboard memakai komponen dari src/components/pulse/. Sampai file itu ada, App.jsx tetap menyiapkan datanya sesuai kontrak PRD 4.7."
              propsContract={[
                ['users', 'Array<{ id, name, xp }>'],
                ['currentUserId', 'string'],
              ]}
            />
          ))}
      </main>

      <footer className="app-footer">
        <span>
          {stats.open} prediksi terbuka · {stats.totalVotes} vote komunitas · data simulasi lokal
          (localStorage)
        </span>
        <span className="footer-note">
          Virtual Campus XP hanya poin reputasi virtual — bukan uang, tidak bisa dibeli atau diuangkan.
        </span>
      </footer>

      {toast && (
        <div className={`toast toast-${toast.tone}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}
    </div>
  );
}

/** Ekspor ulang untuk kenyamanan uji manual: seed segar tanpa menyentuh storage. */
export const _internal = { seedPredictions, participantCount, loadUser, loadPredictions };

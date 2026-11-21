// src/lib/storage.js
// Owner: Fachri (`fachri-work`) — Core System & Persistence
// Sumber kontrak: PRD 4.5 (CurrentUser), 4.6 (kunci localStorage), 4.7 (fungsi storage.js)
//
// ATURAN: hanya file ini yang boleh menyentuh `localStorage` (PRD 4.7 aturan 3).
// Semua fungsi tahan error: data rusak / tidak valid / localStorage diblokir
// tidak boleh membuat aplikasi crash (CORE-03, PRD 5.3).

import { SEED_PREDICTIONS, ENUMS } from '../data/mockData.js';

const PREFIX = 'socialhub:v1:';

/** Kunci localStorage versi 1 (PRD 4.6). */
export const STORAGE_KEYS = {
  user: `${PREFIX}user`,
  predictions: `${PREFIX}predictions`,
  meta: `${PREFIX}meta`,
};

export const STORAGE_PREFIX = PREFIX;
export const SCHEMA_VERSION = 1;
export const DEFAULT_XP = 1000;
export const MAX_CREATED_MARKETS = 3;

/* ------------------------------------------------------------------ */
/* Helper akses localStorage yang aman                                 */
/* ------------------------------------------------------------------ */

function getStore() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    // Probe tulis: Safari mode privat melempar error saat setItem.
    const probe = `${PREFIX}probe`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

function readJSON(key) {
  const store = getStore();
  if (!store) return null;
  try {
    const raw = store.getItem(key);
    if (raw === null || raw === undefined || raw === '') return null;
    const parsed = JSON.parse(raw);
    return parsed === null ? null : parsed;
  } catch {
    // JSON corrupt → buang nilai rusak supaya pemanggil memakai seed.
    try {
      store.removeItem(key);
    } catch {
      /* abaikan */
    }
    return null;
  }
}

function writeJSON(key, value) {
  const store = getStore();
  if (!store) return false;
  try {
    store.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Sanitasi CurrentUser (PRD 4.5)                                      */
/* ------------------------------------------------------------------ */

const isPlainObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const asInt = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
};
const asStringArray = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);

/** User awal: id "me", nama "Kamu", saldo 1.000 XP (CORE-01, CORE-02). */
export function createDefaultUser() {
  return {
    id: 'me',
    name: 'Kamu',
    xp: DEFAULT_XP,
    votes: {},
    matches: [],
    chats: {},
    createdMarkets: [],
    bonusClaimed: [],
  };
}

function sanitizeMessage(m) {
  if (!isPlainObject(m)) return null;
  const text = typeof m.text === 'string' ? m.text : '';
  if (!text) return null;
  const from = typeof m.from === 'string' && m.from ? m.from : 'me';
  const sentAt = typeof m.sentAt === 'string' ? m.sentAt : new Date().toISOString();
  return { from, text, sentAt };
}

function sanitizeChats(raw) {
  if (!isPlainObject(raw)) return {};
  const out = {};
  for (const [userId, list] of Object.entries(raw)) {
    if (typeof userId !== 'string' || !Array.isArray(list)) continue;
    const messages = list.map(sanitizeMessage).filter(Boolean);
    if (messages.length) out[userId] = messages;
  }
  return out;
}

function sanitizeVotes(raw) {
  if (!isPlainObject(raw)) return {};
  const out = {};
  for (const [marketId, side] of Object.entries(raw)) {
    if (typeof marketId !== 'string') continue;
    if (side !== 'yes' && side !== 'no') continue;
    out[marketId] = side;
  }
  return out;
}

/** Rapikan objek user dari storage; field hilang/rusak diganti nilai default. */
export function sanitizeUser(raw) {
  const fallback = createDefaultUser();
  if (!isPlainObject(raw)) return fallback;

  const xp = Math.max(0, asInt(raw.xp, DEFAULT_XP)); // CORE-02: tidak pernah negatif

  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : fallback.id,
    name: typeof raw.name === 'string' && raw.name ? raw.name : fallback.name,
    xp,
    votes: sanitizeVotes(raw.votes),
    matches: asStringArray(raw.matches),
    chats: sanitizeChats(raw.chats),
    createdMarkets: asStringArray(raw.createdMarkets).slice(0, MAX_CREATED_MARKETS),
    bonusClaimed: asStringArray(raw.bonusClaimed),
  };
}

/* ------------------------------------------------------------------ */
/* Sanitasi PredictionMarket (PRD 4.4)                                 */
/* ------------------------------------------------------------------ */

function sanitizeMarket(raw) {
  if (!isPlainObject(raw)) return null;
  if (typeof raw.id !== 'string' || !raw.id) return null;
  if (typeof raw.question !== 'string' || !raw.question) return null;
  if (!ENUMS.marketCategory.includes(raw.category)) return null;

  const campus = ['Kemang', 'Sudirman', 'Both'].includes(raw.campus) ? raw.campus : 'Both';
  const status = ENUMS.marketStatus.includes(raw.status) ? raw.status : 'open';
  const pool = isPlainObject(raw.pool) ? raw.pool : {};

  const votes = Array.isArray(raw.votes)
    ? raw.votes
        .filter((v) => isPlainObject(v) && typeof v.userId === 'string' && (v.side === 'yes' || v.side === 'no'))
        .map((v) => ({ userId: v.userId, side: v.side, amount: asInt(v.amount, 100) }))
    : [];

  return {
    id: raw.id,
    question: raw.question,
    category: raw.category,
    campus,
    createdBy: typeof raw.createdBy === 'string' && raw.createdBy ? raw.createdBy : 'me',
    status,
    closesAt: typeof raw.closesAt === 'string' && raw.closesAt ? raw.closesAt : new Date().toISOString(),
    pool: { yes: Math.max(0, asInt(pool.yes, 0)), no: Math.max(0, asInt(pool.no, 0)) },
    votes,
    ...(status === 'resolved' && (raw.outcome === 'yes' || raw.outcome === 'no')
      ? { outcome: raw.outcome }
      : {}),
  };
}

/** Salinan seed prediksi yang selalu bersih (tidak berbagi referensi objek). */
export function seedPredictions() {
  return SEED_PREDICTIONS.map((m) => JSON.parse(JSON.stringify(m)));
}

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

function writeMeta() {
  writeJSON(STORAGE_KEYS.meta, {
    seededAt: new Date().toISOString(),
    version: SCHEMA_VERSION,
  });
}

export function loadMeta() {
  const raw = readJSON(STORAGE_KEYS.meta);
  if (!isPlainObject(raw)) return { seededAt: null, version: SCHEMA_VERSION };
  return { seededAt: raw.seededAt ?? null, version: asInt(raw.version, SCHEMA_VERSION) };
}

/* ------------------------------------------------------------------ */
/* API utama (PRD 4.7)                                                 */
/* ------------------------------------------------------------------ */

/** Baca CurrentUser. Jika kosong/rusak, tulis dan kembalikan seed default. */
export function loadUser() {
  const raw = readJSON(STORAGE_KEYS.user);
  if (raw === null) {
    const fresh = createDefaultUser();
    saveUser(fresh);
    writeMeta();
    return fresh;
  }
  const user = sanitizeUser(raw);
  saveUser(user); // simpan versi yang sudah dirapikan
  return user;
}

/** Simpan CurrentUser. */
export function saveUser(user) {
  writeJSON(STORAGE_KEYS.user, sanitizeUser(user));
}

/** Baca daftar prediksi. Jika kosong/rusak, kembalikan 8 seed. */
export function loadPredictions() {
  const raw = readJSON(STORAGE_KEYS.predictions);
  if (!Array.isArray(raw) || raw.length === 0) {
    const fresh = seedPredictions();
    savePredictions(fresh);
    writeMeta();
    return fresh;
  }
  const list = raw.map(sanitizeMarket).filter(Boolean);
  if (list.length === 0) {
    const fresh = seedPredictions();
    savePredictions(fresh);
    writeMeta();
    return fresh;
  }
  return list;
}

/** Simpan daftar prediksi. */
export function savePredictions(list) {
  const clean = Array.isArray(list) ? list.map(sanitizeMarket).filter(Boolean) : [];
  writeJSON(STORAGE_KEYS.predictions, clean);
}

/**
 * Hapus kedua kunci (plus meta), lalu tulis ulang seed awal (CORE-04).
 * Mengembalikan state awal supaya App.jsx bisa langsung memakainya.
 */
export function resetDemo() {
  const store = getStore();
  if (store) {
    try {
      Object.values(STORAGE_KEYS).forEach((k) => store.removeItem(k));
    } catch {
      /* abaikan */
    }
  }
  const user = createDefaultUser();
  const predictions = seedPredictions();
  writeJSON(STORAGE_KEYS.user, user);
  writeJSON(STORAGE_KEYS.predictions, predictions);
  writeMeta();
  return { user, predictions };
}

/** Hapus seluruh kunci ber-prefix socialhub:v1: (escape hatch saat skema berubah). */
export function clearAll() {
  const store = getStore();
  if (!store) return;
  try {
    const doomed = [];
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (key && key.startsWith(PREFIX)) doomed.push(key);
    }
    doomed.forEach((k) => store.removeItem(k));
  } catch {
    /* abaikan */
  }
}

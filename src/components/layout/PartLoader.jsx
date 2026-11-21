// src/components/layout/PartLoader.jsx
// Owner: Fachri (`fachri-work`)
// Tujuan: memuat komponen milik Roy (`src/components/discover/`) dan Surya
// (`src/components/pulse/`) secara aman SEBELUM file mereka ada.
//
// Cara kerja: `import.meta.glob` mengembalikan objek kosong bila foldernya masih
// kosong, jadi `npm run dev` dan `npm run build` tidak pernah error karena
// komponen tim belum di-merge. Setelah file mereka masuk, komponen langsung
// terpakai tanpa perlu mengedit App.jsx lagi (pendekatan ini menghindari
// merge conflict di file milik Fachri, sesuai PRD 6.1).
//
// Menerima export bernama (mis. `export function DiscoverPage`) maupun
// `export default`, di file `*.jsx`/`*.js` satu tingkat di bawah folder tersebut.

import { useEffect, useState } from 'react';

const discoverModules = import.meta.glob('../discover/**/*.{jsx,js}');
const pulseModules = import.meta.glob('../pulse/**/*.{jsx,js}');

export const MODULE_MAP = {
  discover: discoverModules,
  pulse: pulseModules,
};

function score(path, hints, names) {
  let s = 0;
  hints.forEach((h) => {
    if (new RegExp(h, 'i').test(path)) s += 10;
  });
  names.forEach((n) => {
    if (path.toLowerCase().includes(n.toLowerCase())) s += 20;
  });
  if (/-?page\.(jsx|js)$/i.test(path)) s += 5;
  if (/-?index\.(jsx|js)$/i.test(path)) s += 2;
  return s;
}

function pickExport(mod, exportNames, path, hints) {
  if (!mod) return null;
  // Export bernama selalu diterima (mis. `export function DiscoverPage`).
  for (const name of exportNames) {
    if (typeof mod[name] === 'function') return mod[name];
  }
  // `export default` hanya dipercaya bila nama file memang menunjuk komponen ini
  // (folder/komponen sesuai hint, atau file index) — supaya komponen lain di
  // folder yang sama (mis. ProfileCard.jsx) tidak salah terpilih.
  const pathLooksMain =
    hints.some((h) => new RegExp(h, 'i').test(path)) || /-?index\.(jsx|js)$/i.test(path);
  if (pathLooksMain && typeof mod.default === 'function') return mod.default;
  return null;
}

/**
 * Cari komponen tim di folder masing-masing.
 * @returns {{ Comp: Function|null, status: 'loading'|'ready'|'missing', path: string|null }}
 */
export function useTeamComponent(folder, exportNames, hints = []) {
  const [state, setState] = useState({ Comp: null, status: 'loading', path: null });
  // Kunci string: array literal dari pemanggil berubah identitas tiap render,
  // tanpa ini useEffect akan berjalan tanpa henti.
  const namesKey = exportNames.join('|');
  const hintsKey = hints.join('|');

  useEffect(() => {
    let alive = true;
    const names = namesKey.split('|').filter(Boolean);
    const hintList = hintsKey.split('|').filter(Boolean);
    const modules = MODULE_MAP[folder] || {};
    const ranked = Object.entries(modules).sort(
      ([a], [b]) => score(b, hintList, names) - score(a, hintList, names),
    );

    (async () => {
      for (const [path, load] of ranked) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const mod = await load();
          const Comp = pickExport(mod, names, path, hintList);
          if (Comp) {
            if (alive) setState({ Comp, status: 'ready', path });
            return;
          }
        } catch {
          // file ini bukan komponen yang dicari (atau gagal dimuat) → lanjut ke berikutnya
        }
      }
      if (alive) setState({ Comp: null, status: 'missing', path: null });
    })();

    return () => {
      alive = false;
    };
  }, [folder, namesKey, hintsKey]);

  return state;
}

/** Panel placeholder selama komponen tim belum tersedia. */
export function PartPlaceholder({ title, owner, propsContract, note }) {
  return (
    <section className="placeholder">
      <span className="placeholder-badge">{owner}</span>
      <h2 className="placeholder-title">{title}</h2>
      <p className="placeholder-note">{note}</p>
      <div className="placeholder-contract">
        <p className="placeholder-contract-title">Props yang sudah dikirim App.jsx (PRD 4.7):</p>
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Tipe</th>
            </tr>
          </thead>
          <tbody>
            {propsContract.map(([prop, type]) => (
              <tr key={prop}>
                <td>
                  <code>{prop}</code>
                </td>
                <td>
                  <code>{type}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

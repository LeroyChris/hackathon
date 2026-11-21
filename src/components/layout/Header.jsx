// src/components/layout/Header.jsx
// Owner: Fachri (`fachri-work`)
// Kontrak: PRD 4.7 — Header memanggil `handleReset()` milik App.jsx; CORE-04 + CPL-06.

import { useEffect, useRef, useState } from 'react';

export default function Header({ user, onReset }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const cancelRef = useRef(null);

  // Aksesibilitas (PRD 5.5): modal dapat ditutup dengan Escape.
  useEffect(() => {
    if (!confirmOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setConfirmOpen(false);
    };
    window.addEventListener('keydown', onKey);
    if (cancelRef.current) cancelRef.current.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmOpen]);

  const xp = typeof user?.xp === 'number' ? user.xp : 0;

  const doReset = () => {
    setConfirmOpen(false);
    if (typeof onReset === 'function') onReset();
  };

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          ◎
        </span>
        <span className="brand-text">
          <strong>SocialHub</strong>
          <small>Cakrawala University</small>
        </span>
      </div>

      <div className="header-actions">
        <div className="xp-chip" title="Virtual Campus XP — poin virtual, bukan uang">
          <span className="xp-label">Virtual Campus XP</span>
          <span className="xp-value" aria-label={`Saldo ${xp} XP`}>
            {xp.toLocaleString('id-ID')} XP
          </span>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-reset"
          onClick={() => setConfirmOpen(true)}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">⟲</span> Reset Demo Data
        </button>
      </div>

      {confirmOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setConfirmOpen(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="reset-title" className="modal-title">
              Reset Demo Data?
            </h2>
            <p className="modal-body">
              Saldo kembali ke <strong>1.000 XP</strong>. Semua vote, prediksi buatanmu, match, dan riwayat
              chat akan dihapus, lalu 8 prediksi seed dimuat ulang.
            </p>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" ref={cancelRef} onClick={() => setConfirmOpen(false)}>
                Batal
              </button>
              <button type="button" className="btn btn-danger" onClick={doReset}>
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

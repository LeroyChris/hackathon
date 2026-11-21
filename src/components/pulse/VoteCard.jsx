import { useEffect, useState } from 'react';

// Hitung mundur sederhana dari `closesAt` (ISO 8601) ke waktu sekarang.
function formatRemaining(closesAt, now) {
  const diff = new Date(closesAt).getTime() - now;
  if (Number.isNaN(diff)) return '';
  if (diff <= 0) return 'Ditutup';
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  if (days > 0) return `${days} hari ${hours} jam lagi`;
  if (hours > 0) return `${hours} jam ${minutes} menit lagi`;
  return `${minutes} menit lagi`;
}

// Perbandingan XP yang masuk ke sisi Ya vs Tidak (bukan "odds", bukan nilai uang).
function simpleRatio(a, b) {
  if (a === 0 && b === 0) return '1:1';
  if (a === 0) return '0:1';
  if (b === 0) return '1:0';
  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));
  const g = gcd(a, b);
  return `${a / g}:${b / g}`;
}

export default function VoteCard({ market, currentUser, onVote, creatorName }) {
  const { id, question, category, campus, closesAt, status, pool, votes } = market || {};

  // Tick tiap 30 detik supaya hitungan waktu tetap segar tanpa beban render berat.
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const yes = pool?.yes || 0;
  const no = pool?.no || 0;
  const total = yes + no;
  const participantCount = new Set((votes || []).map((v) => v?.userId).filter(Boolean)).size;
  const yesPercent = total === 0 ? 50 : Math.round((yes / total) * 100);
  const noPercent = total === 0 ? 50 : 100 - yesPercent;

  const myVote = currentUser?.votes?.[id];
  const xp = currentUser?.xp ?? 0;
  const timeLabel = formatRemaining(closesAt, now);
  const isClosed = status !== 'open' || timeLabel === 'Ditutup';
  const canVote = !isClosed && !myVote;
  const insufficient = canVote && xp < 100;
  const ratio = simpleRatio(yes, no);

  return (
    <article className="vote-card">
      <div className="vote-meta">
        <span className="badge">{category}</span>
        <span className="badge">{campus}</span>
        <span className={`status-badge ${isClosed ? 'status-closed' : 'status-open'}`}>
          {isClosed ? 'Ditutup' : 'Open'}
        </span>
        {status === 'resolved' && market.outcome && (
          <span
            className={`status-badge ${market.outcome === 'yes' ? 'status-open' : 'status-closed'}`}
          >
            Hasil: {market.outcome === 'yes' ? 'Ya' : 'Tidak'}
          </span>
        )}
        <span className="countdown" style={{ marginLeft: 'auto' }}>
          {timeLabel}
        </span>
      </div>

      <h3 className="vote-question">{question}</h3>

      {creatorName && (
        <div className="muted" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, margin: '-4px 0 2px' }}>
          <span>Dibuat oleh:</span>
          <span style={{ fontWeight: 600, color: 'var(--fg)' }}>{creatorName}</span>
        </div>
      )}

      {/* Ringkasan komunitas: total XP, rincian sisi, peserta, perbandingan dukungan */}
      <div className="vote-meta" style={{ gap: 12, marginTop: 6 }}>
        <span className="stat-pill" style={{ padding: '4px 10px', fontSize: 13 }}>
          Total Pool: <strong>{total.toLocaleString('id')} XP</strong>
        </span>
        <span className="muted" style={{ fontSize: 13 }}>
          Ya: {yes.toLocaleString('id')} XP · Tidak: {no.toLocaleString('id')} XP
        </span>
        <span className="muted" style={{ fontSize: 13 }}>
          Perbandingan dukungan: {ratio}
        </span>
        <span className="muted" style={{ fontSize: 13, marginLeft: 'auto' }}>
          {participantCount} peserta
        </span>
      </div>

      <div
        className="progress"
        role="img"
        aria-label={`Ya ${yesPercent} persen, Tidak ${noPercent} persen`}
      >
        <div className="progress-yes" style={{ width: `${yesPercent}%` }} />
        <div className="progress-no" style={{ width: `${noPercent}%` }} />
      </div>
      <div className="percent-row">
        <span>Ya {yesPercent}%</span>
        <span>Tidak {noPercent}%</span>
      </div>

      {/* Biaya vote tetap 100 XP sesuai aturan PRD 3.4 (bukan pembayaran) */}
      {canVote && (
        <div className="muted" style={{ fontSize: 12, marginTop: 6 }}>
          Biaya vote: 100 Campus XP. XP adalah poin reputasi virtual, bukan nilai uang.
        </div>
      )}

      {(() => {
        const resolved = status === 'resolved' && (market.outcome === 'yes' || market.outcome === 'no');
        const won = resolved && myVote && myVote === market.outcome;
        const lost = resolved && myVote && myVote !== market.outcome;

        if (myVote && !resolved) {
          return (
            <div className="muted" style={{ textAlign: 'center' }}>
              Sudah Vote: {myVote === 'yes' ? 'Ya' : 'Tidak'} · 100 XP
            </div>
          );
        }

        if (resolved) {
          return (
            <div style={{ textAlign: 'center' }}>
              <div className="muted" style={{ marginBottom: 6 }}>
                Hasil resmi: <strong>{market.outcome === 'yes' ? 'Ya' : 'Tidak'}</strong>
              </div>
              {won && (
                <div style={{
                  background: 'rgba(52,211,153,0.15)', color: 'var(--yes)',
                  border: '1px solid rgba(52,211,153,0.35)', borderRadius: 10,
                  padding: '8px 10px', fontSize: 14, fontWeight: 600,
                }}>
                  Prediksi kamu benar! Campus XP kamu bertambah.
                </div>
              )}
              {lost && (
                <div style={{
                  background: 'rgba(251,113,133,0.15)', color: 'var(--no)',
                  border: '1px solid rgba(251,113,133,0.35)', borderRadius: 10,
                  padding: '8px 10px', fontSize: 14, fontWeight: 600,
                }}>
                  Prediksi kamu belum tepat. Coba lagi di prediksi berikutnya!
                </div>
              )}
              {!myVote && (
                <div className="muted">Kamu tidak ikut vote di prediksi ini.</div>
              )}
            </div>
          );
        }

        if (isClosed) {
          return <div className="muted" style={{ textAlign: 'center' }}>Ditutup</div>;
        }

        return (
          <>
            <div className="vote-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onVote(id, 'yes')}
                disabled={insufficient}
                aria-label="Vote Ya 100 Campus XP"
              >
                Ya (100 XP)
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onVote(id, 'no')}
                disabled={insufficient}
                aria-label="Vote Tidak 100 Campus XP"
              >
                Tidak (100 XP)
              </button>
            </div>
            {insufficient && <p className="field-error">XP kamu tidak cukup</p>}
          </>
        );
      })()}
    </article>
  );
}

function formatRemaining(closesAt) {
  const diff = new Date(closesAt).getTime() - Date.now();
  if (Number.isNaN(diff)) return '';
  if (diff <= 0) return 'Ditutup';
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${Math.max(1, minutes)} menit lagi`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lagi`;
  const days = Math.floor(hours / 24);
  return `${days} hari lagi`;
}

export default function VoteCard({ market, currentUser, onVote }) {
  const { id, question, category, campus, closesAt, status, pool, votes } = market || {};
  const yes = pool?.yes || 0;
  const no = pool?.no || 0;
  const total = yes + no;
  const participantCount = new Set((votes || []).map((v) => v?.userId).filter(Boolean)).size;
  const yesPercent = total === 0 ? 50 : Math.round((yes / total) * 100);
  const noPercent = total === 0 ? 50 : 100 - yesPercent;

  const myVote = currentUser?.votes?.[id];
  const xp = currentUser?.xp ?? 0;
  const timeLabel = formatRemaining(closesAt);
  const isClosed = status !== 'open' || timeLabel === 'Ditutup';
  const canVote = !isClosed && !myVote;
  const insufficient = canVote && xp < 100;

  return (
    <article className="vote-card">
      <div className="vote-meta">
        <span className="badge">{category}</span>
        <span className="badge">{campus}</span>
        <span className={`status-badge ${isClosed ? 'status-closed' : 'status-open'}`}>
          {isClosed ? 'Ditutup' : 'Open'}
        </span>
        <span className="countdown" style={{ marginLeft: 'auto' }}>
          {timeLabel}
        </span>
      </div>

      <h3 className="vote-question">{question}</h3>

      {/* Total Pool XP */}
      <div className="vote-meta" style={{ gap: 12 }}>
        <span className="stat-pill" style={{ padding: '4px 10px', fontSize: 13 }}>
          Total Pool: <strong>{total.toLocaleString('id')} XP</strong>
        </span>
        <span className="muted" style={{ fontSize: 13 }}>
          Ya: {yes.toLocaleString('id')} XP · Tidak: {no.toLocaleString('id')} XP
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

      {myVote ? (
        <div className="muted" style={{ textAlign: 'center' }}>
          Sudah Vote: {myVote === 'yes' ? 'Ya' : 'Tidak'}
        </div>
      ) : isClosed ? (
        <div className="muted" style={{ textAlign: 'center' }}>
          Ditutup
        </div>
      ) : (
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
      )}
    </article>
  );
}

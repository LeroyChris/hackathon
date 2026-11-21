// Kontrak props (PRD 4.7): { users: Array<{id,name,xp}>, currentUserId: string }
// Dipakai dua tempat: export named di sini (tab Leaderboard via PartLoader)
// dan re-export dari PulsePage.jsx (opsional render inline).

export function Leaderboard({ users, currentUserId }) {
  const sorted = [...(users || [])]
    .sort((a, b) => {
      if (b.xp !== a.xp) return b.xp - a.xp;
      return (a.name || '').localeCompare(b.name || '', 'id');
    })
    .slice(0, 10);

  const meRank = sorted.findIndex((u) => u.id === currentUserId);
  const me = meRank >= 0 ? sorted[meRank] : null;
  const rows = me
    ? sorted
    : [...sorted, ...(users || []).filter((u) => u.id === currentUserId)].slice(0, 11);

  return (
    <section className="panel">
      <h2 className="section-title">Leaderboard</h2>
      <p className="muted" style={{ marginBottom: 12 }}>
        Peringkat berdasarkan Campus XP. XP sama diurutkan berdasarkan nama A–Z.
      </p>

      <div className="leaderboard">
        {rows.map((user, index) => {
          const isMe = user.id === currentUserId;
          const rank = isMe && me ? meRank + 1 : index + 1;
          return (
            <div
              key={user.id}
              className={`leaderboard-row${isMe ? ' is-me' : ''}`}
              aria-current={isMe ? 'true' : undefined}
            >
              <span className={`rank${rank <= 3 ? ' rank-top' : ''}`}>#{rank}</span>
              <span className="grow">{user.name}</span>
              {isMe && <span className="badge badge-highlight">Me</span>}
              <span className="stat-pill" style={{ padding: '4px 10px' }}>{user.xp} XP</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Leaderboard;

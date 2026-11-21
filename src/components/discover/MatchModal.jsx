import { GOAL_LABEL } from '../../data/mockData.js';

export default function MatchModal({
  isOpen,
  onClose,
  onLikeBackProfile,
  currentUser,
}) {
  const profile = onLikeBackProfile || null;

  if (!profile) {
    return null;
  }

  const name = profile.name;
  const avatar = profile.avatar;
  const campus = profile.campus;
  const goals = profile.goals || [];

  const goalBadges = goals.map(
    (g) => <span key={g} className="goal-badge">
      {GOAL_LABEL[g]}
    </span>
  );

  return (
    <section className="match-modal">
      <div>
        <div className="avatar-emboji text-5xl rounded-full bg-slate-800 w-20 h-20 flex items-center justify-center mx-auto mb-3">
          {avatar}
        </div>
        <h3 className="profile-name text-lg font-semibold text-center">{name}</h3>
        <div className="profile-meta text-sm text-slate-400">
          <span>{campus}</span>
        </div>
        <div className="goal-badges flex flex-wrap gap-2">
          {goalBadges}
        </div>
        <div className="match-actions flex flex-col items-center gap-4 mt-6">
          <button
            className="match-btn send-message flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-300 border border-green-500/30 rounded-md font-medium hover:bg-green-600/30 transition-colors"
            aria-label="Kirim pesan ke match"
            onClick={() => {
              onClose();
              // Trigger chat open - parent will handle
            }}
          >
            Kirim Pesan
          </button>
          <button
            className="match-btn continue-swipe flex items-center gap-2 px-4 py-2 bg-slate-600/30 text-slate-300 border border-slate-500/30 rounded-md font-medium hover:bg-slate-700/40 transition-colors"
            aria-label="Lanjut swipe"
            onClick={onClose}
          >
            Lanjut Swipe
          </button>
        </div>
      </div>
    </section>
  );
}
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

  const goalTags = goals.map(
    (g) => `<span class="goal-tag" title="${GOAL_LABEL[g]}">${GOAL_LABEL[g]}</span>`
  );

  return (
    <div
      className="match-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Mutual match with profile"
      onClick={onClose}
    >
      <div className="match-modal-overlay" onClick={(e) => e.stopPropagation()} />

      <div className="match-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="match-avatar-emboji" aria-hidden="true">
          {avatar}
        </div>
        <div className="match-profile-info">
          <h3 className="match-name">{name}</h3>
          <div className="match-meta">
            <span className="match-campus" title={campus}>
              {campus}
            </span>
          </div>
          <div className="match-goals">
            {goalTags.join('')}
          </div>
        </div>

        <div className="match-actions">
          <button
            className="match-btn send-message"
            aria-label="Kirim pesan ke match"
            onClick={() => {
              onClose();
              // Trigger chat open - parent will handle
            }}
          >
            Kirim Pesan
          </button>
          <button
            className="match-btn continue-swipe"
            aria-label="Lanjut swipe"
            onClick={onClose}
          >
            Lanjut Swipe
          </button>
        </div>
      </div>
    </div>
  );
}
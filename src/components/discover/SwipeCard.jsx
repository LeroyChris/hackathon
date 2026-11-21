import { ENUMS, GOAL_LABEL } from '../../data/mockData.js';

export default function SwipeCard({
  profile,
  isLiked,
  isPassed,
  onLike,
  onPass,
}) {
  const goals = profile.goals || [];
  const interests = profile.interests || [];
  const campus = profile.campus;
  const prodi = profile.prodi;
  const angkatan = profile.angkatan;
  const bio = profile.bio || '';
  const avatar = profile.avatar || '👤';
  const name = profile.name;

  const interestTags = interests.map(
    (i) => <span key={i} className="interest-tag">
      {i}
    </span>
  );

  const goalBadges = goals.map(
    (g) => <span key={g} className="goal-badge">
      {GOAL_LABEL[g]}
    </span>
  );

  return (
    <section className="profile-card">
      <div className="swipe-stack">
        <div>
          <div className="profile-avatar text-5xl rounded-circle bg-slate-800 w-20 h-20 flex items-center justify-center mx-auto mb-3">
            {avatar}
          </div>
          <h3 className="profile-name text-lg font-semibold text-center">{name}</h3>
          <div className="profile-meta text-sm text-slate-400">
            <span>{prodi} • Angkatan {angkatan} • {campus}</span>
          </div>
          <p className="profile-bio text-slate-400 text-sm mb-4">{bio}</p>
          <div className="interest-list flex flex-wrap gap-6 mb-4">
            {interestTags}
          </div>
          <div className="goal-badges flex flex-wrap gap-2">
            {goalBadges}
          </div>
          <div className="card-actions flex flex-col items-center gap-2 mt-6">
            <button
              className="action-btn like-btn flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-300 border border-green-500/30 rounded-md font-medium hover:bg-green-600/30 transition-colors"
              onClick={onLike}
              aria-label="Like"
              onMouseDown={(e) => e.preventDefault()}
            >
              Like
            </button>
            <button
              className="action-btn pass-btn flex items-center gap-2 px-4 py-2 bg-slate-600/30 text-slate-300 border border-slate-500/30 rounded-md font-medium hover:bg-slate-700/40 transition-colors"
              onClick={onPass}
              aria-label="Pass"
              onMouseDown={(e) => e.preventDefault()}
            >
              Pass
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
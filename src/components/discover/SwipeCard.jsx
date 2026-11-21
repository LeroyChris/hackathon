import { GOAL_LABEL } from '../../data/mockData.js';

export default function SwipeCard({
  profile,
  onLike,
  onPass,
  isLiked,
  isPassed,
}) {
  const handleMouseDown = (e) => {
    e.currentTarget.setAttribute('data-start-x', e.clientX);
  };

  const handleMouseUp = (e) => {
    const startX = parseInt(e.currentTarget.getAttribute('data-start-x')) || 0;
    const diff = e.clientX - startX;

    if (diff > 50 && !isLiked) {
      onLike();
    } else if (diff < -50 && !isPassed) {
      onPass();
    }
  };

  const handleTouchStart = (e) => {
    e.currentTarget.setAttribute('data-start-y', e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const startY = parseInt(e.currentTarget.getAttribute('data-start-y')) || 0;
    const diff = e.changedTouches[0].clientY - startY;

    if (diff > 50 && !isLiked) {
      onLike();
    } else if (diff < -50 && !isPassed) {
      onPass();
    }
  };

  const goals = profile.goals || [];
  const campus = profile.campus;
  const prodi = profile.prodi;
  const angkatan = profile.angkatan;
  const bio = profile.bio || '';
  const avatar = profile.avatar || '👤';
  const name = profile.name;

  const goalBadges = goals.map(
    (g) => `<span class="goal-badge" title="${GOAL_LABEL[g]}">${GOAL_LABEL[g]}</span>`
  );

  const style = isLiked
    ? { transform: 'translateX(100%) rotate(-10deg)', transition: 'none' }
    : isPassed
    ? { transform: 'translateX(-100%) rotate(10deg)', transition: 'none' }
    : {};

  return (
    <div
      className="swipe-card"
      role="button"
      tabIndex={0}
      aria-label={`Profil ${name}, swipe kanan untuk like, kiri untuk pass`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-content" style={{ ...style }}>
        <div className="avatar-emboji" aria-hidden="true">
          {avatar}
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{name}</h3>
          <div className="profile-meta">
            <span className="prodi">{prodi}</span>
            <span className="angkatan">Angkatan {angkatan}</span>
            <span className="campus-badge" title={campus}>
              {campus}
            </span>
          </div>
          <p className="profile-bio">{bio}</p>
          <div className="goal-badges">
            {goalBadges.join('')}
          </div>
        </div>
      </div>
      <div className="card-actions">
        <button
          className="action-btn like-btn"
          aria-label="Like"
          onClick={onLike}
          onMouseDown={e => e.preventDefault()}
        >
          Like
        </button>
        <button
          className="action-btn pass-btn"
          aria-label="Pass"
          onClick={onPass}
          onMouseDown={e => e.preventDefault()}
        >
          Pass
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import VoteCard from './VoteCard';

const CAMPUS_FILTERS = ['All', 'Kemang', 'Sudirman', 'Both'];

export default function PredictionList({ predictions, currentUser, onVote, profiles }) {
  const [campus, setCampus] = useState('All');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set((predictions || []).map((p) => p.category))];
  const filtered = (predictions || []).filter((p) => {
    const campusMatch = campus === 'All' || p.campus === campus || p.campus === 'Both';
    const categoryMatch = category === 'All' || p.category === category;
    return campusMatch && categoryMatch;
  });

  return (
    <section className="panel">
      <div className="filter-group" style={{ marginBottom: 14 }}>
        <span className="filter-label">Kampus</span>
        {CAMPUS_FILTERS.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${campus === c ? 'is-active' : ''}`}
            onClick={() => setCampus(c)}
            aria-pressed={campus === c}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="filter-group" style={{ marginBottom: 18 }}>
        <span className="filter-label">Kategori</span>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${category === c ? 'is-active' : ''}`}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div
          className="pulse-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {filtered.map((market) => {
            const profile = (profiles || []).find((p) => p.id === market.createdBy);
            const creatorName = market.createdBy === 'me'
              ? currentUser?.name || 'Kamu'
              : profile?.name || market.createdBy;
            return (
              <VoteCard
                key={market.id}
                market={market}
                currentUser={currentUser}
                onVote={onVote}
                creatorName={creatorName}
              />
            );
          })}
        </div>
      ) : (
        <div className="empty-state">Tidak ada prediksi yang cocok dengan filter ini.</div>
      )}
    </section>
  );
}

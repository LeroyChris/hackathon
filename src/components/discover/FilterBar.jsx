import { ENUMS, GOAL_LABEL } from '../../data/mockData.js';

export default function FilterBar({ campusFilter, goalFilter, onCampusChange, onGoalChange }) {
  const campusOptions = ['Semua', ...ENUMS.campus];

  return (
    <div className="filter-bar" role="region" aria-label="Filter profil Discover">
      <div className="filter-group">
        <label className="filter-label">Kampus</label>
        <select
          className="filter-select"
          value={campusFilter}
          onChange={(e) => onCampusChange(e.target.value)}
          aria-label="Filter kampus"
        >
          {campusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Tujuan</label>
        <select
          className="filter-select"
          value={goalFilter}
          onChange={(e) => onGoalChange(e.target.value)}
          aria-label="Filter tujuan"
        >
          <option value="">Semua</option>
          {ENUMS.goal.map((g) => (
            <option key={g} value={g}>
              {GOAL_LABEL[g]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
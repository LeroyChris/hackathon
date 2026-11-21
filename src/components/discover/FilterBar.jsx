import { ENUMS, GOAL_LABEL } from '../../data/mockData.js';

export default function FilterBar({ campusFilter, goalFilter, onCampusChange, onGoalChange }) {
  const campusOptions = ['Semua', ...ENUMS.campus];

  return (
    <section className="discover-filters">
      <div className="filter-group">
        <label className="filter-label text-slate-300 text-sm font-medium mb-1">Kampus</label>
        <select
          className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-1.5 block w-full"
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

      <div className="filter-group flex flex-col gap-2">
        <label className="filter-label text-slate-300 text-sm font-medium mb-1">Tujuan</label>
        <select
          className="bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3 py-1.5 block w-full"
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
    </section>
  );
}
// src/components/layout/Navbar.jsx
// Owner: Fachri (`fachri-work`)
// Kontrak: PRD 3.5 CORE-05 — 3 tab (Discover, Campus Pulse, Leaderboard),
// tab aktif punya indikator jelas, pindah tab tidak menghapus state (state global ada di App.jsx).

export const TABS = [
  { id: 'discover', label: 'Discover', icon: '🔎' },
  { id: 'pulse', label: 'Campus Pulse', icon: '📈' },
  { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
];

export default function Navbar({ activeTab = 'discover', onTabChange }) {
  const select = (id) => {
    if (typeof onTabChange === 'function') onTabChange(id);
  };

  return (
    <nav className="app-nav" aria-label="Navigasi utama">
      {TABS.map((tab) => {
        const active = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            className={`nav-tab${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => select(tab.id)}
          >
            <span className="nav-icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

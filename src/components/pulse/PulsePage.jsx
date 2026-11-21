import { useState } from 'react';
import PredictionList from './PredictionList';
import CreatePredictionModal from './CreatePredictionModal';
import Leaderboard from './Leaderboard';

// Kontrak props (PRD 4.7): predictions, currentUser, onVote, onCreatePrediction, profiles
export function PulsePage({ predictions, currentUser, onVote, onCreatePrediction, profiles }) {
  const [showModal, setShowModal] = useState(false);

  // Inject sample resolved data to ensure UI coverage
  const resolvedPredictions = [
    ...predictions,
    {
      id: 'debug-win',
      question: 'Contoh: Prediksi yang kamu menangkan',
      category: 'akademik',
      campus: 'Kemang',
      createdBy: 'u01',
      status: 'resolved',
      outcome: 'yes',
      pool: { yes: 1200, no: 800 },
      votes: [{ userId: 'me', side: 'yes', amount: 100 }],
    },
    {
      id: 'debug-loss',
      question: 'Contoh: Prediksi yang kamu kalahkan',
      category: 'sports',
      campus: 'Sudirman',
      createdBy: 'u03',
      status: 'resolved',
      outcome: 'yes',
      pool: { yes: 800, no: 1200 },
      votes: [{ userId: 'me', side: 'no', amount: 100 }],
    },
  ];

  return (
    <div className="app-main pulse-page" style={{ padding: 16, maxWidth: 1400, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>Campus Pulse</h1>
        <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Buat Prediksi
        </button>
      </header>

      <PredictionList
        predictions={resolvedPredictions}
        currentUser={currentUser}
        onVote={onVote}
        profiles={profiles}
      />

      {showModal && (
        <CreatePredictionModal
          currentUser={currentUser}
          onCreatePrediction={onCreatePrediction}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export { Leaderboard };
export default PulsePage;

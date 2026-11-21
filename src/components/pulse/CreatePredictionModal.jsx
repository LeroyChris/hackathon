import { useState } from 'react';
import { ENUMS } from '../data/mockData.js';
import { MAX_CREATED_MARKETS } from '../lib/storage.js';

const CATEGORIES = ENUMS.marketCategory;
const CAMPUSES = ['Kemang', 'Sudirman', 'Both'];

function toIsoJakartaLocalValue(value) {
  // `datetime-local` → ISO 8601 (+07:00)
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const shifted = new Date(d.getTime() + 7 * 60 * 60 * 1000);
  return shifted.toISOString().replace('Z', '+07:00');
}

export default function CreatePredictionModal({ currentUser, onCreatePrediction, onClose }) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState(CATEGORIES[2] || 'event');
  const [campus, setCampus] = useState('Kemang');
  const [closesAt, setClosesAt] = useState('');
  const [error, setError] = useState('');

  const questionLen = Array.isArray(question) ? question.length : question?.length || 0;
  const valid = question.trim().length >= 10 && question.trim().length <= 120;
  const limitReached = (currentUser?.createdMarkets?.length || 0) >= MAX_CREATED_MARKETS;

  const handleCreate = () => {
    if (!valid) {
      setError('Pertanyaan harus 10–120 karakter.');
      return;
    }
    if (limitReached) {
      setError('Batas 3 prediksi per sesi demo sudah tercapai.');
      return;
    }
    const market = onCreatePrediction({
      question: question.trim(),
      category,
      campus,
      closesAt: closesAt ? toIsoJakartaLocalValue(closesAt) : '',
      createdBy: currentUser?.id || 'me',
    });
    if (market) onClose?.();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label="Buat prediksi baru"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="modal-title">Buat Prediksi Baru</h3>
        {error && <p className="field-error" role="alert">{error}</p>}

        <div className="modal-field">
          <label htmlFor="pred-question">Pertanyaan</label>
          <textarea
            id="pred-question"
            className="textarea"
            value={question}
            onChange={(e) => { setQuestion(e.target.value); if (error) setError(''); }}
            placeholder="Contoh: Futsal Cakrawala Arena: Kemang menang lawan Sudirman?"
            maxLength={120}
            minLength={10}
          />
          <span className="char-count">{questionLen} / 120</span>
        </div>

        <div className="modal-field">
          <label htmlFor="pred-category">Kategori</label>
          <select
            id="pred-category"
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="modal-field">
          <label htmlFor="pred-campus">Kampus</label>
          <select
            id="pred-campus"
            className="select"
            value={campus}
            onChange={(e) => setCampus(e.target.value)}
          >
            {CAMPUSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="modal-field">
          <label htmlFor="pred-closes">Tutup pada</label>
          <input
            id="pred-closes"
            type="datetime-local"
            className="input"
            value={closesAt}
            onChange={(e) => { setClosesAt(e.target.value); if (error) setError(''); }}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Batal</button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
            disabled={!valid || limitReached}
          >
            Buat
          </button>
        </div>
        {limitReached && (
          <p className="field-error" style={{ marginTop: 10 }}>
            Batas 3 prediksi per sesi demo tercapai.
          </p>
        )}
      </div>
    </div>
  );
}

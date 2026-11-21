import { useState, useEffect } from 'react';
import { autoReplies } from '../../data/mockData.js';

export default function ChatSimulation({
  isOpen,
  onClose,
  matchedUserId,
  onSendMessage,
}) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [autoReplyPending, setAutoReplyPending] = useState(false);

  // Kirim pesan saat user menekan Enter
  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(matchedUserId, text);
    setMessages((prev) => [
      ...prev,
      { from: 'me', text: text, sentAt: new Date().toISOString() },
    ]);
    setText('');
    setAutoReplyPending(true);
  };

  // Auto reply simulasi setelah 1-2 detik
  useEffect(() => {
    if (autoReplyPending && messages.length > 0) {
      const delay = Math.random() * 1000 + 1000; // 1-2 detik
      const timer = setTimeout(() => {
        const reply =
          autoReplies[Math.floor(Math.random() * autoReplies.length)];
        setMessages((prev) => [
          ...prev,
          { from: matchedUserId, text: reply, sentAt: new Date().toISOString() },
        ]);
        setAutoReplyPending(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [autoReplyPending, messages, matchedUserId, autoReplies]);

  return (
    <div className="chat-simulation" role="dialog" aria-modal="true">
      <div className="chat-header">
        <span className="chat-user">Match: {matchedUserId}</span>
        <button className="chat-close-btn" onClick={onClose} aria-label="Tutup chat">
          ✕
        </button>
      </div>

      <div className="chat-messages" aria-live="polite">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.from === 'me' ? 'message-me' : 'message-other'}`}
          >
            <span className="message-text">{msg.text}</span>
            <span className="message-time">
              {new Date(msg.sentAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {autoReplyPending && (
        <div className="chat-typing-indicator">Mengetik...</div>
      )}

      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pesan..."
          aria-label="Masukkan pesan"
        />
        <button className="chat-send-btn" onClick={handleSend} aria-label="Kirim pesan">
          Kirim
        </button>
      </div>
    </div>
  );
}
import { useMemo, useCallback, useEffect } from 'react';
import { SEED_PROFILES, autoReplies, GOAL_LABEL } from '../../data/mockData.js';
import FilterBar from './FilterBar.jsx';
import SwipeCard from './SwipeCard.jsx';
import MatchModal from './MatchModal.jsx';
import ChatSimulation from './ChatSimulation.jsx';

export default function DiscoverPage({
  profiles,
  currentUser,
  onMatch,
  onSendMessage,
}) {
  // State filter
  const [campusFilter, setCampusFilter] = useState('Semua');
  const [goalFilter, setGoalFilter] = useState('');

  // State swipe/kartucurrent
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedIds, setLikedIds] = useState(new Set());
  const [passedIds, setPassedIds] = useState(new Set());
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [likeBackProfile, setLikeBackProfile] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [matchedUserId, setMatchedUserId] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  // Filtered profiles
  const filteredProfiles = useMemo(() => {
    let result = profiles;

    if (campusFilter !== 'Semua') {
      result = result.filter((p) => p.campus === campusFilter);
    }

    if (goalFilter) {
      result = result.filter((p) => p.goals && p.goals.includes(goalFilter));
    }

    return result;
  }, [profiles, campusFilter, goalFilter]);

  // Current profile
  const currentProfile = useMemo(() => {
    const available = filteredProfiles.filter(
      (p) => !likedIds.has(p.id) && !passedIds.has(p.id),
    );
    return available[currentIndex] || null;
  }, [filteredProfiles, currentIndex, likedIds, passedIds]);

  // Handle like
  const handleLike = useCallback(() => {
    const profile = currentProfile;
    if (!profile) return;

    setLikedIds((prev) => new Set([...prev, profile.id]));

    if (profile.willLikeBack) {
      setLikeBackProfile(profile);
      setShowMatchModal(true);
    }

    // Pindah ke kartu berikutnya
    setCurrentIndex((i) => i + 1);
  }, [currentProfile, setShowMatchModal]);

  // Handle pass
  const handlePass = useCallback(() => {
    const profile = currentProfile;
    if (!profile) return;

    setPassedIds((prev) => new Set([...prev, profile.id]));
    setCurrentIndex((i) => i + 1);
  }, [currentProfile]);

  // Handle match modal close
  const handleMatchClose = useCallback(() => {
    setShowMatchModal(false);
    setLikeBackProfile(null);
  }, []);

  // Handle match confirmation (kirim pesan atau lanjut swipe)
  const handleMatchConfirm = useCallback(() => {
    if (likeBackProfile) {
      onMatch(likeBackProfile);
      setMatchedUserId(likeBackProfile.id);
      setChatMessages((prev) => ({
        ...prev,
        [likeBackProfile.id]: [],
      }));
      setMatchedUserId(likeBackProfile.id);
      setChatOpen(true);
    }
    handleMatchClose();
  }, [likeBackProfile, onMatch, setMatchedUserId, setChatOpen, setChatMessages, handleMatchClose]);

  // Handle send message
  const handleSendMessage = useCallback(
    (userId, text) => {
      onSendMessage(userId, text);
      setChatMessages((prev) => ({
        ...prev,
        [userId]: [
          ...(prev[userId] || []),
          { from: 'me', text, sentAt: new Date().toISOString() },
        ],
      }));
    },
    [onSendMessage, setChatMessages],
  );

  // Handle chat close
  const handleChatClose = useCallback(() => {
    setChatOpen(false);
    setMatchedUserId(null);
  }, []);

  // Use only profiles that haven't been liked/passed
  const availableProfiles = useMemo(() => {
    return filteredProfiles.filter(
      (p) => !likedIds.has(p.id) && !passedIds.has(p.id),
    );
  }, [filteredProfiles, likedIds, passedIds]);

  // Check if done
  const isDone = useMemo(() => {
    return availableProfiles.length === 0;
  }, [availableProfiles]);

  useEffect(() => {
    // Auto-close match modal after action
    const timer = setTimeout(() => {
      setShowMatchModal(false);
      setLikeBackProfile(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setShowMatchModal, setLikeBackProfile]);

  return (
    <div className="discover-page">
      <header className="discover-header">
        <h2 className="page-title">Social Discovery</h2>

        <FilterBar
          campusFilter={campusFilter}
          goalFilter={goalFilter}
          onCampusChange={(v) => setCampusFilter(v)}
          onGoalChange={(v) => setGoalFilter(v)}
        />
      </header>

      {/* Status jika sudah habis */}
      {isDone && (
        <div className="empty-state">
          <p>Kamu sudah melihat semua profil di filter ini.</p>
        </div>
      )}

 {/* Kartu swipe */}
      {currentProfile && !isDone && (
        <SwipeCard
          profile={currentProfile}
          isLiked={likedIds.has(currentProfile.id)}
          isPassed={passedIds.has(currentProfile.id)}
          onLike={handleLike}
          onPass={handlePass}
        />
      )}

      {/* Match modal */}
      {showMatchModal && <MatchModal
        isOpen={showMatchModal}
        onClose={handleMatchClose}
        onLikeBackProfile={likeBackProfile}
        currentUser={currentUser}
      />}

      {/* Chat simulation */}
      {chatOpen && matchedUserId && (
        <ChatSimulation
          isOpen={chatOpen}
          onClose={handleChatClose}
          matchedUserId={matchedUserId}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}
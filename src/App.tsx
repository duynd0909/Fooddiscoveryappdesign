import { useState } from 'react';
import { VerticalCarousel } from './components/VerticalCarousel';
import { ChallengeBar } from './components/ChallengeBar';
import { CheckInModal } from './components/CheckInModal';
import { ChallengeModal } from './components/ChallengeModal';
import { CompletionModal } from './components/CompletionModal';
import { BottomNav } from './components/BottomNav';
import { SavedRestaurants } from './components/SavedRestaurants';
import { mockRestaurants, mockUserProgress, mockChallenges } from './data/mockData';
import { Restaurant, UserChallengeProgress } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'search' | 'challenges' | 'saved' | 'profile'>('discover');
  const [savedRestaurantIds, setSavedRestaurantIds] = useState<Set<string>>(new Set());
  const [userProgress, setUserProgress] = useState<UserChallengeProgress[]>(mockUserProgress);
  const [checkInRestaurant, setCheckInRestaurant] = useState<Restaurant | null>(null);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [completedChallenge, setCompletedChallenge] = useState<string | null>(null);

  const handleSave = (id: string) => {
    setSavedRestaurantIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNavigate = (id: string) => {
    // In a real app, this would open navigation app
    alert(`Mở chỉ đường đến nhà hàng ${id}`);
  };

  const handleCheckIn = (id: string) => {
    const restaurant = mockRestaurants.find(r => r.id === id);
    if (restaurant) {
      setCheckInRestaurant(restaurant);
    }
  };

  const handleConfirmCheckIn = (withPhoto: boolean) => {
    if (!checkInRestaurant) return;

    // Update progress
    setUserProgress(prev => {
      const newProgress = [...prev];
      
      newProgress.forEach(progress => {
        const challenge = mockChallenges.find(c => c.id === progress.challengeId);
        if (!challenge) return;

        const req = challenge.requirements[0];

        // Check if this restaurant matches challenge criteria
        if (req.conditions?.cuisineTypes?.includes(checkInRestaurant.cuisineType)) {
          if (!progress.visitedRestaurants?.includes(checkInRestaurant.id)) {
            progress.progress += 1;
            progress.visitedRestaurants = [...(progress.visitedRestaurants || []), checkInRestaurant.id];

            // Check if completed
            if (progress.progress >= progress.target) {
              progress.completed = true;
              // Show completion modal
              setTimeout(() => {
                setCompletedChallenge(progress.challengeId);
              }, 500);
            }
          }
        }

        // Handle district challenge
        if (req.type === 'visit_districts') {
          if (!progress.visitedDistricts?.includes(checkInRestaurant.location.district)) {
            progress.progress += 1;
            progress.visitedDistricts = [...(progress.visitedDistricts || []), checkInRestaurant.location.district];

            if (progress.progress >= progress.target) {
              progress.completed = true;
              setTimeout(() => {
                setCompletedChallenge(progress.challengeId);
              }, 500);
            }
          }
        }
      });

      return newProgress;
    });

    setCheckInRestaurant(null);

    // Show success message
    const points = withPhoto ? 70 : 30;
    alert(`✓ Check-in thành công! +${points} điểm`);
  };

  const handleStartChallenge = (challengeId: string) => {
    const challenge = mockChallenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const newProgress: UserChallengeProgress = {
      challengeId,
      progress: 0,
      target: challenge.requirements[0].target,
      startedAt: new Date().toISOString(),
      daysRemaining: challenge.durationDays,
      completed: false,
      visitedRestaurants: [],
      visitedDistricts: []
    };

    setUserProgress(prev => [...prev, newProgress]);
    setShowChallengeModal(false);

    alert(`🎯 Đã tham gia challenge: ${challenge.title}`);
  };

  const handleShareCompletion = () => {
    alert('Chia sẻ lên mạng xã hội (sẽ được tích hợp trong phiên bản thực tế)');
  };

  const savedRestaurants = mockRestaurants.filter(r => savedRestaurantIds.has(r.id));
  const completedChallengeData = completedChallenge ? mockChallenges.find(c => c.id === completedChallenge) : null;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden flex flex-col">
      {/* Challenge progress bar */}
      {activeTab === 'discover' && userProgress.filter(p => !p.completed).length > 0 && (
        <ChallengeBar
          progress={userProgress.filter(p => !p.completed)}
          onClick={() => setShowChallengeModal(true)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'discover' && (
          <VerticalCarousel
            restaurants={mockRestaurants}
            activeProgress={userProgress.filter(p => !p.completed)}
            onSave={handleSave}
            onNavigate={handleNavigate}
            onCheckIn={handleCheckIn}
            savedRestaurants={savedRestaurantIds}
          />
        )}

        {activeTab === 'search' && (
          <div className="h-full bg-gray-50 flex items-center justify-center text-gray-600">
            <div className="text-center p-8">
              <h2 className="text-xl mb-2">Tìm kiếm nhà hàng</h2>
              <p className="text-sm">Chức năng đang phát triển</p>
              <p className="text-xs mt-1 text-gray-500">List/Map view với filters</p>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="h-full bg-gray-50 overflow-y-auto pb-20">
            <div className="p-4">
              <button
                onClick={() => setShowChallengeModal(true)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-2xl hover:from-orange-600 hover:to-pink-600 transition-colors"
              >
                🎯 Xem tất cả Challenges
              </button>
            </div>
            <div className="p-4 space-y-4">
              <h3>Challenges đang tham gia</h3>
              {userProgress.filter(p => !p.completed).length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  Chưa có challenge nào. Nhấn nút trên để bắt đầu!
                </p>
              ) : (
                <div className="space-y-3">
                  {userProgress.filter(p => !p.completed).map(progress => {
                    const challenge = mockChallenges.find(c => c.id === progress.challengeId);
                    if (!challenge) return null;

                    return (
                      <div key={progress.challengeId} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl">{challenge.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-sm mb-1">{challenge.title}</h4>
                            <p className="text-xs text-gray-600">{challenge.description}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {progress.progress}/{progress.target} · 
                          {progress.daysRemaining && ` Còn ${progress.daysRemaining} ngày`}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full"
                            style={{ width: `${(progress.progress / progress.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="h-full bg-gray-50 overflow-y-auto">
            <SavedRestaurants
              restaurants={savedRestaurants}
              onNavigate={handleNavigate}
              onRemove={handleSave}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="h-full bg-gray-50 flex items-center justify-center text-gray-600">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
              <h2 className="text-xl mb-2">Trang cá nhân</h2>
              <p className="text-sm">Chức năng đang phát triển</p>
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <p>· Điểm tích lũy: 850</p>
                <p>· Badges: 5</p>
                <p>· Check-ins: 23</p>
                <p>· Bộ ảnh: 12</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Check-in modal */}
      {checkInRestaurant && (
        <CheckInModal
          restaurant={checkInRestaurant}
          activeProgress={userProgress.filter(p => !p.completed)}
          onClose={() => setCheckInRestaurant(null)}
          onConfirm={handleConfirmCheckIn}
        />
      )}

      {/* Challenge modal */}
      {showChallengeModal && (
        <ChallengeModal
          onClose={() => setShowChallengeModal(false)}
          onStartChallenge={handleStartChallenge}
          activeProgress={userProgress.filter(p => !p.completed)}
        />
      )}

      {/* Completion modal */}
      {completedChallengeData && (
        <CompletionModal
          challenge={completedChallengeData}
          onClose={() => setCompletedChallenge(null)}
          onShare={handleShareCompletion}
          onViewMore={() => {
            setCompletedChallenge(null);
            setShowChallengeModal(true);
          }}
        />
      )}
    </div>
  );
}

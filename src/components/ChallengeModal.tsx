import { X, Trophy, Users, Clock, ChevronRight } from 'lucide-react';
import { Challenge, UserChallengeProgress } from '../types';
import { mockChallenges, mockUserProgress } from '../data/mockData';
import { useState } from 'react';

interface ChallengeModalProps {
  onClose: () => void;
  onStartChallenge: (challengeId: string) => void;
  activeProgress: UserChallengeProgress[];
}

export function ChallengeModal({ onClose, onStartChallenge, activeProgress }: ChallengeModalProps) {
  const [selectedTab, setSelectedTab] = useState<'active' | 'available'>('active');

  const activeChallengeIds = activeProgress.map(p => p.challengeId);
  const activeChallenges = mockChallenges.filter(c => activeChallengeIds.includes(c.id));
  const availableChallenges = mockChallenges.filter(c => !activeChallengeIds.includes(c.id));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2>🎯 Challenges</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('active')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                selectedTab === 'active'
                  ? 'bg-white text-orange-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Đang tham gia ({activeProgress.length})
            </button>
            <button
              onClick={() => setSelectedTab('available')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                selectedTab === 'available'
                  ? 'bg-white text-orange-500'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Khám phá ({availableChallenges.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedTab === 'active' && (
            <>
              {activeProgress.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Trophy className="size-12 mx-auto mb-3 text-gray-300" />
                  <p>Bạn chưa tham gia challenge nào</p>
                  <p className="text-sm mt-1">Chuyển sang tab "Khám phá" để bắt đầu!</p>
                </div>
              ) : (
                activeChallenges.map(challenge => {
                  const progress = activeProgress.find(p => p.challengeId === challenge.id);
                  if (!progress) return null;

                  const percentage = (progress.progress / progress.target) * 100;

                  return (
                    <div key={challenge.id} className="border-2 border-orange-200 bg-orange-50 rounded-2xl overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="text-3xl">{challenge.icon}</span>
                          <div className="flex-1">
                            <h3 className="text-lg mb-1">{challenge.title}</h3>
                            <p className="text-sm text-gray-600">{challenge.description}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-700">Tiến độ</span>
                            <span className="text-orange-600">
                              {progress.progress}/{progress.target}
                              {progress.daysRemaining && ` · Còn ${progress.daysRemaining} ngày`}
                            </span>
                          </div>
                          <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-pink-500 h-full rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-orange-200 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Trophy className="size-4" />
                            <span>+{challenge.rewards.points} điểm</span>
                          </div>
                          {challenge.rewards.badge && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <span>🏆</span>
                              <span>{challenge.rewards.badge}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {selectedTab === 'available' && (
            <>
              {availableChallenges.map(challenge => (
                <div key={challenge.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-300 transition-colors">
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={challenge.coverImage}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{challenge.icon}</span>
                        <h3 className="text-white">{challenge.title}</h3>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                      {challenge.category === 'discovery' && '🔍 Khám phá'}
                      {challenge.category === 'collection' && '🏆 Bộ sưu tập'}
                      {challenge.category === 'social' && '👥 Cộng đồng'}
                      {challenge.category === 'event' && '⏰ Sự kiện'}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="size-3.5" />
                        <span>{challenge.totalParticipants.toLocaleString()} người</span>
                      </div>
                      {challenge.durationDays && (
                        <div className="flex items-center gap-1">
                          <Clock className="size-3.5" />
                          <span>{challenge.durationDays} ngày</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Trophy className="size-3.5" />
                        <span>+{challenge.rewards.points} điểm</span>
                      </div>
                    </div>

                    {challenge.rewards.badge && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-purple-900">
                          <span>🏆</span>
                          <span>Badge: {challenge.rewards.badge}</span>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => onStartChallenge(challenge.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Tham gia Challenge</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

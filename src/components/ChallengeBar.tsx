import { UserChallengeProgress } from '../types';
import { mockChallenges } from '../data/mockData';

interface ChallengeBarProps {
  progress: UserChallengeProgress[];
  onClick: () => void;
}

export function ChallengeBar({ progress, onClick }: ChallengeBarProps) {
  if (progress.length === 0) return null;

  const activeChallenge = progress[0];
  const challenge = mockChallenges.find(c => c.id === activeChallenge.challengeId);

  if (!challenge) return null;

  const percentage = (activeChallenge.progress / activeChallenge.target) * 100;

  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 shadow-lg"
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-lg">{challenge.icon}</span>
          <span className="text-sm">{challenge.title}</span>
        </div>
        <div className="text-xs opacity-90">
          {activeChallenge.progress}/{activeChallenge.target}
          {activeChallenge.daysRemaining && ` · Còn ${activeChallenge.daysRemaining} ngày`}
        </div>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
        <div
          className="bg-white h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </button>
  );
}

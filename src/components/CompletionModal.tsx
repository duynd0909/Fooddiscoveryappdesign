import { Trophy, Share2, ArrowRight } from 'lucide-react';
import { Challenge } from '../types';

interface CompletionModalProps {
  challenge: Challenge;
  onClose: () => void;
  onShare: () => void;
  onViewMore: () => void;
}

export function CompletionModal({ challenge, onClose, onShare, onViewMore }: CompletionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
        {/* Celebration header */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 text-white p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative z-10">
            <div className="text-6xl mb-3 animate-bounce">🎉</div>
            <h2 className="text-2xl mb-2">CHÚC MỪNG!</h2>
            <p className="text-white/90">Bạn đã hoàn thành challenge</p>
          </div>
        </div>

        {/* Challenge info */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <span className="text-5xl inline-block mb-3">{challenge.icon}</span>
            <h3 className="text-xl mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-600">{challenge.description}</p>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-4">
            <h4 className="text-sm text-purple-900 mb-3 text-center">Hành trình của bạn</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl text-purple-600 mb-1">{challenge.requirements[0].target}</div>
                <div className="text-xs text-gray-600">Quán đã ghé</div>
              </div>
              <div>
                <div className="text-2xl text-purple-600 mb-1">{challenge.durationDays || '∞'}</div>
                <div className="text-xs text-gray-600">Ngày hoàn thành</div>
              </div>
              <div>
                <div className="text-2xl text-purple-600 mb-1">{Math.round(challenge.completionRate * 100)}%</div>
                <div className="text-xs text-gray-600">Top hoàn thành</div>
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className="space-y-3">
            <h4 className="text-sm text-gray-700 text-center">Phần thưởng nhận được</h4>
            
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 flex items-center gap-3">
              <div className="bg-yellow-400 text-white p-3 rounded-full">
                <Trophy className="size-6" />
              </div>
              <div className="flex-1">
                <div className="text-yellow-900">Điểm thưởng</div>
                <div className="text-2xl text-yellow-600">+{challenge.rewards.points}</div>
              </div>
            </div>

            {challenge.rewards.badge && (
              <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-purple-400 text-white p-3 rounded-full text-2xl">
                  🏆
                </div>
                <div className="flex-1">
                  <div className="text-purple-900">Badge mới</div>
                  <div className="text-lg text-purple-600">{challenge.rewards.badge}</div>
                </div>
              </div>
            )}

            {challenge.rewards.voucher && (
              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-center gap-3">
                <div className="bg-green-400 text-white p-3 rounded-full text-2xl">
                  🎁
                </div>
                <div className="flex-1">
                  <div className="text-green-900">Voucher</div>
                  <div className="text-sm text-green-600">{challenge.rewards.voucher}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={onShare}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="size-5" />
            <span>Chia sẻ thành tích</span>
          </button>
          
          <button
            onClick={onViewMore}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Xem challenge mới</span>
            <ArrowRight className="size-5" />
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

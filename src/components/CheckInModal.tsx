import { X, Camera, MapPin, Check } from 'lucide-react';
import { Restaurant, UserChallengeProgress } from '../types';
import { mockChallenges } from '../data/mockData';
import { useState } from 'react';

interface CheckInModalProps {
  restaurant: Restaurant;
  activeProgress: UserChallengeProgress[];
  onClose: () => void;
  onConfirm: (withPhoto: boolean) => void;
}

export function CheckInModal({
  restaurant,
  activeProgress,
  onClose,
  onConfirm
}: CheckInModalProps) {
  const [withPhoto, setWithPhoto] = useState(false);

  // Find challenges that will be affected
  const affectedChallenges = activeProgress.filter(progress => {
    const challenge = mockChallenges.find(c => c.id === progress.challengeId);
    if (!challenge) return false;

    const req = challenge.requirements[0];
    
    // Check if already visited
    if (progress.visitedRestaurants?.includes(restaurant.id)) {
      return false;
    }

    // Check if matches cuisine type
    if (req.conditions?.cuisineTypes?.includes(restaurant.cuisineType)) {
      return true;
    }

    // Check if counts for district challenge
    if (req.type === 'visit_districts' && !progress.visitedDistricts?.includes(restaurant.location.district)) {
      return true;
    }

    return false;
  });

  const handleCheckIn = () => {
    onConfirm(withPhoto);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h3>Check-in tại {restaurant.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Location verification */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-700">
              <Check className="size-5" />
              <span>Đã xác minh vị trí</span>
              <span className="text-sm text-green-600 ml-auto">({restaurant.distance * 1000}m)</span>
            </div>
          </div>

          {/* Photo option */}
          <button
            onClick={() => setWithPhoto(!withPhoto)}
            className={`w-full border-2 rounded-xl p-4 transition-all ${
              withPhoto
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${withPhoto ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
                <Camera className="size-5" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className={withPhoto ? 'text-blue-900' : 'text-gray-900'}>Thêm ảnh (tùy chọn)</span>
                  {withPhoto && <Check className="size-4 text-blue-500" />}
                </div>
                <p className="text-sm text-gray-600">+50 điểm bonus khi thêm ảnh</p>
              </div>
            </div>
          </button>

          {/* Challenge progress */}
          {affectedChallenges.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-3">
              <h4 className="text-sm text-orange-900">Tiến độ Challenge</h4>
              {affectedChallenges.map(progress => {
                const challenge = mockChallenges.find(c => c.id === progress.challengeId);
                if (!challenge) return null;

                const newProgress = progress.progress + 1;
                const isCompleting = newProgress === progress.target;

                return (
                  <div key={progress.challengeId} className="flex items-center gap-3">
                    <span className="text-xl">{challenge.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-900">{challenge.title}</span>
                        <span className="text-xs text-gray-600">
                          {newProgress}/{progress.target}
                        </span>
                      </div>
                      <div className="w-full bg-orange-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-orange-500 h-full rounded-full transition-all"
                          style={{ width: `${(newProgress / progress.target) * 100}%` }}
                        />
                      </div>
                      {isCompleting && (
                        <p className="text-xs text-orange-700 mt-1">🎉 Sắp hoàn thành!</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Restaurant info summary */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex gap-3">
              <img
                src={restaurant.images[0]?.url}
                alt={restaurant.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-sm mb-1">{restaurant.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{restaurant.tagline}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="size-3" />
                  <span>{restaurant.location.district}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Points earned */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
            <div className="text-center">
              <p className="text-sm text-purple-900 mb-1">Điểm nhận được</p>
              <p className="text-2xl text-purple-600">
                +{withPhoto ? 70 : 30} điểm
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {withPhoto ? 'Check-in + Ảnh chất lượng cao' : 'Check-in với xác minh vị trí'}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleCheckIn}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl hover:from-orange-600 hover:to-pink-600 transition-colors"
          >
            {withPhoto ? '📸 Check-in + Ảnh' : '✓ Check-in'}
          </button>
        </div>
      </div>
    </div>
  );
}

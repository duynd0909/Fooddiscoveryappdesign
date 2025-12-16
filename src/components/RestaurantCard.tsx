import { Restaurant, UserChallengeProgress } from '../types';
import { Heart, MapPin, Navigation, Share2, Star } from 'lucide-react';
import { useState } from 'react';
import { mockChallenges } from '../data/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  activeProgress: UserChallengeProgress[];
  onSave: (id: string) => void;
  onNavigate: (id: string) => void;
  onCheckIn: (id: string) => void;
  isSaved: boolean;
}

export function RestaurantCard({
  restaurant,
  activeProgress,
  onSave,
  onNavigate,
  onCheckIn,
  isSaved
}: RestaurantCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find matching challenges
  const matchingChallenges = activeProgress.filter(progress => {
    const challenge = mockChallenges.find(c => c.id === progress.challengeId);
    if (!challenge) return false;

    const req = challenge.requirements[0];
    if (req.conditions?.cuisineTypes?.includes(restaurant.cuisineType)) {
      return !progress.visitedRestaurants?.includes(restaurant.id);
    }
    return false;
  });

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (direction === 'right' && currentImageIndex < restaurant.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-black">
      {/* Image Gallery */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={restaurant.images[currentImageIndex]?.url}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

        {/* Image navigation dots */}
        {restaurant.images.length > 1 && (
          <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 px-4">
            {restaurant.images.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 flex-1 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Swipe handlers (invisible touch areas) */}
        {restaurant.images.length > 1 && (
          <>
            <button
              onClick={() => handleSwipe('left')}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
              aria-label="Previous image"
            />
            <button
              onClick={() => handleSwipe('right')}
              className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
              aria-label="Next image"
            />
          </>
        )}

        {/* Challenge badge */}
        {matchingChallenges.length > 0 && (
          <div className="absolute top-16 left-4 right-4">
            <div className="bg-orange-500 text-white px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg">
              <span className="text-sm">🎯</span>
              <span className="text-xs">
                Phù hợp challenge của bạn!
              </span>
            </div>
          </div>
        )}

        {/* Social proof */}
        <div className="absolute top-16 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs">
          🔥 1.2K người đã lưu
        </div>

        {/* Action buttons - vertical on right side */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-3">
          {/* Save button */}
          <button
            onClick={() => onSave(restaurant.id)}
            className={`p-3 rounded-full shadow-lg transition-colors backdrop-blur-sm ${
              isSaved ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'
            }`}
            aria-label={isSaved ? 'Đã lưu' : 'Lưu'}
          >
            <Heart className={`size-6 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Navigate button */}
          <button
            onClick={() => onNavigate(restaurant.id)}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors backdrop-blur-sm"
            aria-label="Chỉ đường"
          >
            <Navigation className="size-6" />
          </button>

          {/* Check-in button */}
          <button
            onClick={() => onCheckIn(restaurant.id)}
            className="p-3 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-lg transition-colors backdrop-blur-sm"
            aria-label="Check-in"
          >
            <span className="text-xl">✓</span>
          </button>

          {/* Share button */}
          <button
            className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-colors backdrop-blur-sm"
            aria-label="Chia sẻ"
          >
            <Share2 className="size-6" />
          </button>
        </div>
      </div>

      {/* Restaurant info */}
      <div className="absolute bottom-0 left-0 right-20 p-4 text-white">
        {/* Name and rating */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h2 className="mb-1">{restaurant.name}</h2>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                <span>{restaurant.distance}km</span>
              </div>
              <span>{restaurant.priceRange}</span>
              <span>·</span>
              <span>{restaurant.cuisineType}</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-white/90 mb-3">{restaurant.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {restaurant.bestFor?.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs text-white/90"
            >
              {tag}
            </span>
          ))}
          {restaurant.isOpen && (
            <span className="px-2.5 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-xs">
              Đang mở cửa
            </span>
          )}
          {restaurant.crowdLevel === 'high' && (
            <span className="px-2.5 py-1 bg-orange-500/80 backdrop-blur-sm rounded-full text-xs">
              Đông khách
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
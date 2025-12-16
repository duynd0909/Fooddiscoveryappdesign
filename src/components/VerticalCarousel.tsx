import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Restaurant, UserChallengeProgress } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface VerticalCarouselProps {
  restaurants: Restaurant[];
  activeProgress: UserChallengeProgress[];
  onSave: (id: string) => void;
  onNavigate: (id: string) => void;
  onCheckIn: (id: string) => void;
  savedRestaurants: Set<string>;
}

export function VerticalCarousel({
  restaurants,
  activeProgress,
  onSave,
  onNavigate,
  onCheckIn,
  savedRestaurants
}: VerticalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (_: any, info: { offset: { y: number }; velocity: { y: number } }) => {
    const threshold = 100;
    const velocity = info.velocity.y;

    if (info.offset.y > threshold || velocity > 500) {
      // Swipe down - previous restaurant
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else if (info.offset.y < -threshold || velocity < -500) {
      // Swipe up - next restaurant
      if (currentIndex < restaurants.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    // Reset position
    animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
  };

  const opacity = useTransform(y, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = useTransform(y, [-200, 0, 200], [0.9, 1, 0.9]);

  useEffect(() => {
    y.set(0);
  }, [currentIndex, y]);

  if (restaurants.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <p>Không tìm thấy nhà hàng nào</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Current card */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ y, opacity, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <RestaurantCard
          restaurant={restaurants[currentIndex]}
          activeProgress={activeProgress}
          onSave={onSave}
          onNavigate={onNavigate}
          onCheckIn={onCheckIn}
          isSaved={savedRestaurants.has(restaurants[currentIndex].id)}
        />
      </motion.div>

      {/* Next card preview (slightly visible below) */}
      {currentIndex < restaurants.length - 1 && (
        <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateY(100%)' }}>
          <div className="w-full h-full opacity-30">
            <img
              src={restaurants[currentIndex + 1].images[0]?.url}
              alt={restaurants[currentIndex + 1].name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm z-20">
        {currentIndex + 1} / {restaurants.length}
      </div>
    </div>
  );
}

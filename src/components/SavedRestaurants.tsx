import { Restaurant } from '../types';
import { Heart, MapPin, Star, Navigation } from 'lucide-react';

interface SavedRestaurantsProps {
  restaurants: Restaurant[];
  onNavigate: (id: string) => void;
  onRemove: (id: string) => void;
}

export function SavedRestaurants({ restaurants, onNavigate, onRemove }: SavedRestaurantsProps) {
  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
        <Heart className="size-16 mb-4 text-gray-300" />
        <h3 className="text-lg mb-2">Chưa có quán đã lưu</h3>
        <p className="text-sm text-center">
          Khi lướt carousel, nhấn vào icon trái tim để lưu các quán yêu thích
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 pb-20">
      <div className="mb-4">
        <h2 className="text-xl mb-1">Quán đã lưu</h2>
        <p className="text-sm text-gray-600">{restaurants.length} nhà hàng</p>
      </div>

      {restaurants.map(restaurant => (
        <div
          key={restaurant.id}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex gap-3 p-3">
            <img
              src={restaurant.images[0]?.url}
              alt={restaurant.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm mb-1 truncate">{restaurant.name}</h3>
              
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="size-3 fill-yellow-400 text-yellow-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  <span>{restaurant.distance}km</span>
                </div>
                <span>·</span>
                <span>{restaurant.priceRange}</span>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {restaurant.tagline}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate(restaurant.id)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors"
                >
                  <Navigation className="size-3" />
                  <span>Chỉ đường</span>
                </button>
                
                <button
                  onClick={() => onRemove(restaurant.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 text-xs py-2 px-3 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Heart className="size-3 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

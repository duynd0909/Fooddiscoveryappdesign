export interface Restaurant {
  id: string;
  name: string;
  nameEn?: string;
  rating: number;
  distance: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  cuisineType: string;
  tagline: string;
  images: RestaurantImage[];
  location: {
    district: string;
    coordinates: { lat: number; lng: number };
  };
  isOpen: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
  bestFor?: string[];
  tags: string[];
}

export interface RestaurantImage {
  id: string;
  url: string;
  source: 'official' | 'ugc';
  collectionId?: string;
  aspectRatio: string;
}

export interface ImageCollection {
  id: string;
  restaurantId: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    isVerified: boolean;
    totalContributions: number;
  };
  visitDate: string;
  timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner' | 'late-night';
  images: CollectionImage[];
  caption: string;
  rating: {
    overall: number;
    food: number;
    service: number;
    ambiance: number;
  };
  verified: boolean;
  helpfulCount: number;
  totalSpent?: number;
}

export interface CollectionImage {
  id: string;
  url: string;
  type: 'food' | 'drink' | 'interior' | 'exterior' | 'menu';
  dishName?: string;
  dishPrice?: number;
  caption?: string;
  isCover: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  icon: string;
  coverImage: string;
  category: 'discovery' | 'collection' | 'social' | 'event' | 'personal';
  type: 'unlimited' | 'fixed' | 'relative';
  durationDays?: number;
  startDate?: string;
  endDate?: string;
  requirements: ChallengeRequirement[];
  rewards: {
    points: number;
    badge?: string;
    voucher?: string;
  };
  totalParticipants: number;
  completionRate: number;
}

export interface ChallengeRequirement {
  type: 'visit_restaurants' | 'visit_unique_cuisines' | 'visit_districts' | 'post_collections' | 'consecutive_days';
  target: number;
  conditions?: {
    cuisineTypes?: string[];
    districts?: string[];
    priceRange?: string[];
    requirePhoto?: boolean;
    requireVerifiedLocation?: boolean;
  };
}

export interface UserChallengeProgress {
  challengeId: string;
  progress: number;
  target: number;
  startedAt: string;
  daysRemaining?: number;
  completed: boolean;
  visitedRestaurants?: string[];
  visitedDistricts?: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
}

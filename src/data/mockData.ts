import { Restaurant, Challenge, UserChallengeProgress, Badge } from '../types';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Phở Thìn Bờ Hồ',
    nameEn: 'Pho Thin Bo Ho',
    rating: 4.8,
    distance: 0.5,
    priceRange: '$',
    cuisineType: 'Phở',
    tagline: 'Phở bò xào đặc sản từ 1979',
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwYm93bHxlbnwxfHx8fDE3NjU4OTcyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      },
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NjU4OTcyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'ugc',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Hoàn Kiếm',
      coordinates: { lat: 21.0285, lng: 105.8542 }
    },
    isOpen: true,
    crowdLevel: 'high',
    bestFor: ['Bữa sáng', 'Ăn nhanh'],
    tags: ['phở', 'quán nổi tiếng', 'vỉa hè']
  },
  {
    id: '2',
    name: 'Bánh Mì 25 Nguyễn Trãi',
    nameEn: 'Banh Mi 25',
    rating: 4.7,
    distance: 1.2,
    priceRange: '$',
    cuisineType: 'Bánh mì',
    tagline: 'Bánh mì pate đặc biệt, crispy và đầy nhân',
    images: [
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5oJTIwbWklMjBzYW5kd2ljaHxlbnwxfHx8fDE3NjU3ODgxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Quận 1',
      coordinates: { lat: 10.7629, lng: 106.6824 }
    },
    isOpen: true,
    crowdLevel: 'medium',
    bestFor: ['Bữa sáng', 'Ăn vặt'],
    tags: ['bánh mì', 'street food', 'must-try']
  },
  {
    id: '3',
    name: 'Bún Chả Hương Liên',
    nameEn: 'Bun Cha Huong Lien',
    rating: 4.6,
    distance: 0.8,
    priceRange: '$$',
    cuisineType: 'Bún chả',
    tagline: 'Nổi tiếng với chuyến thăm của Obama',
    images: [
      {
        id: 'img4',
        url: 'https://images.unsplash.com/photo-1763703544688-2ac7839b0659?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwYnVuJTIwY2hhfGVufDF8fHx8MTc2NTg5NzI0OHww&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Hai Bà Trưng',
      coordinates: { lat: 21.0157, lng: 105.8465 }
    },
    isOpen: true,
    crowdLevel: 'high',
    bestFor: ['Bữa trưa', 'Du lịch'],
    tags: ['bún chả', 'nổi tiếng', 'obama']
  },
  {
    id: '4',
    name: 'Cà Phê Giảng',
    nameEn: 'Cafe Giang',
    rating: 4.9,
    distance: 0.3,
    priceRange: '$',
    cuisineType: 'Cà phê',
    tagline: 'Cà phê trứng nguyên bản từ 1946',
    images: [
      {
        id: 'img5',
        url: 'https://images.unsplash.com/photo-1471922597728-92f81bfe2445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwY29mZmVlfGVufDF8fHx8MTc2NTg3Njc2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Hoàn Kiếm',
      coordinates: { lat: 21.0345, lng: 105.8523 }
    },
    isOpen: true,
    crowdLevel: 'medium',
    bestFor: ['Buổi chiều', 'Hẹn hò'],
    tags: ['cà phê', 'đặc sản', 'hidden gem']
  },
  {
    id: '5',
    name: 'Cơm Tấm Mộc',
    nameEn: 'Com Tam Moc',
    rating: 4.5,
    distance: 2.1,
    priceRange: '$',
    cuisineType: 'Cơm tấm',
    tagline: 'Cơm tấm sườn nướng đậm đà Nam Bộ',
    images: [
      {
        id: 'img6',
        url: 'https://images.unsplash.com/photo-1505216980056-a7b7b1c6e000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb20lMjB0YW0lMjByaWNlfGVufDF8fHx8MTc2NTg5NzI0OXww&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Quận 3',
      coordinates: { lat: 10.7756, lng: 106.6917 }
    },
    isOpen: true,
    crowdLevel: 'low',
    bestFor: ['Bữa tối', 'Gia đình'],
    tags: ['cơm tấm', 'sài gòn', 'phổ biến']
  },
  {
    id: '6',
    name: 'Gỏi Cuốn Sài Gòn',
    nameEn: 'Saigon Spring Rolls',
    rating: 4.4,
    distance: 1.5,
    priceRange: '$$',
    cuisineType: 'Gỏi cuốn',
    tagline: 'Gỏi cuốn tươi ngon với nước chấm đặc biệt',
    images: [
      {
        id: 'img7',
        url: 'https://images.unsplash.com/photo-1656945843375-207bb6e47750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3ByaW5nJTIwcm9sbHN8ZW58MXx8fHwxNzY1Nzg4MTgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Quận 1',
      coordinates: { lat: 10.7698, lng: 106.6957 }
    },
    isOpen: true,
    crowdLevel: 'medium',
    bestFor: ['Ăn nhẹ', 'Lành mạnh'],
    tags: ['gỏi cuốn', 'healthy', 'instagrammable']
  },
  {
    id: '7',
    name: 'Quán Ăn Việt',
    nameEn: 'Vietnamese Restaurant',
    rating: 4.3,
    distance: 3.0,
    priceRange: '$$',
    cuisineType: 'Đa dạng',
    tagline: 'Khám phá ẩm thực Việt Nam truyền thống',
    images: [
      {
        id: 'img8',
        url: 'https://images.unsplash.com/photo-1672305330907-8092be9161ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU4OTcyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        source: 'official',
        aspectRatio: '9:16'
      }
    ],
    location: {
      district: 'Ba Đình',
      coordinates: { lat: 21.0333, lng: 105.8189 }
    },
    isOpen: true,
    crowdLevel: 'low',
    bestFor: ['Gia đình', 'Du khách'],
    tags: ['đa dạng', 'truyền thống', 'cozy']
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Phở Hunter',
    titleEn: 'Pho Hunter',
    description: 'Thử 5 quán phở khác nhau trong 7 ngày',
    icon: '🍜',
    coverImage: 'https://images.unsplash.com/photo-1701480253822-1842236c9a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcGhvJTIwYm93bHxlbnwxfHx8fDE3NjU4OTcyNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'discovery',
    type: 'relative',
    durationDays: 7,
    requirements: [
      {
        type: 'visit_restaurants',
        target: 5,
        conditions: {
          cuisineTypes: ['Phở'],
          requirePhoto: true,
          requireVerifiedLocation: true
        }
      }
    ],
    rewards: {
      points: 200,
      badge: 'Phở Master',
      voucher: 'Giảm 20% quán phở đối tác'
    },
    totalParticipants: 2847,
    completionRate: 0.68
  },
  {
    id: 'c2',
    title: 'Bánh Mì Explorer',
    titleEn: 'Banh Mi Explorer',
    description: 'Khám phá 3 tiệm bánh mì trong 5 ngày',
    icon: '🥖',
    coverImage: 'https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5oJTIwbWklMjBzYW5kd2ljaHxlbnwxfHx8fDE3NjU3ODgxODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'discovery',
    type: 'relative',
    durationDays: 5,
    requirements: [
      {
        type: 'visit_restaurants',
        target: 3,
        conditions: {
          cuisineTypes: ['Bánh mì'],
          requirePhoto: false,
          requireVerifiedLocation: true
        }
      }
    ],
    rewards: {
      points: 150,
      badge: 'Bánh Mì Lover'
    },
    totalParticipants: 1523,
    completionRate: 0.75
  },
  {
    id: 'c3',
    title: 'District Hopper',
    titleEn: 'District Hopper',
    description: 'Ăn ở 4 quận khác nhau trong tuần này',
    icon: '🗺️',
    coverImage: 'https://images.unsplash.com/photo-1672305330907-8092be9161ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU4OTcyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'discovery',
    type: 'relative',
    durationDays: 7,
    requirements: [
      {
        type: 'visit_districts',
        target: 4,
        conditions: {
          requireVerifiedLocation: true
        }
      }
    ],
    rewards: {
      points: 300,
      badge: 'District Explorer'
    },
    totalParticipants: 892,
    completionRate: 0.52
  },
  {
    id: 'c4',
    title: 'Ẩm thực Hà Nội',
    titleEn: 'Hanoi Cuisine Collection',
    description: 'Hoàn thành bộ sưu tập 10 món đặc sản Hà Nội',
    icon: '🏆',
    coverImage: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NjU4OTcyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'collection',
    type: 'unlimited',
    requirements: [
      {
        type: 'visit_unique_cuisines',
        target: 10,
        conditions: {
          cuisineTypes: ['Phở', 'Bún chả', 'Bánh cuốn', 'Chả cá', 'Bún đậu mắm tôm', 'Bún ốc', 'Cà phê', 'Nem rán', 'Xôi', 'Bánh mì pate'],
          requirePhoto: true
        }
      }
    ],
    rewards: {
      points: 500,
      badge: 'Hanoi Expert',
      voucher: 'Voucher 100k'
    },
    totalParticipants: 3421,
    completionRate: 0.34
  },
  {
    id: 'c5',
    title: 'Street Food Hero',
    titleEn: 'Street Food Hero',
    description: 'Thử 10 quán vỉa hè trong 14 ngày',
    icon: '🔥',
    coverImage: 'https://images.unsplash.com/photo-1687902409602-8b7cf039a44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwc3RyZWV0JTIwZm9vZHxlbnwxfHx8fDE3NjU4OTcyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'discovery',
    type: 'relative',
    durationDays: 14,
    requirements: [
      {
        type: 'visit_restaurants',
        target: 10,
        conditions: {
          priceRange: ['$'],
          requireVerifiedLocation: true
        }
      }
    ],
    rewards: {
      points: 500,
      badge: 'Street Food Hero'
    },
    totalParticipants: 4156,
    completionRate: 0.61
  }
];

export const mockUserProgress: UserChallengeProgress[] = [
  {
    challengeId: 'c1',
    progress: 3,
    target: 5,
    startedAt: '2024-12-14T10:00:00Z',
    daysRemaining: 4,
    completed: false,
    visitedRestaurants: ['1', '3', '7']
  },
  {
    challengeId: 'c3',
    progress: 2,
    target: 4,
    startedAt: '2024-12-13T08:00:00Z',
    daysRemaining: 5,
    completed: false,
    visitedDistricts: ['Hoàn Kiếm', 'Quận 1']
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'b1',
    name: 'First Bite',
    icon: '🥉',
    rarity: 'common',
    description: 'Check-in đầu tiên'
  },
  {
    id: 'b2',
    name: 'Phở Master',
    icon: '🍜',
    rarity: 'common',
    description: 'Hoàn thành Phở Hunter Challenge'
  },
  {
    id: 'b3',
    name: 'Street Food Hero',
    icon: '🔥',
    rarity: 'rare',
    description: 'Thử 50 quán vỉa hè'
  },
  {
    id: 'b4',
    name: 'District Explorer',
    icon: '🗺️',
    rarity: 'rare',
    description: 'Ăn ở 10 quận khác nhau'
  },
  {
    id: 'b5',
    name: 'Hanoi Expert',
    icon: '🏆',
    rarity: 'epic',
    description: 'Hoàn thành bộ sưu tập Ẩm thực Hà Nội'
  }
];

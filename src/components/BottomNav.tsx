import { Home, Search, Trophy, Heart, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'discover' | 'search' | 'challenges' | 'saved' | 'profile';
  onTabChange: (tab: 'discover' | 'search' | 'challenges' | 'saved' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'discover' as const, icon: Home, label: 'Khám phá' },
    { id: 'search' as const, icon: Search, label: 'Tìm kiếm' },
    { id: 'challenges' as const, icon: Trophy, label: 'Challenges' },
    { id: 'saved' as const, icon: Heart, label: 'Đã lưu' },
    { id: 'profile' as const, icon: User, label: 'Cá nhân' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-40">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className={`size-5 ${isActive ? 'fill-current' : ''}`} />
              <span className="text-xs">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

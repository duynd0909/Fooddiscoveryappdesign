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
    <div className="fixed bottom-0 left-0 right-0 z-40 pb-safe">
      <div className="relative mx-auto max-w-md">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]" />
        
        {/* Content */}
        <div className="relative flex items-center justify-around px-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200 group"
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                )}
                
                {/* Icon container */}
                <div className={`relative transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100 group-hover:scale-105'
                }`}>
                  {/* Background glow for active state */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-lg" />
                  )}
                  
                  <Icon 
                    className={`size-6 relative transition-all duration-200 ${
                      isActive 
                        ? 'text-orange-500' 
                        : 'text-gray-600 group-hover:text-gray-800'
                    } ${isActive ? 'fill-current' : ''}`} 
                  />
                </div>
                
                {/* Label */}
                <span className={`text-[10px] transition-all duration-200 ${
                  isActive 
                    ? 'text-orange-500' 
                    : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { APP_DATA, CATEGORIES, MAX_PINS } from './constants';
import AppCard from './components/AppCard';
import SearchBar from './components/SearchBar';
import { LayoutGrid, Globe } from 'lucide-react';

const App: React.FC = () => {
  // Load pins from localStorage or default to an empty array
  const [pinnedIds, setPinnedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('verrion_pinned');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist pins
  useEffect(() => {
    localStorage.setItem('verrion_pinned', JSON.stringify(pinnedIds));
  }, [pinnedIds]);

  const togglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pinId) => pinId !== id);
      } else {
        if (prev.length >= MAX_PINS) {
          // Optional: Could add a toast notification here
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Get pinned app objects
  const pinnedApps = pinnedIds
    .map((id) => APP_DATA.find((app) => app.id === id))
    .filter((app): app is typeof APP_DATA[0] => app !== undefined);

  return (
    <div className="min-h-screen bg-verrion-bg flex flex-col font-sans selection:bg-verrion-accent/30 selection:text-white">
      {/* Top Bar */}
      <header className="w-full px-8 py-6 flex justify-end gap-8 text-sm font-medium tracking-wide">
        <a 
          href="https://verrion.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-verrion-accent transition-colors"
        >
          <Globe size={16} />
          Website
        </a>
        <a 
          href="https://app.verrion.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-verrion-accent transition-colors"
        >
          <LayoutGrid size={16} />
          App
        </a>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Branding Section */}
        <section className="text-center pt-8 pb-10">
          <div className="flex justify-center mb-6">
            <img 
              src="https://res.cloudinary.com/interrzapweb/image/upload/v1762688725/logo-dark_accent_prwyij.png" 
              alt="VERRION Logo" 
              className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(113,150,244,0.3)]"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-3">
            VERRION
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-verrion-accent uppercase font-semibold opacity-90">
            Verity <span className="text-gray-600 mx-2">•</span> Veritas <span className="text-gray-600 mx-2">•</span> Veracity
          </p>
        </section>

        {/* Search */}
        <SearchBar />

        {/* Pinned Apps - Only show if there are pinned apps */}
        {pinnedApps.length > 0 && (
          <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-verrion-accent/20 to-transparent"></div>
              <h2 className="font-serif text-xl text-gray-300 italic">Quick Access</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-verrion-accent/20 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {pinnedApps.map((app) => (
                <AppCard
                  key={`pinned-${app.id}`}
                  app={app}
                  isPinned={true}
                  onTogglePin={togglePin}
                  variant="tile"
                />
              ))}
              {/* Placeholders to maintain grid structure if needed, or just let them flow */}
            </div>
          </section>
        )}

        {/* All Apps Grid */}
        <section className="space-y-12">
          {CATEGORIES.map((category) => {
            const categoryApps = APP_DATA.filter(app => app.category === category);
            if (categoryApps.length === 0) return null;

            return (
              <div key={category} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-end gap-3 mb-6 border-b border-[#1E293B] pb-3">
                  <h2 className="font-serif text-2xl text-white relative">
                    {category}
                    <span className="absolute -bottom-3.5 left-0 w-12 h-0.5 bg-verrion-accent"></span>
                  </h2>
                  <span className="text-xs font-sans text-gray-500 uppercase tracking-wider mb-1 ml-auto">
                    {categoryApps.length} Apps
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryApps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      isPinned={pinnedIds.includes(app.id)}
                      onTogglePin={togglePin}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Footer decoration */}
        <div className="mt-24 text-center">
          <div className="inline-block w-1 h-1 rounded-full bg-verrion-accent opacity-50 mx-1"></div>
          <div className="inline-block w-1 h-1 rounded-full bg-verrion-accent opacity-50 mx-1"></div>
          <div className="inline-block w-1 h-1 rounded-full bg-verrion-accent opacity-50 mx-1"></div>
        </div>
      </main>
    </div>
  );
};

export default App;
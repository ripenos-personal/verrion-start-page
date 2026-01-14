import React, { useState, useEffect } from 'react';
import { APP_DATA, CATEGORIES, MAX_PINS, ICON_MAP } from './constants';
import AppCard from './components/AppCard';
import SearchBar from './components/SearchBar';
import { LayoutGrid, Globe, Moon, Sun, Plus, X } from 'lucide-react';
import { AppLink, Category } from './types';

const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('verrion_theme');
    if (saved) return saved as 'dark' | 'light';
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Custom Apps state
  const [customApps, setCustomApps] = useState<AppLink[]>(() => {
    const saved = localStorage.getItem('verrion_custom_apps');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((app: any) => ({
        ...app,
        icon: app.icon // It will be a URL string now
      }));
    } catch (e) {
      return [];
    }
  });

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    url: '',
    category: Category.CORE
  });

  // Apply theme
  useEffect(() => {
    localStorage.setItem('verrion_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // Persist custom apps
  useEffect(() => {
    localStorage.setItem('verrion_custom_apps', JSON.stringify(customApps));
  }, [customApps]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const addCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApp.name || !newApp.url) return;

    const formattedUrl = newApp.url.startsWith('http') ? newApp.url : `https://${newApp.url}`;
    const domain = new URL(formattedUrl).hostname;
    
    const app: AppLink = {
      id: `custom-${Date.now()}`,
      name: newApp.name,
      url: formattedUrl,
      category: newApp.category,
      icon: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      isCustom: true
    };

    setCustomApps(prev => [...prev, app]);
    setIsModalOpen(false);
    setNewApp({
      name: '',
      url: '',
      category: Category.CORE
    });
  };

  const deleteCustomApp = (id: string) => {
    setCustomApps(prev => prev.filter(app => app.id !== id));
    setPinnedIds(prev => prev.filter(pinId => pinId !== id));
  };

  // Merge default apps with custom apps
  const allApps = [...APP_DATA, ...customApps];

  // Get pinned app objects
  const pinnedApps = pinnedIds
    .map((id) => allApps.find((app) => app.id === id))
    .filter((app): app is AppLink => app !== undefined);

  return (
    <div className="min-h-screen bg-verrion-bg flex flex-col font-sans selection:bg-verrion-accent/30 selection:text-verrion-text">
      {/* Top Bar */}
      <header className="w-full px-8 py-6 flex justify-end gap-8 text-sm font-medium tracking-wide">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-verrion-subtext hover:text-verrion-accent transition-colors"
          title="Add custom application"
        >
          <Plus size={18} />
          Add App
        </button>
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 text-verrion-subtext hover:text-verrion-accent transition-colors"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <a 
          href="https://verrion.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-verrion-subtext hover:text-verrion-accent transition-colors"
        >
          <Globe size={16} />
          Website
        </a>
        <a 
          href="https://app.verrion.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-verrion-subtext hover:text-verrion-accent transition-colors"
        >
          <LayoutGrid size={16} />
          VERRION App
        </a>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Branding Section */}
        <section className="text-center pt-8 pb-10">
          <div className="flex justify-center mb-6">
            <img 
              src={theme === 'dark' 
                ? "https://res.cloudinary.com/interrzapweb/image/upload/v1762688725/logo-dark_accent_prwyij.png" 
                : "https://res.cloudinary.com/interrzapweb/image/upload/v1762688725/logo-light_accent_udtxyn.png"
              } 
              alt="VERRION Logo" 
              className="h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(113,150,244,0.3)]"
            />
          </div>
          <h1 className="font-serif text-5xl md:text-6xl text-verrion-text tracking-tight mb-3">
            VERRION
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] text-verrion-accent uppercase font-semibold opacity-90">
            Verity <span className="text-verrion-subtext/40 mx-2">•</span> Veritas <span className="text-verrion-subtext/40 mx-2">•</span> Veracity
          </p>
        </section>

        {/* Search */}
        <SearchBar />

        {/* Pinned Apps - Only show if there are pinned apps */}
        {pinnedApps.length > 0 && (
          <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-verrion-accent/20 to-transparent"></div>
              <h2 className="font-serif text-xl text-verrion-subtext italic">Quick Access</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-verrion-accent/20 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {pinnedApps.map((app) => (
                <AppCard
                  key={`pinned-${app.id}`}
                  app={app}
                  isPinned={true}
                  onTogglePin={togglePin}
                  onDelete={app.isCustom ? () => deleteCustomApp(app.id) : undefined}
                  variant="tile"
                />
              ))}
            </div>
          </section>
        )}

        {/* All Apps Grid */}
        <section className="space-y-12">
          {CATEGORIES.map((category) => {
            const categoryApps = allApps.filter(app => app.category === category);
            if (categoryApps.length === 0) return null;

            return (
              <div key={category} className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex items-end gap-3 mb-6 border-b border-verrion-border pb-3">
                  <h2 className="font-serif text-2xl text-verrion-text relative">
                    {category}
                    <span className="absolute -bottom-3.5 left-0 w-12 h-0.5 bg-verrion-accent"></span>
                  </h2>
                  <span className="text-xs font-sans text-verrion-subtext uppercase tracking-wider mb-1 ml-auto">
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
                      onDelete={app.isCustom ? () => deleteCustomApp(app.id) : undefined}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Modal for adding app */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-md bg-verrion-container border border-verrion-border rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl text-verrion-text">Add Custom App</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-verrion-subtext hover:text-verrion-text transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={addCustomApp} className="space-y-5">
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-verrion-subtext mb-2 ml-1">App Name</label>
                  <input
                    type="text"
                    required
                    value={newApp.name}
                    onChange={e => setNewApp(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. My Portfolio"
                    className="w-full px-4 py-3 bg-verrion-bg border border-verrion-border rounded-xl text-verrion-text focus:outline-none focus:border-verrion-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans uppercase tracking-wider text-verrion-subtext mb-2 ml-1">URL</label>
                  <input
                    type="text"
                    required
                    value={newApp.url}
                    onChange={e => setNewApp(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="e.g. example.com"
                    className="w-full px-4 py-3 bg-verrion-bg border border-verrion-border rounded-xl text-verrion-text focus:outline-none focus:border-verrion-accent transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1">
                  <div>
                    <label className="block text-xs font-sans uppercase tracking-wider text-verrion-subtext mb-2 ml-1">Category</label>
                    <select
                      value={newApp.category}
                      onChange={e => setNewApp(prev => ({ ...prev, category: e.target.value as Category }))}
                      className="w-full px-4 py-3 bg-verrion-bg border border-verrion-border rounded-xl text-verrion-text focus:outline-none focus:border-verrion-accent transition-colors appearance-none cursor-pointer"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-verrion-accent text-white font-sans font-bold rounded-xl hover:bg-verrion-accent/90 transition-all shadow-lg shadow-verrion-accent/20 active:scale-[0.98]"
                >
                  Add Application
                </button>
              </form>
            </div>
          </div>
        )}

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

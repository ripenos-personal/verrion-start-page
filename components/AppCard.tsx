import React from 'react';
import { AppLink } from '../types';
import { Pin, ExternalLink } from 'lucide-react';

interface AppCardProps {
  app: AppLink;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  variant?: 'grid' | 'tile';
}

const AppCard: React.FC<AppCardProps> = ({ app, isPinned, onTogglePin, variant = 'grid' }) => {
  const Icon = app.icon;

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(app.id);
  };

  // Helper to strip protocol for cleaner display
  const displayUrl = app.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const Tooltip = () => (
    <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300 pointer-events-none z-20 w-max max-w-[200px]">
      <div className="bg-[#000A14] border border-verrion-accent/20 text-[10px] tracking-wider font-sans text-verrion-muted px-3 py-1.5 rounded-md shadow-2xl truncate">
        {displayUrl}
      </div>
      <div className="w-1.5 h-1.5 bg-[#000A14] border-r border-b border-verrion-accent/20 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-0.5"></div>
    </div>
  );

  if (variant === 'tile') {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col items-center justify-center p-6 bg-verrion-container border border-[#1E293B] hover:border-verrion-accent/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(113,150,244,0.1)] hover:-translate-y-1 h-32"
      >
        <Tooltip />
        <button
          onClick={handlePinClick}
          className="absolute top-2 right-2 p-1.5 text-verrion-muted hover:text-verrion-accent opacity-0 group-hover:opacity-100 transition-opacity"
          title="Unpin"
        >
          <Pin size={14} className="fill-verrion-accent text-verrion-accent" />
        </button>
        <Icon size={32} className="mb-3 text-verrion-accent group-hover:scale-110 transition-transform duration-300" />
        <span className="font-sans font-medium text-sm text-gray-300 group-hover:text-white">{app.name}</span>
      </a>
    );
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center p-4 bg-verrion-container border border-[#1E293B] hover:border-verrion-accent/30 rounded-lg transition-all duration-300 hover:bg-[#081829]"
    >
      <Tooltip />
      <div className="p-3 rounded-md bg-[#000A14] border border-[#1E293B] group-hover:border-verrion-accent/50 transition-colors">
        <Icon size={24} className="text-gray-400 group-hover:text-verrion-accent transition-colors" />
      </div>
      
      <div className="ml-4 flex-1 overflow-hidden">
        <h3 className="font-sans font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
          {app.name}
        </h3>
        <p className="font-sans text-xs text-verrion-muted mt-0.5">
          {app.category}
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
        <button
          onClick={handlePinClick}
          className={`p-1.5 rounded-full hover:bg-white/5 transition-colors ${isPinned ? 'text-verrion-accent' : 'text-gray-500 hover:text-gray-300'}`}
          title={isPinned ? "Unpin" : "Pin to top"}
        >
          <Pin size={16} className={isPinned ? "fill-verrion-accent" : ""} />
        </button>
        <ExternalLink size={16} className="text-gray-500" />
      </div>
    </a>
  );
};

export default AppCard;
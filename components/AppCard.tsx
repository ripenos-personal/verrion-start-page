import React from 'react';
import { AppLink } from '../types';
import { Pin, ExternalLink, Trash2 } from 'lucide-react';

interface AppCardProps {
  app: AppLink;
  isPinned: boolean;
  onTogglePin: (id: string) => void;
  onDelete?: () => void;
  variant?: 'grid' | 'tile';
}

const AppCard: React.FC<AppCardProps> = ({ app, isPinned, onTogglePin, onDelete, variant = 'grid' }) => {
  const renderIcon = (size: number, className?: string) => {
    if (typeof app.icon === 'string') {
      return (
        <img 
          src={app.icon} 
          alt={app.name} 
          className={`${className} object-contain rounded-sm`} 
          style={{ width: size, height: size }}
          onError={(e) => {
            // Fallback if favicon fails
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=7196F4&color=fff`;
          }}
        />
      );
    }
    const Icon = app.icon;
    return <Icon size={size} className={className} />;
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTogglePin(app.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  // Helper to strip protocol for cleaner display
  const displayUrl = app.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const Tooltip = () => (
    <div className="absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300 pointer-events-none z-20 w-max max-w-[200px]">
      <div className="bg-verrion-bg border border-verrion-accent/20 text-[10px] tracking-wider font-sans text-verrion-muted px-3 py-1.5 rounded-md shadow-2xl truncate">
        {displayUrl}
      </div>
      <div className="w-1.5 h-1.5 bg-verrion-bg border-r border-b border-verrion-accent/20 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-0.5"></div>
    </div>
  );

  if (variant === 'tile') {
    return (
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col items-center justify-center p-6 bg-verrion-container border border-verrion-border hover:border-verrion-accent/50 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(113,150,244,0.1)] hover:-translate-y-1 h-32"
      >
        <Tooltip />
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="p-1.5 text-verrion-muted hover:text-red-400 transition-colors"
              title="Delete app"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button
            onClick={handlePinClick}
            className="p-1.5 text-verrion-muted hover:text-verrion-accent transition-colors"
            title="Unpin"
          >
            <Pin size={14} className="fill-verrion-accent text-verrion-accent" />
          </button>
        </div>
        <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
          {renderIcon(32, "text-verrion-accent")}
        </div>
        <span className="font-sans font-medium text-sm text-verrion-subtext group-hover:text-verrion-text">{app.name}</span>
      </a>
    );
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center p-4 bg-verrion-container border border-verrion-border hover:border-verrion-accent/30 rounded-lg transition-all duration-300 hover:bg-verrion-accent/5"
    >
      <Tooltip />
      <div className="p-3 rounded-md bg-verrion-bg border border-verrion-border group-hover:border-verrion-accent/50 transition-colors">
        {renderIcon(24, "text-verrion-subtext group-hover:text-verrion-accent transition-colors")}
      </div>
      
      <div className="ml-4 flex-1 overflow-hidden">
        <h3 className="font-sans font-semibold text-verrion-text group-hover:text-verrion-accent transition-colors truncate">
          {app.name}
        </h3>
        <p className="font-sans text-xs text-verrion-muted mt-0.5">
          {app.category}
        </p>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2">
        {onDelete && (
          <button
            onClick={handleDeleteClick}
            className="p-1.5 rounded-full hover:bg-red-400/10 text-verrion-subtext hover:text-red-400 transition-colors"
            title="Delete app"
          >
            <Trash2 size={16} />
          </button>
        )}
        <button
          onClick={handlePinClick}
          className={`p-1.5 rounded-full hover:bg-verrion-accent/10 transition-colors ${isPinned ? 'text-verrion-accent' : 'text-verrion-subtext hover:text-verrion-text'}`}
          title={isPinned ? "Unpin" : "Pin to top"}
        >
          <Pin size={16} className={isPinned ? "fill-verrion-accent" : ""} />
        </button>
        <ExternalLink size={16} className="text-verrion-subtext" />
      </div>
    </a>
  );
};

export default AppCard;

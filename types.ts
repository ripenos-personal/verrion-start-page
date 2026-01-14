import { LucideIcon } from 'lucide-react';

export enum Category {
  CORE = 'Core',
  MARKETING = 'Marketing',
  DEVELOPMENT = 'Development',
  OPS = 'Ops'
}

export interface AppLink {
  id: string;
  name: string;
  url: string;
  category: Category;
  icon: LucideIcon | string;
  isCustom?: boolean;
}

export interface AppState {
  pinnedIds: string[];
}

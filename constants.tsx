import { 
  Mail, 
  MessageSquare, 
  Flame, 
  FileText, 
  CreditCard, 
  Table, 
  Calendar, 
  Linkedin, 
  ShieldCheck, 
  Rocket, 
  BarChart, 
  Github, 
  Triangle, 
  Cloud, 
  Zap, 
  Search,
  Globe,
  BrainCircuit
} from 'lucide-react';
import { AppLink, Category } from './types';

export const APP_DATA: AppLink[] = [
  // CORE
  {
    id: 'gmail',
    name: 'Gmail',
    url: 'https://mail.google.com/mail/u/0/',
    category: Category.CORE,
    icon: Mail
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    category: Category.CORE,
    icon: MessageSquare
  },
  {
    id: 'firebase',
    name: 'Firebase',
    url: 'https://console.firebase.google.com/project/docsight/overview',
    category: Category.CORE,
    icon: Flame
  },
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so/',
    category: Category.CORE,
    icon: FileText
  },
  {
    id: 'dodo',
    name: 'Dodo Payments',
    url: 'https://app.dodopayments.com/',
    category: Category.CORE,
    icon: CreditCard
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    url: 'https://docs.google.com/spreadsheets/u/0/',
    category: Category.CORE,
    icon: Table
  },

  // MARKETING
  {
    id: 'cal',
    name: 'Cal.com',
    url: 'https://app.cal.com/event-types',
    category: Category.MARKETING,
    icon: Calendar
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://in.linkedin.com/',
    category: Category.MARKETING,
    icon: Linkedin
  },
  {
    id: 'proton',
    name: 'Proton Mail',
    url: 'https://mail.proton.me/u/0/inbox',
    category: Category.MARKETING,
    icon: ShieldCheck
  },
  {
    id: 'apollo',
    name: 'Apollo',
    url: 'https://app.apollo.io/',
    category: Category.MARKETING,
    icon: Rocket
  },
  {
    id: 'tally',
    name: 'Tally',
    url: 'https://tally.so/dashboard',
    category: Category.MARKETING,
    icon: BarChart
  },

  // DEVELOPMENT
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/ripenos-personal?tab=repositories',
    category: Category.DEVELOPMENT,
    icon: Github
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com/ripenos-personals-projects',
    category: Category.DEVELOPMENT,
    icon: Triangle
  },
  {
    id: 'cloudinary',
    name: 'Cloudinary',
    url: 'https://console.cloudinary.com/console/c-233188078ed28ac92fc46b6446402c/media_library/homepage',
    category: Category.DEVELOPMENT,
    icon: Cloud
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    url: 'https://dash.cloudflare.com/88e7da305f5cd99420c63b7bc79286b5/home',
    category: Category.DEVELOPMENT,
    icon: Zap
  },

  // OPS
  {
    id: 'perplexity',
    name: 'Perplexity',
    url: 'https://perplexity.ai/',
    category: Category.OPS,
    icon: BrainCircuit
  }
];

export const CATEGORIES = [
  Category.CORE,
  Category.MARKETING,
  Category.DEVELOPMENT,
  Category.OPS
];

export const MAX_PINS = 5;

export const ICON_MAP: Record<string, any> = {
  Mail, 
  MessageSquare, 
  Flame, 
  FileText, 
  CreditCard, 
  Table, 
  Calendar, 
  Linkedin, 
  ShieldCheck, 
  Rocket, 
  BarChart, 
  Github, 
  Triangle, 
  Cloud, 
  Zap, 
  Search,
  BrainCircuit,
  Globe
};

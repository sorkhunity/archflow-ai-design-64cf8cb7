export interface Project {
  id: string;
  name: string;
  persona: string;
  budget: number; // in Tomans
  style: string;
  materials: string[];
  status: 'pending_approval' | 'approved' | 'rendering' | 'revision';
  renderCount: number;
  area: number; // sqm
  createdAt: string;
  image: string;
  description: string;
}

export const PROJECT_STATUS_LABELS: Record<Project['status'], string> = {
  pending_approval: 'در انتظار تایید',
  approved: 'تایید شده',
  rendering: 'در حال رندر',
  revision: 'بازنگری'
};

export interface PersonaInfo {
  id: string;
  name: string;
  title: string;
  goal: string;
  challenge: string;
  avatar: string;
  defaultProject: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: string;
}

export interface VoteItem {
  id: string;
  topic: string;
  options: { id: string; label: string; votes: number; image?: string }[];
  status: 'active' | 'consensus' | 'conflict';
}

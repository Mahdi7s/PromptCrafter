import type { LucideIcon } from 'lucide-react';

export type PromptCategory =
  | 'style transfer'
  | 'object manipulation'
  | 'background change'
  | 'enhancement'
  | 'artistic effects'
  | 'other';

export interface Prompt {
  id: string;
  text: string;
  category: PromptCategory;
  description?: string;
  icon?: LucideIcon;
  createdAt: Date;
}

export const PromptCategoriesList: PromptCategory[] = [
  'style transfer',
  'object manipulation',
  'background change',
  'enhancement',
  'artistic effects',
  'other',
];

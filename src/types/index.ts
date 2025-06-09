
import type { LucideIcon } from 'lucide-react';

export type PromptCategory =
  | 'art styles'
  | 'scenes and themes'
  | 'animals and characters'
  | 'storytelling and comics'
  | 'history and nostalgia'
  | 'product and advertising'
  | 'fantasy concepts and technical details'
  | 'crafting prompts'
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
  'art styles',
  'scenes and themes',
  'animals and characters',
  'storytelling and comics',
  'history and nostalgia',
  'product and advertising',
  'fantasy concepts and technical details',
  'crafting prompts',
  'other',
];


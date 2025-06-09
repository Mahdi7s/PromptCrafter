
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
  description?: string; // Made description optional
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

export type SupportedLanguage = 'en' | 'fa';

export interface Translations {
  [key: string]: string | Translations;
}

interface CraftPromptFormSelectOptions {
  subjects: Record<string, string>;
  artStyles: Record<string, string>;
  lightingOptions: Record<string, string>;
  compositionOptions: Record<string, string>;
  moodOptions: Record<string, string>;
  aspectRatioOptions: Record<string, string>;
  videoDurationOptions: Record<string, string>;
  cameraMotionOptions: Record<string, string>;
  videoStyleOptions: Record<string, string>;
}

export interface LocaleMessages {
  headerTitle: string;
  homePageTitle: string;
  homePageSubtitle: string;
  craftPromptForm: {
    imagePromptButton: string;
    videoPromptButton: string;
    imageOptionsTitle: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    artStyleLabel: string;
    artStylePlaceholder: string;
    lightingLabel: string;
    lightingPlaceholder: string;
    compositionLabel: string;
    compositionPlaceholder: string;
    moodLabel: string;
    moodPlaceholder: string;
    videoSpecificsTitle: string;
    videoSubjectLabel: string;
    videoSubjectPlaceholder: string;
    aspectRatioLabel: string;
    aspectRatioPlaceholder: string;
    videoDurationLabel: string;
    videoDurationPlaceholder: string;
    cameraMotionLabel: string;
    cameraMotionPlaceholder: string;
    videoStyleLabel: string;
    videoStylePlaceholder: string;
    videoStyleHint: string;
    additionalVisualDetailsVideoTitle: string;
    artStyleVideoLabel: string;
    lightingVideoLabel: string;
    moodVideoLabel: string;
    extraDetailsLabel: string;
    extraDetailsPlaceholder: string;
    generatedPromptPreviewLabel: string;
    generatedPromptPlaceholder: string;
    copyPromptButton: string;
    copiedButton: string;
    resetCrafterButton: string;
    submitButton: string;
    submittingButton: string;
    emptyPromptErrorTitle: string;
    emptyPromptErrorDescription: string;
    selectOptions: CraftPromptFormSelectOptions;
  };
  footerCopyright: string;
  footerReserved: string;
  footerSlogan: string;
  languageEnglish: string;
  languagePersian: string;
}

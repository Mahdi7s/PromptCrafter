
import type { LucideIcon } from 'lucide-react';

export type PromptCategory =
  | 'art styles'
  | 'scenes and themes'
  | 'animals and characters'
  | 'storytelling and comics'
  | 'history and nostalgia'
  | 'product and advertising'
  | 'fantasy concepts and technical details'
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
  'other',
];

export type SupportedLanguage = 'en' | 'fa';

export interface Translations {
  [key: string]: string | Translations;
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
  };
  footerCopyright: string;
  footerReserved: string;
  footerSlogan: string;
  languageEnglish: string;
  languagePersian: string;
}

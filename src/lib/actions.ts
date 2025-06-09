
'use server';

import { z } from 'zod';
import type { Prompt, PromptCategory } from '@/types';
import { 
  Palette, 
  Landmark, 
  PawPrint, 
  BookOpenText, 
  Camera, 
  ShoppingBag, 
  Wand2, 
  Lightbulb, 
  Shapes 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SubmitPromptSchema = z.object({
  promptText: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }).max(2000, { message: 'Prompt must be at most 2000 characters long.' }),
});

export interface SubmitPromptFormState {
  message: string;
  fields?: Record<string, string>;
  success: boolean;
  newPrompt?: Prompt;
}

const categoryIconsMap: Record<PromptCategory, LucideIcon> = {
  'art styles': Palette,
  'scenes and themes': Landmark,
  'animals and characters': PawPrint,
  'storytelling and comics': BookOpenText,
  'history and nostalgia': Camera,
  'product and advertising': ShoppingBag,
  'fantasy concepts and technical details': Wand2,
  'crafting prompts': Lightbulb,
  'other': Shapes,
};

export async function submitPromptAction(
  prevState: SubmitPromptFormState,
  formData: FormData
): Promise<SubmitPromptFormState> {
  const validatedFields = SubmitPromptSchema.safeParse({
    promptText: formData.get('promptText'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      fields: validatedFields.error.flatten().fieldErrors as Record<string, string>,
      success: false,
    };
  }

  const { promptText } = validatedFields.data;

  try {
    // AI Categorization logic removed
    const category: PromptCategory = 'other'; // Default category

    const newPrompt: Prompt = {
      id: Date.now().toString(), 
      text: promptText,
      category: category, 
      description: 'Prompt submitted manually.', // Generic description or remove
      icon: categoryIconsMap[category] || Shapes,
      createdAt: new Date(),
    };

    return {
      message: 'Prompt submitted successfully! (Manual categorization)',
      success: true,
      newPrompt,
    };
  } catch (error) {
    console.error('Error processing prompt:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    return {
      message: `Failed to process prompt: ${errorMessage}. Please try again.`,
      success: false,
    };
  }
}

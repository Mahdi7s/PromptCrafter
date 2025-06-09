
'use server';

import { z } from 'zod';
import { categorizeImagePrompts } from '@/ai/flows/categorize-prompt';
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
  promptText: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }).max(2000, { message: 'Prompt must be at most 2000 characters long.' }), // Increased max length for detailed prompts
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
    const categorizationResult = await categorizeImagePrompts({ prompt: promptText });
    
    let category = categorizationResult.category.toLowerCase() as PromptCategory;
    
    const allowedCategories: PromptCategory[] = [
      'art styles',
      'scenes and themes',
      'animals and characters',
      'storytelling and comics',
      'history and nostalgia',
      'product and advertising',
      'fantasy concepts and technical details',
      'crafting prompts', // Ensure 'crafting prompts' is here if AI can categorize it. Or handle crafted prompts differently.
      'other'
    ];
    if (!allowedCategories.includes(category)) {
      category = 'other';
    }

    const newPrompt: Prompt = {
      id: Date.now().toString(), 
      text: promptText,
      // For crafted prompts, the category might often be 'other' or reflect the content.
      // The 'crafting prompts' category itself is more about *examples of how to craft*.
      // Submitted crafted prompts will be categorized based on their content by the AI.
      category: category, 
      description: `AI classified (Confidence: ${categorizationResult.confidence.toFixed(2)})`,
      icon: categoryIconsMap[category] || Shapes,
      createdAt: new Date(),
    };

    return {
      message: 'Prompt submitted and categorized successfully!',
      success: true,
      newPrompt,
    };
  } catch (error) {
    console.error('Error categorizing prompt:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    return {
      message: `Failed to categorize prompt: ${errorMessage}. Please try again.`,
      success: false,
    };
  }
}


'use server';

import { z } from 'zod';
import { categorizeImagePrompts } from '@/ai/flows/categorize-prompt';
import type { Prompt, PromptCategory } from '@/types';
import { Palette, SquarePen, ImageUp, Sparkles, Wand2, Shapes } from 'lucide-react';

const SubmitPromptSchema = z.object({
  promptText: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }).max(500, { message: 'Prompt must be at most 500 characters long.' }),
});

export interface SubmitPromptFormState {
  message: string;
  fields?: Record<string, string>;
  success: boolean;
  newPrompt?: Prompt;
}

const categoryIconsMap: Record<PromptCategory, typeof Palette> = {
  'style transfer': Palette,
  'object manipulation': SquarePen,
  'background change': ImageUp,
  enhancement: Sparkles,
  'artistic effects': Wand2,
  other: Shapes,
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
    // Ensure category is one of the allowed types, default to 'other' if not.
    const allowedCategories: PromptCategory[] = ['style transfer', 'object manipulation', 'background change', 'enhancement', 'artistic effects', 'other'];
    if (!allowedCategories.includes(category)) {
      category = 'other';
    }

    const newPrompt: Prompt = {
      id: Date.now().toString(), // In a real app, this would be a UUID from a DB
      text: promptText,
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
    return {
      message: 'Failed to categorize prompt. Please try again.',
      success: false,
    };
  }
}

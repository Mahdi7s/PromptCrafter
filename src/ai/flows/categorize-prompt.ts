
'use server';

/**
 * @fileOverview Categorizes image transformation and editing prompts using a GenAI model.
 *
 * - categorizeImagePrompts - A function that categorizes image prompts.
 * - CategorizeImagePromptsInput - The input type for the categorizeImagePrompts function.
 * - CategorizeImagePromptsOutput - The return type for the categorizeImagePrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeImagePromptsInputSchema = z.object({
  prompt: z.string().describe('The image transformation or editing prompt to categorize.'),
});
export type CategorizeImagePromptsInput = z.infer<typeof CategorizeImagePromptsInputSchema>;

const CategorizeImagePromptsOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The category of the image prompt. Options include: art styles, scenes and themes, animals and characters, storytelling and comics, history and nostalgia, product and advertising, fantasy concepts and technical details, prompt templates, other.'
    ),
  confidence: z.number().describe('The confidence level (0-1) of the categorization.'),
});
export type CategorizeImagePromptsOutput = z.infer<typeof CategorizeImagePromptsOutputSchema>;

export async function categorizeImagePrompts(input: CategorizeImagePromptsInput): Promise<CategorizeImagePromptsOutput> {
  return categorizeImagePromptsFlow(input);
}

const categorizeImagePromptsPrompt = ai.definePrompt({
  name: 'categorizeImagePromptsPrompt',
  input: {schema: CategorizeImagePromptsInputSchema},
  output: {schema: CategorizeImagePromptsOutputSchema},
  prompt: `You are an AI assistant specializing in categorizing image transformation and editing prompts.  
  Given the prompt, determine the most relevant category and a confidence level (0-1).
  Categories include: art styles, scenes and themes, animals and characters, storytelling and comics, history and nostalgia, product and advertising, fantasy concepts and technical details, prompt templates, other.
  Ensure the category you output is one of these exact options, in lowercase.

  Prompt: {{{prompt}}}
  Category:`,
});

const categorizeImagePromptsFlow = ai.defineFlow(
  {
    name: 'categorizeImagePromptsFlow',
    inputSchema: CategorizeImagePromptsInputSchema,
    outputSchema: CategorizeImagePromptsOutputSchema,
  },
  async input => {
    const {output} = await categorizeImagePromptsPrompt(input);
    // Ensure the category is lowercase and one of the predefined valid categories.
    if (output) {
        const lowerCategory = output.category.toLowerCase();
        const validCategories = ['art styles', 'scenes and themes', 'animals and characters', 'storytelling and comics', 'history and nostalgia', 'product and advertising', 'fantasy concepts and technical details', 'prompt templates', 'other'];
        if (validCategories.includes(lowerCategory)) {
            output.category = lowerCategory;
        } else {
            // If the AI returns a category not in the list, default to 'other'
            // This could also be an opportunity to log unexpected AI output.
            output.category = 'other';
        }
    }
    return output!;
  }
);

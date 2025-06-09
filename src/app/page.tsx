
'use client';

import { Header } from '@/components/layout/header';
import { CraftPromptForm } from '@/components/prompts/craft-prompt-form';
import type { Prompt } from '@/types';
import { addCraftedPromptToList } from '@/config/prompts'; // Used to update a global list if needed elsewhere

export default function HomePage() {
  // This function will be called by CraftPromptForm on successful submission.
  // Currently, it updates a shared list (initialPrompts) and could trigger UI updates
  // if a prompt list view were present or re-introduced on another page.
  const handleNewCraftedPrompt = (newPrompt: Prompt) => {
    addCraftedPromptToList(newPrompt);
    // If you want to display submitted prompts on a different page,
    // you might navigate or fetch updated list there.
    // For now, the toast in CraftPromptForm gives user feedback.
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-headline font-bold text-primary mb-2">
              AI Prompt Engineer
            </h1>
            <p className="text-lg text-muted-foreground">
              Craft the perfect prompt for your image and video creations.
              Select options below or type freely to generate and refine your ideas.
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-card shadow-xl rounded-lg border">
             <CraftPromptForm 
                onFormSubmissionSuccess={handleNewCraftedPrompt}
                // closeDialog is not strictly needed here as it's not in a dialog,
                // but the form might use it to reset itself.
                // We can pass a simple reset function or let the form handle its own reset.
                closeDialog={() => { /* Form reset is handled internally or via form's own logic */ }}
             />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-12">
        <p>&copy; {new Date().getFullYear()} AIPromptoImage. All rights reserved.</p>
        <p className="mt-1">Engineered for creative image and video transformations.</p>
      </footer>
    </div>
  );
}

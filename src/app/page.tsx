
'use client';

import { Header } from '@/components/layout/header';
import { CraftPromptForm } from '@/components/prompts/craft-prompt-form';
import type { Prompt } from '@/types';
import { addCraftedPromptToList } from '@/config/prompts'; 
import { useTranslation } from '@/hooks/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();

  const handleNewCraftedPrompt = (newPrompt: Prompt) => {
    addCraftedPromptToList(newPrompt);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-headline font-bold text-primary mb-2">
              {t('homePageTitle')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('homePageSubtitle')}
            </p>
          </div>
          <div className="p-6 sm:p-8 bg-card shadow-xl rounded-lg border">
             <CraftPromptForm 
                onFormSubmissionSuccess={handleNewCraftedPrompt}
                closeDialog={() => { /* Form reset is handled internally */ }}
             />
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-12">
        <p>{t('footerCopyright', { year: new Date().getFullYear() })} {t('footerReserved')}</p>
        <p className="mt-1">{t('footerSlogan')}</p>
      </footer>
    </div>
  );
}

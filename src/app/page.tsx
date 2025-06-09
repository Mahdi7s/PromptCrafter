'use client';

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { PromptCard } from '@/components/prompts/prompt-card';
import { CategoryFilter } from '@/components/prompts/category-filter';
import { SubmitPromptDialog } from '@/components/prompts/submit-prompt-dialog';
import { initialPrompts } from '@/config/prompts';
import type { Prompt, PromptCategory } from '@/types';
import { PromptCategoriesList } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'all'>('all');
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleAddNewPrompt = (newPrompt: Prompt) => {
    setPrompts(prevPrompts => [newPrompt, ...prevPrompts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  };

  const filteredPrompts = useMemo(() => {
    return prompts
      .filter(prompt =>
        selectedCategory === 'all' ? true : prompt.category === selectedCategory
      )
      .filter(prompt =>
        prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prompt.description && prompt.description.toLowerCase().includes(searchTerm.toLowerCase()))
      ).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [prompts, searchTerm, selectedCategory]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSubmitPromptClick={() => setIsSubmitDialogOpen(true)}
      />
      <main className="flex-1">
        <div className="container py-8 px-4 md:px-6">
          <CategoryFilter
            categories={PromptCategoriesList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <img src="https://placehold.co/300x200.png" data-ai-hint="empty state search" alt="No prompts found" className="mx-auto mb-6 rounded-lg shadow-md" />
              <h2 className="text-2xl font-headline text-muted-foreground mb-2">No Prompts Found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filters, or submit a new prompt!
              </p>
            </div>
          )}
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} AIPromptoImage. All rights reserved.</p>
        <p className="mt-1">Designed for creative image transformations.</p>
      </footer>
      <SubmitPromptDialog
        isOpen={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
        onFormSubmissionSuccess={handleAddNewPrompt}
      />
      {showScrollTop && (
        <Button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full p-0 shadow-lg"
          variant="default"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

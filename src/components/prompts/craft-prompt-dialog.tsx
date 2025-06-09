
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CraftPromptForm } from "./craft-prompt-form";
import type { Prompt } from '@/types';

interface CraftPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
}

export function CraftPromptDialog({ isOpen, onOpenChange, onFormSubmissionSuccess }: CraftPromptDialogProps) {
  const handleCloseDialog = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card shadow-xl rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-headline text-primary">Craft Your Prompt</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Use the options below to build a detailed image prompt. The AI will categorize it upon submission.
          </DialogDescription>
        </DialogHeader>
        <CraftPromptForm 
          onFormSubmissionSuccess={onFormSubmissionSuccess}
          closeDialog={handleCloseDialog} 
        />
      </DialogContent>
    </Dialog>
  );
}

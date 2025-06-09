'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SubmitPromptForm } from "./submit-prompt-form";
import type { Prompt } from '@/types';

interface SubmitPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
}

export function SubmitPromptDialog({ isOpen, onOpenChange, onFormSubmissionSuccess }: SubmitPromptDialogProps) {
  const handleCloseDialog = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-card shadow-xl rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-headline text-primary">Submit New Prompt</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your image prompt below. Our AI will categorize it for you.
          </DialogDescription>
        </DialogHeader>
        <SubmitPromptForm 
          onFormSubmissionSuccess={onFormSubmissionSuccess}
          closeDialog={handleCloseDialog} 
        />
      </DialogContent>
    </Dialog>
  );
}

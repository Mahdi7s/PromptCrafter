'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitPromptAction, type SubmitPromptFormState } from '@/lib/actions';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Prompt } from '@/types';
import { Send } from 'lucide-react';

interface SubmitPromptFormProps {
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
  closeDialog: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full shadow-md hover:shadow-lg transition-shadow duration-300">
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
      ) : (
        <Send className="h-4 w-4 mr-2" />
      )}
      {pending ? 'Submitting...' : 'Submit and Categorize'}
    </Button>
  );
}

export function SubmitPromptForm({ onFormSubmissionSuccess, closeDialog }: SubmitPromptFormProps) {
  const initialState: SubmitPromptFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitPromptAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        if (state.newPrompt) {
          onFormSubmissionSuccess(state.newPrompt);
        }
        closeDialog(); // Close dialog on success
      } else {
        toast({
          title: 'Error',
          description: state.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSubmissionSuccess, closeDialog]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="promptText" className="text-sm font-medium text-foreground font-headline">
          Enter your image prompt
        </Label>
        <Textarea
          id="promptText"
          name="promptText"
          placeholder="e.g., 'A surreal landscape with floating islands and bioluminescent flora...'"
          rows={5}
          className="mt-2 shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
          aria-describedby="promptText-error"
        />
        {state.fields?.promptText && (
          <p id="promptText-error" className="text-xs text-destructive mt-1">
            {state.fields.promptText}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

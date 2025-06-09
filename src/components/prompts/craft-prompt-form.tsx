
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitPromptAction, type SubmitPromptFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import type { Prompt } from '@/types';
import { Copy, Send, Eraser } from 'lucide-react';

interface CraftPromptFormProps {
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
  closeDialog: () => void;
}

const subjectOptions = ["Character", "Landscape", "Object", "Animal", "Abstract Scene", "Futuristic City", "Mythical Creature", "Interior Scene"];
const styleOptions = ["Photorealistic", "Impressionistic", "Surreal", "Anime", "Cartoon", "Pixel Art", "Watercolor", "Oil Painting", "Cyberpunk", "Steampunk", "Art Deco", "Minimalist", "Vintage Comic"];
const lightingOptions = ["Golden Hour", "Neon Glow", "Moonlit", "Studio Lighting", "Overcast Sky", "Dramatic Shadows", "Bioluminescent", "Cinematic Lighting", "Backlit", "Soft Diffused"];
const compositionOptions = ["Close-up", "Wide Shot", "Portrait", "Action Shot", "Bird's Eye View", "Worm's Eye View", "Symmetrical", "Rule of Thirds"];
const moodOptions = ["Mysterious", "Joyful", "Serene", "Dramatic", "Whimsical", "Energetic", "Melancholic", "Epic", "Nostalgic"];

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

export function CraftPromptForm({ onFormSubmissionSuccess, closeDialog }: CraftPromptFormProps) {
  const [subject, setSubject] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [lighting, setLighting] = useState('');
  const [composition, setComposition] = useState('');
  const [mood, setMood] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const initialState: SubmitPromptFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitPromptAction, initialState);
  
  useEffect(() => {
    const parts = [
      subject,
      artStyle ? `in a ${artStyle.toLowerCase()} style` : '',
      lighting ? `with ${lighting.toLowerCase()} lighting` : '',
      composition ? `using a ${composition.toLowerCase()} composition` : '',
      mood ? `evoking a ${mood.toLowerCase()} mood` : '',
      extraDetails,
    ].filter(Boolean).join(', ');
    setGeneratedPrompt(parts.trim() ? parts.charAt(0).toUpperCase() + parts.slice(1) + '.' : '');
  }, [subject, artStyle, lighting, composition, mood, extraDetails]);

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
        resetForm();
        closeDialog(); 
      } else {
        toast({
          title: 'Error',
          description: state.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSubmissionSuccess, closeDialog]);

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard!",
      description: `Prompt "${generatedPrompt.substring(0,50)}..." copied.`,
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setSubject('');
    setArtStyle('');
    setLighting('');
    setComposition('');
    setMood('');
    setExtraDetails('');
  };

  const handleSubmitWithCraftedPrompt = (formData: FormData) => {
    formData.set('promptText', generatedPrompt); // Override promptText with the generated one
    formAction(formData);
  };


  return (
    <form action={handleSubmitWithCraftedPrompt} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-foreground font-headline">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject" className="mt-1 shadow-sm"><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent>
              {subjectOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="artStyle" className="text-sm font-medium text-foreground font-headline">Art Style</Label>
          <Select value={artStyle} onValueChange={setArtStyle}>
            <SelectTrigger id="artStyle" className="mt-1 shadow-sm"><SelectValue placeholder="Select art style" /></SelectTrigger>
            <SelectContent>
              {styleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="lighting" className="text-sm font-medium text-foreground font-headline">Lighting</Label>
          <Select value={lighting} onValueChange={setLighting}>
            <SelectTrigger id="lighting" className="mt-1 shadow-sm"><SelectValue placeholder="Select lighting" /></SelectTrigger>
            <SelectContent>
              {lightingOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
         <div>
          <Label htmlFor="composition" className="text-sm font-medium text-foreground font-headline">Composition</Label>
          <Select value={composition} onValueChange={setComposition}>
            <SelectTrigger id="composition" className="mt-1 shadow-sm"><SelectValue placeholder="Select composition" /></SelectTrigger>
            <SelectContent>
              {compositionOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="mood" className="text-sm font-medium text-foreground font-headline">Mood/Atmosphere</Label>
          <Select value={mood} onValueChange={setMood}>
            <SelectTrigger id="mood" className="mt-1 shadow-sm"><SelectValue placeholder="Select mood" /></SelectTrigger>
            <SelectContent>
              {moodOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="extraDetails" className="text-sm font-medium text-foreground font-headline">Extra Details</Label>
        <Textarea
          id="extraDetails"
          name="extraDetails"
          placeholder="e.g., 'wearing a red cloak', 'with vibrant colors', 'in a dense forest'"
          rows={2}
          className="mt-1 shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="generatedPrompt" className="text-sm font-medium text-foreground font-headline">Generated Prompt</Label>
        <Textarea
          id="generatedPrompt"
          name="promptText" // This name is important for the formAction
          readOnly 
          value={generatedPrompt}
          rows={3}
          className="mt-1 shadow-sm bg-muted/50 cursor-not-allowed"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-6">
        <Button type="button" variant="outline" onClick={handleCopy} className="flex-1">
          {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </Button>
        <Button type="button" variant="ghost" onClick={resetForm} className="flex-1 sm:flex-none text-muted-foreground hover:text-foreground">
          <Eraser className="h-4 w-4 mr-2" />
          Reset Crafter
        </Button>
      </div>
      <SubmitButton />
       {state.fields?.promptText && !generatedPrompt && (
          <p id="promptText-error" className="text-xs text-destructive mt-1">
            Please select options or add details to generate a prompt.
          </p>
        )}
    </form>
  );
}

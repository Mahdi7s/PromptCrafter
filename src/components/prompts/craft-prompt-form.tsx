
'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitPromptAction, type SubmitPromptFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import type { Prompt } from '@/types';
import { Copy, Send, Eraser, Check, Film, Ratio, Timer, Orbit } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation'; // Import useTranslation

interface CraftPromptFormProps {
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
  closeDialog: () => void; 
}

// Image Options (remain in English as per instruction not to translate "result prompts" or their components)
const subjectOptions = ["Character", "Landscape", "Object", "Animal", "Abstract Scene", "Futuristic City", "Mythical Creature", "Interior Scene", "Food Item", "Historical Event"];
const styleOptions = ["Photorealistic", "Impressionistic", "Surreal", "Anime", "Cartoon", "Pixel Art", "Watercolor", "Oil Painting", "Cyberpunk", "Steampunk", "Art Deco", "Minimalist", "Vintage Comic", "Concept Art Sketch", "Low Poly 3D"];
const lightingOptions = ["Golden Hour", "Neon Glow", "Moonlit", "Studio Lighting", "Overcast Sky", "Dramatic Shadows", "Bioluminescent", "Cinematic Lighting", "Backlit", "Soft Diffused", "Volumetric Lighting", "Rim Lighting"];
const compositionOptions = ["Close-up", "Wide Shot", "Portrait", "Action Shot", "Bird's Eye View", "Worm's Eye View", "Symmetrical", "Rule of Thirds", "Dutch Angle", "Leading Lines"];
const moodOptions = ["Mysterious", "Joyful", "Serene", "Dramatic", "Whimsical", "Energetic", "Melancholic", "Epic", "Nostalgic", "Horror", "Peaceful", "Utopian", "Dystopian"];

// Video Options (remain in English)
const aspectRatioOptions = ["16:9 (Widescreen)", "9:16 (Vertical)", "1:1 (Square)", "4:3 (Standard)", "2.35:1 (Cinemascope)"];
const videoDurationOptions = ["Short (~4 seconds)", "Medium (~8 seconds)", "Long (~15 seconds)", "Very Long (20s+)"];
const cameraMotionOptions = ["Static Shot", "Slow Panning", "Fast Panning", "Zoom In", "Zoom Out", "Dolly Shot", "Crane Shot", "Drone / Aerial Shot", "Handheld / Shaky Cam", "Time-lapse", "Slow Motion"];
const videoStyleOptions = ["Cinematic Film", "Documentary", "Animated Short (2D/3D)", "VFX Heavy", "Music Video", "Found Footage", "Surveillance Camera", "Grainy Vintage Film"];

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending} className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground me-2 rtl:ms-2"></div>
      ) : (
        <Send className="h-4 w-4 me-2 rtl:ms-2" />
      )}
      {pending ? t('craftPromptForm.submittingButton') : t('craftPromptForm.submitButton')}
    </Button>
  );
}

export function CraftPromptForm({ onFormSubmissionSuccess, closeDialog }: CraftPromptFormProps) {
  const { t } = useTranslation(); // Initialize useTranslation
  // Image states
  const [subject, setSubject] = useState('');
  const [artStyle, setArtStyle] = useState('');
  const [lighting, setLighting] = useState('');
  const [composition, setComposition] = useState('');
  const [mood, setMood] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
  
  // Video states
  const [aspectRatio, setAspectRatio] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [cameraMotion, setCameraMotion] = useState('');
  const [videoStyle, setVideoStyle] = useState('');
  const [isVideoPrompt, setIsVideoPrompt] = useState(false);

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const initialState: SubmitPromptFormState = { message: '', success: false };
  const [state, formAction] = useFormState(submitPromptAction, initialState);
  
  useEffect(() => {
    const imageParts = [
      subject,
      artStyle ? `in a ${artStyle.toLowerCase()} style` : '',
      lighting ? `with ${lighting.toLowerCase()} lighting` : '',
      composition ? `using a ${composition.toLowerCase()} composition` : '',
      mood ? `evoking a ${mood.toLowerCase()} mood` : '',
    ].filter(Boolean);

    const videoParts = [];
    if (isVideoPrompt) {
      videoParts.push("Create a video");
      if (aspectRatio) videoParts.push(`with aspect ratio ${aspectRatio.split(' ')[0]}`);
      if (videoDuration) videoParts.push(`duration ${videoDuration.toLowerCase()}`);
      if (cameraMotion) videoParts.push(`featuring ${cameraMotion.toLowerCase()} camera movement`);
      if (videoStyle) videoParts.push(`in a ${videoStyle.toLowerCase()} style`);
    }
    
    const allParts = [...(isVideoPrompt ? [] : imageParts), ...videoParts, extraDetails].filter(Boolean);
    let fullPrompt = allParts.join(', ');

    if (isVideoPrompt && subject && imageParts.length > 0) { 
        fullPrompt = `Create a video of ${subject}, ${videoParts.slice(1).join(', ')}${artStyle ? `, in a ${artStyle.toLowerCase()} style` : ''}${lighting ? `, with ${lighting.toLowerCase()} lighting` : ''}${composition ? `, using a ${composition.toLowerCase()} composition` : ''}${mood ? `, evoking a ${mood.toLowerCase()} mood` : ''}${extraDetails ? ', ' + extraDetails : ''}`;
    } else if (isVideoPrompt && subject) {
        fullPrompt = `Create a video of ${subject}, ${videoParts.slice(1).join(', ')}${extraDetails ? ', ' + extraDetails : ''}`;
    }

    setGeneratedPrompt(fullPrompt.trim() ? fullPrompt.charAt(0).toUpperCase() + fullPrompt.slice(1) + '.' : '');
  }, [subject, artStyle, lighting, composition, mood, extraDetails, isVideoPrompt, aspectRatio, videoDuration, cameraMotion, videoStyle]);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Success!', // This could also be translated
          description: state.message, // Assuming backend message might be translated or generic
          className: 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200'
        });
        if (state.newPrompt) {
          onFormSubmissionSuccess(state.newPrompt);
        }
        resetForm();
      } else {
        toast({
          title: 'Error', // This could also be translated
          description: state.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, onFormSubmissionSuccess]);

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: t('craftPromptForm.copiedButton'), // Translate toast title
      description: `Prompt "${generatedPrompt.substring(0,50)}..." copied.`, // Message content might remain English
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
    setAspectRatio('');
    setVideoDuration('');
    setCameraMotion('');
    setVideoStyle('');
    setIsVideoPrompt(false);
    setGeneratedPrompt('');
  };

  const handleSubmitWithCraftedPrompt = (formData: FormData) => {
    if (!generatedPrompt) {
        toast({
          title: t('craftPromptForm.emptyPromptErrorTitle'),
          description: t('craftPromptForm.emptyPromptErrorDescription'),
          variant: 'destructive',
        });
        return;
    }
    formData.set('promptText', generatedPrompt);
    formAction(formData);
  };

  return (
    <form action={handleSubmitWithCraftedPrompt} className="space-y-6">
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
        <Button type="button" variant={!isVideoPrompt ? "default" : "outline"} onClick={() => setIsVideoPrompt(false)} className="flex-1 shadow-sm">{t('craftPromptForm.imagePromptButton')}</Button>
        <Button type="button" variant={isVideoPrompt ? "default" : "outline"} onClick={() => setIsVideoPrompt(true)} className="flex-1 shadow-sm"><Film className="me-2 rtl:ms-2 h-4 w-4" />{t('craftPromptForm.videoPromptButton')}</Button>
      </div>

      {!isVideoPrompt && (
        <>
          <h3 className="text-lg font-semibold text-foreground mb-3 border-b pb-2">{t('craftPromptForm.imageOptionsTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.subjectLabel')}</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.subjectPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {subjectOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="artStyle" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.artStyleLabel')}</Label>
              <Select value={artStyle} onValueChange={setArtStyle}>
                <SelectTrigger id="artStyle" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.artStylePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {styleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lighting" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.lightingLabel')}</Label>
              <Select value={lighting} onValueChange={setLighting}>
                <SelectTrigger id="lighting" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.lightingPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {lightingOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="composition" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.compositionLabel')}</Label>
              <Select value={composition} onValueChange={setComposition}>
                <SelectTrigger id="composition" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.compositionPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {compositionOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mood" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.moodLabel')}</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.moodPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {moodOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      {isVideoPrompt && (
        <>
          <h3 className="text-lg font-semibold text-foreground mb-3 border-b pb-2 flex items-center"><Film className="me-2 rtl:ms-2 h-5 w-5 text-primary"/>{t('craftPromptForm.videoSpecificsTitle')}</h3>
          <div>
              <Label htmlFor="videoSubject" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.videoSubjectLabel')}</Label>
              <Input 
                id="videoSubject" 
                name="videoSubject" 
                placeholder={t('craftPromptForm.videoSubjectPlaceholder')}
                className="mt-1 shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="aspectRatio" className="text-sm font-medium text-foreground font-headline flex items-center"><Ratio className="me-2 rtl:ms-2 h-4 w-4"/>{t('craftPromptForm.aspectRatioLabel')}</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger id="aspectRatio" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.aspectRatioPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {aspectRatioOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="videoDuration" className="text-sm font-medium text-foreground font-headline flex items-center"><Timer className="me-2 rtl:ms-2 h-4 w-4"/>{t('craftPromptForm.videoDurationLabel')}</Label>
              <Select value={videoDuration} onValueChange={setVideoDuration}>
                <SelectTrigger id="videoDuration" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.videoDurationPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {videoDurationOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cameraMotion" className="text-sm font-medium text-foreground font-headline flex items-center"><Orbit className="me-2 rtl:ms-2 h-4 w-4"/>{t('craftPromptForm.cameraMotionLabel')}</Label>
              <Select value={cameraMotion} onValueChange={setCameraMotion}>
                <SelectTrigger id="cameraMotion" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.cameraMotionPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {cameraMotionOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="videoStyle" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.videoStyleLabel')}</Label>
              <Select value={videoStyle} onValueChange={setVideoStyle}>
                <SelectTrigger id="videoStyle" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.videoStylePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {videoStyleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-muted-foreground md:col-span-2">{t('craftPromptForm.videoStyleHint')}</p>
          </div>
          <h3 className="text-lg font-semibold text-foreground mt-6 mb-3 border-b pb-2">{t('craftPromptForm.additionalVisualDetailsVideoTitle')}</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="artStyleVideo" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.artStyleVideoLabel')}</Label>
              <Select value={artStyle} onValueChange={setArtStyle}>
                <SelectTrigger id="artStyleVideo" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.artStylePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {styleOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="lightingVideo" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.lightingVideoLabel')}</Label>
              <Select value={lighting} onValueChange={setLighting}>
                <SelectTrigger id="lightingVideo" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.lightingPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {lightingOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="moodVideo" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.moodVideoLabel')}</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="moodVideo" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.moodPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {moodOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </>
      )}

      <div className="mt-4">
        <Label htmlFor="extraDetails" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.extraDetailsLabel')}</Label>
        <Textarea
          id="extraDetails"
          name="extraDetails"
          placeholder={t('craftPromptForm.extraDetailsPlaceholder')}
          rows={3}
          className="mt-1 shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Label htmlFor="generatedPrompt" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.generatedPromptPreviewLabel')}</Label>
        <Textarea
          id="generatedPrompt"
          name="promptText" 
          readOnly 
          value={generatedPrompt}
          rows={4}
          className="mt-1 shadow-sm bg-muted/50 border-dashed border-input"
          placeholder={t('craftPromptForm.generatedPromptPlaceholder')}
        />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 mt-6">
        <Button type="button" variant="outline" onClick={handleCopy} className="flex-1 border-primary text-primary hover:bg-primary/10">
          {copied ? <Check className="h-4 w-4 me-2 rtl:ms-2 text-green-500" /> : <Copy className="h-4 w-4 me-2 rtl:ms-2" />}
          {copied ? t('craftPromptForm.copiedButton') : t('craftPromptForm.copyPromptButton')}
        </Button>
        <Button type="button" variant="ghost" onClick={resetForm} className="flex-1 sm:flex-none text-muted-foreground hover:text-destructive">
          <Eraser className="h-4 w-4 me-2 rtl:ms-2" />
          {t('craftPromptForm.resetCrafterButton')}
        </Button>
      </div>
      <SubmitButton />
        {state.fields?.promptText && !generatedPrompt && ( 
          <p id="promptText-error" className="text-xs text-destructive mt-1">
            {t('craftPromptForm.emptyPromptErrorDescription')}
          </p>
        )}
    </form>
  );
}

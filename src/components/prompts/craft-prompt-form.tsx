
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
import { useTranslation } from '@/hooks/useTranslation';

interface CraftPromptFormProps {
  onFormSubmissionSuccess: (newPrompt: Prompt) => void;
  closeDialog: () => void; 
}

interface SelectOption {
  key: string;
  value: string;
}

// Define options with keys for translation and English values for prompt generation
const subjectOptions: SelectOption[] = [
  { key: "character", value: "Character" },
  { key: "landscape", value: "Landscape" },
  { key: "object", value: "Object" },
  { key: "animal", value: "Animal" },
  { key: "abstractScene", value: "Abstract Scene" },
  { key: "futuristicCity", value: "Futuristic City" },
  { key: "mythicalCreature", value: "Mythical Creature" },
  { key: "interiorScene", value: "Interior Scene" },
  { key: "foodItem", value: "Food Item" },
  { key: "historicalEvent", value: "Historical Event" },
];

const styleOptions: SelectOption[] = [
  { key: "photorealistic", value: "Photorealistic" },
  { key: "impressionistic", value: "Impressionistic" },
  { key: "surreal", value: "Surreal" },
  { key: "anime", value: "Anime" },
  { key: "cartoon", value: "Cartoon" },
  { key: "pixelArt", value: "Pixel Art" },
  { key: "watercolor", value: "Watercolor" },
  { key: "oilPainting", value: "Oil Painting" },
  { key: "cyberpunk", value: "Cyberpunk" },
  { key: "steampunk", value: "Steampunk" },
  { key: "artDeco", value: "Art Deco" },
  { key: "minimalist", value: "Minimalist" },
  { key: "vintageComic", value: "Vintage Comic" },
  { key: "conceptArtSketch", value: "Concept Art Sketch" },
  { key: "lowPoly3D", value: "Low Poly 3D" },
];

const lightingOptions: SelectOption[] = [
  { key: "goldenHour", value: "Golden Hour" },
  { key: "neonGlow", value: "Neon Glow" },
  { key: "moonlit", value: "Moonlit" },
  { key: "studioLighting", value: "Studio Lighting" },
  { key: "overcastSky", value: "Overcast Sky" },
  { key: "dramaticShadows", value: "Dramatic Shadows" },
  { key: "bioluminescent", value: "Bioluminescent" },
  { key: "cinematicLighting", value: "Cinematic Lighting" },
  { key: "backlit", value: "Backlit" },
  { key: "softDiffused", value: "Soft Diffused" },
  { key: "volumetricLighting", value: "Volumetric Lighting" },
  { key: "rimLighting", value: "Rim Lighting" },
];

const compositionOptions: SelectOption[] = [
  { key: "closeUp", value: "Close-up" },
  { key: "wideShot", value: "Wide Shot" },
  { key: "portrait", value: "Portrait" },
  { key: "actionShot", value: "Action Shot" },
  { key: "birdsEyeView", value: "Bird's Eye View" },
  { key: "wormsEyeView", value: "Worm's Eye View" },
  { key: "symmetrical", value: "Symmetrical" },
  { key: "ruleOfThirds", value: "Rule of Thirds" },
  { key: "dutchAngle", value: "Dutch Angle" },
  { key: "leadingLines", value: "Leading Lines" },
];

const moodOptions: SelectOption[] = [
  { key: "mysterious", value: "Mysterious" },
  { key: "joyful", value: "Joyful" },
  { key: "serene", value: "Serene" },
  { key: "dramatic", value: "Dramatic" },
  { key: "whimsical", value: "Whimsical" },
  { key: "energetic", value: "Energetic" },
  { key: "melancholic", value: "Melancholic" },
  { key: "epic", value: "Epic" },
  { key: "nostalgic", value: "Nostalgic" },
  { key: "horror", value: "Horror" },
  { key: "peaceful", value: "Peaceful" },
  { key: "utopian", value: "Utopian" },
  { key: "dystopian", value: "Dystopian" },
];

const aspectRatioOptions: SelectOption[] = [
  { key: "sixteenNine", value: "16:9 (Widescreen)" },
  { key: "nineSixteen", value: "9:16 (Vertical)" },
  { key: "oneOne", value: "1:1 (Square)" },
  { key: "fourThree", value: "4:3 (Standard)" },
  { key: "twoThirtyFiveOne", value: "2.35:1 (Cinemascope)" },
];

const videoDurationOptions: SelectOption[] = [
  { key: "short", value: "Short (~4 seconds)" },
  { key: "medium", value: "Medium (~8 seconds)" },
  { key: "long", value: "Long (~15 seconds)" },
  { key: "veryLong", value: "Very Long (20s+)" },
];

const cameraMotionOptions: SelectOption[] = [
  { key: "staticShot", value: "Static Shot" },
  { key: "slowPanning", value: "Slow Panning" },
  { key: "fastPanning", value: "Fast Panning" },
  { key: "zoomIn", value: "Zoom In" },
  { key: "zoomOut", value: "Zoom Out" },
  { key: "dollyShot", value: "Dolly Shot" },
  { key: "craneShot", value: "Crane Shot" },
  { key: "droneAerialShot", value: "Drone / Aerial Shot" },
  { key: "handheldShakyCam", value: "Handheld / Shaky Cam" },
  { key: "timelapse", value: "Time-lapse" },
  { key: "slowMotion", value: "Slow Motion" },
];

const videoStyleOptions: SelectOption[] = [
  { key: "cinematicFilm", value: "Cinematic Film" },
  { key: "documentary", value: "Documentary" },
  { key: "animatedShort", value: "Animated Short (2D/3D)" },
  { key: "vfxHeavy", value: "VFX Heavy" },
  { key: "musicVideo", value: "Music Video" },
  { key: "foundFootage", value: "Found Footage" },
  { key: "surveillanceCamera", value: "Surveillance Camera" },
  { key: "grainyVintageFilm", value: "Grainy Vintage Film" },
];


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
  const { t } = useTranslation();
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
      // Use the English value for prompt construction
      if (aspectRatio) videoParts.push(`with aspect ratio ${aspectRatio.split(' ')[0]}`); // aspect ratio values are like "16:9 (Widescreen)"
      if (videoDuration) videoParts.push(`duration ${videoDuration.toLowerCase().split('(')[0].trim()}`); // "Short (~4 seconds)" -> "short"
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
          title: t('craftPromptForm.copiedButton'), 
          description: state.message, 
          className: 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-200'
        });
        if (state.newPrompt) {
          onFormSubmissionSuccess(state.newPrompt);
        }
        resetForm();
      } else {
        toast({
          title: t('craftPromptForm.emptyPromptErrorTitle'), 
          description: state.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toast, onFormSubmissionSuccess]); // t was removed as it causes re-renders on lang change for toast

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: t('craftPromptForm.copiedButton'), 
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
                  {subjectOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.subjects.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="artStyle" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.artStyleLabel')}</Label>
              <Select value={artStyle} onValueChange={setArtStyle}>
                <SelectTrigger id="artStyle" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.artStylePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {styleOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.artStyles.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lighting" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.lightingLabel')}</Label>
              <Select value={lighting} onValueChange={setLighting}>
                <SelectTrigger id="lighting" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.lightingPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {lightingOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.lightingOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="composition" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.compositionLabel')}</Label>
              <Select value={composition} onValueChange={setComposition}>
                <SelectTrigger id="composition" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.compositionPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {compositionOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.compositionOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="mood" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.moodLabel')}</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="mood" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.moodPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {moodOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.moodOptions.${opt.key}`)}</SelectItem>)}
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
                  {aspectRatioOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.aspectRatioOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="videoDuration" className="text-sm font-medium text-foreground font-headline flex items-center"><Timer className="me-2 rtl:ms-2 h-4 w-4"/>{t('craftPromptForm.videoDurationLabel')}</Label>
              <Select value={videoDuration} onValueChange={setVideoDuration}>
                <SelectTrigger id="videoDuration" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.videoDurationPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {videoDurationOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.videoDurationOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cameraMotion" className="text-sm font-medium text-foreground font-headline flex items-center"><Orbit className="me-2 rtl:ms-2 h-4 w-4"/>{t('craftPromptForm.cameraMotionLabel')}</Label>
              <Select value={cameraMotion} onValueChange={setCameraMotion}>
                <SelectTrigger id="cameraMotion" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.cameraMotionPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {cameraMotionOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.cameraMotionOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="videoStyle" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.videoStyleLabel')}</Label>
              <Select value={videoStyle} onValueChange={setVideoStyle}>
                <SelectTrigger id="videoStyle" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.videoStylePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {videoStyleOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.videoStyleOptions.${opt.key}`)}</SelectItem>)}
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
                  {styleOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.artStyles.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="lightingVideo" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.lightingVideoLabel')}</Label>
              <Select value={lighting} onValueChange={setLighting}>
                <SelectTrigger id="lightingVideo" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.lightingPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {lightingOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.lightingOptions.${opt.key}`)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="moodVideo" className="text-sm font-medium text-foreground font-headline">{t('craftPromptForm.moodVideoLabel')}</Label>
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger id="moodVideo" className="mt-1 shadow-sm"><SelectValue placeholder={t('craftPromptForm.moodPlaceholder')} /></SelectTrigger>
                <SelectContent>
                  {moodOptions.map(opt => <SelectItem key={opt.key} value={opt.value}>{t(`craftPromptForm.selectOptions.moodOptions.${opt.key}`)}</SelectItem>)}
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

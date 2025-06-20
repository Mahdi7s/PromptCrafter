
import type { LocaleMessages } from '@/types';

const enMessages: LocaleMessages = {
  headerTitle: "AIPromptoImage",
  homePageTitle: "AI Prompt Engineer",
  homePageSubtitle: "Craft the perfect prompt for your image and video creations. Select options below or type freely to generate and refine your ideas.",
  craftPromptForm: {
    imagePromptButton: "Image Prompt",
    videoPromptButton: "Video Prompt",
    imageOptionsTitle: "Image Options",
    subjectLabel: "Subject / Scene",
    subjectPlaceholder: "Select subject",
    artStyleLabel: "Art Style",
    artStylePlaceholder: "Select art style",
    lightingLabel: "Lighting",
    lightingPlaceholder: "Select lighting",
    compositionLabel: "Composition",
    compositionPlaceholder: "Select composition",
    moodLabel: "Mood/Atmosphere",
    moodPlaceholder: "Select mood",
    videoSpecificsTitle: "Video Specifics",
    videoSubjectLabel: "Main Subject / Action for Video",
    videoSubjectPlaceholder: "e.g., 'A cat chasing a laser pointer'",
    aspectRatioLabel: "Aspect Ratio",
    aspectRatioPlaceholder: "Select aspect ratio",
    videoDurationLabel: "Video Duration",
    videoDurationPlaceholder: "Select duration",
    cameraMotionLabel: "Camera Motion",
    cameraMotionPlaceholder: "Select camera motion",
    videoStyleLabel: "Video Style",
    videoStylePlaceholder: "Select video style",
    videoStyleHint: "You can still use Art Style, Lighting, Composition and Mood options from the Image section below to further refine your video prompt if desired.",
    additionalVisualDetailsVideoTitle: "Additional Visual Details (for Video)",
    artStyleVideoLabel: "Art Style (Optional)",
    lightingVideoLabel: "Lighting (Optional)",
    moodVideoLabel: "Mood/Atmosphere (Optional)",
    extraDetailsLabel: "Extra Details / Custom Input",
    extraDetailsPlaceholder: "e.g., 'wearing a red cloak', 'vibrant colors'",
    generatedPromptPreviewLabel: "Generated Prompt Preview",
    generatedPromptPlaceholder: "Your engineered prompt will appear here...",
    copyPromptButton: "Copy Prompt",
    copiedButton: "Copied!",
    resetCrafterButton: "Reset Crafter",
    submitButton: "Generate & Submit Prompt",
    submittingButton: "Submitting...",
    emptyPromptErrorTitle: "Empty Prompt",
    emptyPromptErrorDescription: "Please select options or add details to generate a prompt before submitting.",
    selectOptions: {
      subjects: {
        character: "Character",
        landscape: "Landscape",
        object: "Object",
        animal: "Animal",
        abstractScene: "Abstract Scene",
        futuristicCity: "Futuristic City",
        mythicalCreature: "Mythical Creature",
        interiorScene: "Interior Scene",
        foodItem: "Food Item",
        historicalEvent: "Historical Event",
      },
      artStyles: {
        photorealistic: "Photorealistic",
        impressionistic: "Impressionistic",
        surreal: "Surreal",
        anime: "Anime",
        cartoon: "Cartoon",
        pixelArt: "Pixel Art",
        watercolor: "Watercolor",
        oilPainting: "Oil Painting",
        cyberpunk: "Cyberpunk",
        steampunk: "Steampunk",
        artDeco: "Art Deco",
        minimalist: "Minimalist",
        vintageComic: "Vintage Comic",
        conceptArtSketch: "Concept Art Sketch",
        lowPoly3D: "Low Poly 3D",
      },
      lightingOptions: {
        goldenHour: "Golden Hour",
        neonGlow: "Neon Glow",
        moonlit: "Moonlit",
        studioLighting: "Studio Lighting",
        overcastSky: "Overcast Sky",
        dramaticShadows: "Dramatic Shadows",
        bioluminescent: "Bioluminescent",
        cinematicLighting: "Cinematic Lighting",
        backlit: "Backlit",
        softDiffused: "Soft Diffused",
        volumetricLighting: "Volumetric Lighting",
        rimLighting: "Rim Lighting",
      },
      compositionOptions: {
        closeUp: "Close-up",
        wideShot: "Wide Shot",
        portrait: "Portrait",
        actionShot: "Action Shot",
        birdsEyeView: "Bird's Eye View",
        wormsEyeView: "Worm's Eye View",
        symmetrical: "Symmetrical",
        ruleOfThirds: "Rule of Thirds",
        dutchAngle: "Dutch Angle",
        leadingLines: "Leading Lines",
      },
      moodOptions: {
        mysterious: "Mysterious",
        joyful: "Joyful",
        serene: "Serene",
        dramatic: "Dramatic",
        whimsical: "Whimsical",
        energetic: "Energetic",
        melancholic: "Melancholic",
        epic: "Epic",
        nostalgic: "Nostalgic",
        horror: "Horror",
        peaceful: "Peaceful",
        utopian: "Utopian",
        dystopian: "Dystopian",
      },
      aspectRatioOptions: {
        sixteenNine: "16:9 (Widescreen)",
        nineSixteen: "9:16 (Vertical)",
        oneOne: "1:1 (Square)",
        fourThree: "4:3 (Standard)",
        twoThirtyFiveOne: "2.35:1 (Cinemascope)",
      },
      videoDurationOptions: {
        short: "Short (~4 seconds)",
        medium: "Medium (~8 seconds)",
        long: "Long (~15 seconds)",
        veryLong: "Very Long (20s+)",
      },
      cameraMotionOptions: {
        staticShot: "Static Shot",
        slowPanning: "Slow Panning",
        fastPanning: "Fast Panning",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        dollyShot: "Dolly Shot",
        craneShot: "Crane Shot",
        droneAerialShot: "Drone / Aerial Shot",
        handheldShakyCam: "Handheld / Shaky Cam",
        timelapse: "Time-lapse",
        slowMotion: "Slow Motion",
      },
      videoStyleOptions: {
        cinematicFilm: "Cinematic Film",
        documentary: "Documentary",
        animatedShort: "Animated Short (2D/3D)",
        vfxHeavy: "VFX Heavy",
        musicVideo: "Music Video",
        foundFootage: "Found Footage",
        surveillanceCamera: "Surveillance Camera",
        grainyVintageFilm: "Grainy Vintage Film",
      },
    },
  },
  footerCopyright: "© {year} AIPromptoImage.",
  footerReserved: "All rights reserved.",
  footerSlogan: "Engineered for creative image and video transformations.",
  languageEnglish: "English",
  languagePersian: "فارسی (Persian)",
};

export default enMessages;

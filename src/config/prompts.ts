
import type { Prompt } from '@/types';
import { 
  Palette, 
  Landmark, 
  PawPrint, 
  BookOpenText, 
  Camera, 
  ShoppingBag, 
  Wand2, 
  Lightbulb, 
  Shapes 
} from 'lucide-react';

const userPromptsData = {
  "ImagePrompts": [
    {
      "category": "Art Styles",
      "icon": Palette,
      "examples": [
        "Transform this uploaded image into the Studio Ghibli animation style, emphasizing vibrant colors, soft whimsical details, and a hand-drawn feel, capturing a sense of wonder.",
        "Reimagine this scene in a classic Japanese anime style, featuring a dramatic sunset with warm orange and purple hues, dynamic character poses, and expressive cel-shading.",
        "Convert this photograph into a delicate, soft watercolor painting, characterized by translucent washes, gentle color blending, and visible paper texture.",
        "Recreate this image as a charming claymation scene, with handcrafted character models, textured surfaces, and stop-motion animation aesthetics.",
        "Infuse this image with a cyberpunk aesthetic: neon-drenched cityscapes, futuristic cybernetic enhancements, rain-slicked streets, and an overall gritty, high-tech atmosphere.",
        "Transform this cityscape into a vibrant LEGO brick world, ensuring all elements are constructed from recognizable LEGO pieces, with bright primary colors and a playful feel.",
        "Generate a cut-paper collage from this image, using distinct layers of textured paper, sharp edges, and a handcrafted, dimensional look.",
        "Apply an origami or folded paper effect to this photo, giving it distinct creases, shadows, and the appearance of being constructed from a single sheet of folded paper."
      ]
    },
    {
      "category": "Scenes and Themes",
      "icon": Landmark,
      "examples": [
        "Generate a hyper-photorealistic image of a bustling Tokyo street in the year 2070, illuminated by neon signs and holographic advertisements. Feature small, charming robot pets with glowing accents interacting with pedestrians under a light drizzle.",
        "Create a landscape that visually embodies 'nostalgia'. Depict an overgrown, abandoned playground with a single rusty swing swaying gently. Scatter faded Polaroid photos on the ground, hinting at past memories. Use a desaturated color palette and soft, diffused lighting.",
        "Illustrate a dramatic, rugged coastline during the golden hour. Capture powerful waves crashing against dark, jagged cliffs. Include dynamic silhouettes of seabirds in flight against the warm, glowing sky. Emphasize texture in the rocks and water."
      ]
    },
    {
      "category": "Animals and Characters",
      "icon": PawPrint,
      "examples": [
        "Convert this uploaded photo of my pet into a striking cyberpunk-style portrait. Add glowing cybernetic implants, neon highlights in its fur/feathers, and a backdrop of a futuristic, rain-soaked alley.",
        "Generate a whimsical image of a mallard duck proudly wearing a slightly oversized, loosely woven straw hat, perched jauntily on its head. The duck should be standing by a serene pond, with soft, natural lighting."
      ]
    },
    {
      "category": "Storytelling and Comics",
      "icon": BookOpenText,
      "examples": [
        "Create a 4-panel comic strip based on the theme of 'a cat's secret life'. Panel 1: Cat napping. Panel 2: Cat dons a tiny superhero cape. Panel 3: Cat 'saves' a toy mouse from a 'monster' (vacuum cleaner). Panel 4: Cat back to napping, owner oblivious.",
        "Illustrate the first encounter between Elizabeth Bennet and Mr. Darcy from 'Pride and Prejudice' as a 3-panel comic strip, capturing their initial impressions and witty dialogue in a Regency-era art style.",
        "Generate a 'Distracted Boyfriend' meme. Boyfriend: 'User', Girlfriend: 'Old image editing software', Other woman: 'This AI image generator'. Style: classic meme, bold white impact font text with black outline."
      ]
    },
    {
      "category": "History and Nostalgia",
      "icon": Camera,
      "examples": [
        "Generate an image emulating a vintage Polaroid SX-70 photo from Summer 1979. Depict a group of friends at a beach bonfire, with characteristic faded colors, light leaks, and the classic white Polaroid border. Include period-appropriate fashion (bell-bottoms, band t-shirts) and hairstyles.",
        "Create a realistic image as if I (imagine a person with brown hair, glasses, wearing a modern casual outfit) am taking a friendly selfie with Leonardo da Vinci in his Florence workshop, with his sketches and early inventions in the background. Ensure historical accuracy in Leonardo's clothing and the workshop setting. Lighting should be reminiscent of Renaissance paintings."
      ]
    },
    {
      "category": "Product and Advertising",
      "icon": ShoppingBag,
      "examples": [
        "Produce a high-end, sleek product shot of matte black minimalist wireless headphones. Use dramatic studio lighting with soft shadows and a clean, reflective surface. The headphones should be the sole focus, exuding luxury and modern design, with a subtle tagline 'Sound Redefined' in elegant typography.",
        "Design 'The Star' tarot card with a futuristic, holographic aesthetic. The card should feature shimmering, translucent layers, glowing celestial imagery, and intricate cyber-patterns. Emphasize a sense of hope and digital spirituality, with the traditional symbolism subtly integrated.",
        "Design a custom vinyl record cover for an indie folk band named 'Whispering Pines'. The artwork should feature a serene forest landscape at dusk, with a mystical, slightly melancholic mood, rendered in a detailed, illustrative style. Include hand-lettered band name and album title 'Echoes in the Twilight'."
      ]
    },
    {
      "category": "Fantasy Concepts and Technical Details",
      "icon": Wand2,
      "examples": [
        "Generate a glossy, die-cut 3D Chibi-style sticker of a small, adorable dragon holding a sparkling gem. The sticker should have a cute, 'kawaii' aesthetic with oversized eyes and a playful pose, appearing ready to be peeled off a backing sheet with a subtle shadow effect.",
        "Create an image of Albert Einstein as a bobblehead figurine. The figurine should have an exaggeratedly large head with his iconic hairstyle, a whimsical, thoughtful expression, and be displayed on a simple wooden base with a small plaque reading 'E=mc²'. Capture the classic bobblehead look with a slightly glossy finish.",
        "Generate a detailed, technical cross-sectional diagram of a futuristic ion propulsion engine for a sci-fi spaceship. Include clearly labeled components like 'magnetic confinement coils', 'xenon ionization chamber', 'high-voltage accelerator grid', and 'neutralized plasma exhaust'. Use a clean, blueprint-like style with annotations in a neat, sans-serif font."
      ]
    },
    {
      "category": "Crafting Prompts",
      "icon": Lightbulb,
      "examples": [
        "Generate 5 variations of a prompt for a 'serene alien jungle at twilight', each emphasizing a different aspect: 1. Flora and bioluminescence. 2. Fauna and creature design. 3. Atmosphere and mood. 4. Architectural ruins. 5. Color palette (cool blues and purples vs. warm alien greens).",
        "Create a highly detailed prompt to generate an image of a cozy cyberpunk ramen shop. Specify: perspective (street level looking in), time of day (rainy night), lighting (neon signs, steam from kitchen), key characters (robot chef, diverse patrons), details (holographic menus, clutter), and overall mood (welcoming, yet gritty).",
        "Help me refine this basic prompt: 'A wizard in a tower'. Suggest additions for: art style, specific magical elements, tower architecture, time of day, weather, wizard's appearance and activity, and emotional tone.",
        "Break down the concept 'the feeling of discovery' into visual metaphors and keywords that can be used in an image generation prompt. Aim for abstract or surreal interpretations."
      ]
    }
  ]
};

export let initialPrompts: Prompt[] = []; // Made mutable for potential future use if list is re-introduced
let idCounter = 1;
const baseDate = new Date();

userPromptsData.ImagePrompts.forEach(categoryData => {
  const categoryName = categoryData.category.toLowerCase() as Prompt['category'];
  categoryData.examples.forEach(exampleText => {
    initialPrompts.push({
      id: (idCounter++).toString(),
      text: exampleText,
      category: categoryName,
      icon: categoryData.icon,
      createdAt: new Date(baseDate.getTime() - idCounter * 1000 * 60 * 60),
    });
  });
});

// Function to add a new prompt to the initialPrompts array (e.g., after submission)
// This might be used if a prompt list view is added later.
export const addCraftedPromptToList = (newPrompt: Prompt) => {
  initialPrompts = [newPrompt, ...initialPrompts].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
};

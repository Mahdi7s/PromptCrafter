
import type { Prompt } from '@/types';
import { 
  Palette, 
  Landmark, 
  PawPrint, 
  BookOpenText, 
  Camera, 
  ShoppingBag, 
  Wand2, 
  ClipboardList, 
  Shapes 
} from 'lucide-react';

const userPromptsData = {
  "ImagePrompts": [
    {
      "category": "Art Styles",
      "icon": Palette,
      "examples": [
        "Make this in Studio Ghibli style",
        "Japan anime style with sunset",
        "Make this image a soft watercolor painting",
        "Turn this into a claymation scene",
        "Make it cyberpunk style with glowing lights",
        "Turn this cityscape into LEGO world",
        "Create a cut-paper collage",
        "Make this photo look folded from paper"
      ]
    },
    {
      "category": "Scenes and Themes",
      "icon": Landmark,
      "examples": [
        "A photorealistic image of a futuristic Tokyo street at night in 2070 with glowing robot pets",
        "Visualize 'nostalgia' as a landscape: an abandoned playground, faded polaroid photos",
        "Generate a rugged coastline at golden hour with waves crashing and seabirds in flight"
      ]
    },
    {
      "category": "Animals and Characters",
      "icon": PawPrint,
      "examples": [
        "Turn this photo of my pet into a cyberpunk-style portrait",
        "Create an image of a duck wearing a straw hat"
      ]
    },
    {
      "category": "Storytelling and Comics",
      "icon": BookOpenText,
      "examples": [
        "Make a 4-panel comic strip",
        "Create a comic strip from a literary work",
        "Create a meme image featuring [subject], styled in [meme format or art style]"
      ]
    },
    {
      "category": "History and Nostalgia",
      "icon": Camera,
      "examples": [
        "Create a vintage Polaroid-style photo of Summer '79",
        "Generate an image of me taking a selfie with a famous historical figure"
      ]
    },
    {
      "category": "Product and Advertising",
      "icon": ShoppingBag,
      "examples": [
        "Create a sleek product shot of minimalist wireless headphones with studio lighting",
        "Design a holographic tarot card",
        "Create a custom vinyl record cover"
      ]
    },
    {
      "category": "Fantasy Concepts and Technical Details",
      "icon": Wand2,
      "examples": [
        "Chibi 3D kawaii sticker",
        "Bobblehead figurine style",
        "Cross-sectional diagram of a sci-fi spaceship engine with labeled parts"
      ]
    },
    {
      "category": "Prompt Templates",
      "icon": ClipboardList,
      "examples": [
        "Create a [scene/subject] in [art style] with [specific details: lighting, color, background, effects]",
        "Create a whimsical character design: a fox wizard in a forest, in watercolour style with glowing runes and misty lighting"
      ]
    }
  ]
};

export const initialPrompts: Prompt[] = [];
let idCounter = 1;
const baseDate = new Date();

userPromptsData.ImagePrompts.forEach(categoryData => {
  const categoryName = categoryData.category.toLowerCase() as Prompt['category'];
  categoryData.examples.forEach(exampleText => {
    initialPrompts.push({
      id: (idCounter++).toString(),
      text: exampleText,
      category: categoryName,
      // description: `Example prompt for ${categoryData.category}`, // Optional: add description
      icon: categoryData.icon,
      createdAt: new Date(baseDate.getTime() - idCounter * 1000), // Stagger createdAt for consistent sort order
    });
  });
});

// Example of an 'other' category prompt if needed
// initialPrompts.push({
//   id: (idCounter++).toString(),
//   text: 'Generate an abstract image representing digital transformation.',
//   category: 'other',
//   description: 'A generic prompt that does not fit other categories.',
//   icon: Shapes,
//   createdAt: new Date(baseDate.getTime() - idCounter * 1000),
// });

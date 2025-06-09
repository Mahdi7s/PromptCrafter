
import type { Prompt } from '@/types';
import { Palette, SquarePen, ImageUp, Sparkles, Wand2, Shapes } from 'lucide-react';

export const initialPrompts: Prompt[] = [
  {
    id: '1',
    text: 'Transform this photo into the style of Van Gogh\'s Starry Night.',
    category: 'style transfer',
    description: 'Applies a famous artistic style to an image.',
    icon: Palette,
    createdAt: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    text: 'Remove the person walking in the background.',
    category: 'object manipulation',
    description: 'Edits or removes objects within the image.',
    icon: SquarePen,
    createdAt: new Date('2024-01-16T11:30:00Z')
  },
  {
    id: '3',
    text: 'Change the background to a sunny beach.',
    category: 'background change',
    description: 'Replaces the existing background with a new one.',
    icon: ImageUp,
    createdAt: new Date('2024-01-17T14:20:00Z')
  },
  {
    id: '4',
    text: 'Enhance the colors and sharpness of this landscape photo.',
    category: 'enhancement',
    description: 'Improves image quality, colors, and details.',
    icon: Sparkles,
    createdAt: new Date('2024-01-18T09:00:00Z')
  },
  {
    id: '5',
    text: 'Apply a dreamy, ethereal glow effect.',
    category: 'artistic effects',
    description: 'Adds creative and artistic visual effects.',
    icon: Wand2,
    createdAt: new Date('2024-01-19T16:45:00Z')
  },
  {
    id: '6',
    text: 'Make the cat wear a tiny wizard hat.',
    category: 'object manipulation',
    description: 'Adds or modifies objects, often humorously.',
    icon: SquarePen,
    createdAt: new Date('2024-01-20T08:15:00Z')
  },
  {
    id: '7',
    text: 'Convert this portrait to a pencil sketch style.',
    category: 'style transfer',
    description: 'Mimics traditional art mediums.',
    icon: Palette,
    createdAt: new Date('2024-01-21T12:00:00Z')
  },
  {
    id: '8',
    text: 'Create a futuristic cityscape at night.',
    category: 'other',
    description: 'General image generation or complex scenes.',
    icon: Shapes,
    createdAt: new Date('2024-01-22T17:30:00Z')
  },
  {
    id: '9',
    text: 'Increase the resolution and detail of this old family photograph.',
    category: 'enhancement',
    description: 'Upscales and refines low-resolution or aged images.',
    icon: Sparkles,
    createdAt: new Date('2024-01-23T10:10:00Z')
  },
  {
    id: '10',
    text: 'Place this product on a clean, minimalist white background.',
    category: 'background change',
    description: 'Isolates an object and sets it against a neutral backdrop.',
    icon: ImageUp,
    createdAt: new Date('2024-01-24T11:45:00Z')
  },
  {
    id: '11',
    text: 'Render this scene as a watercolor painting with soft edges.',
    category: 'artistic effects',
    description: 'Simulates a specific artistic medium and technique.',
    icon: Wand2,
    createdAt: new Date('2024-01-25T15:05:00Z')
  },
];


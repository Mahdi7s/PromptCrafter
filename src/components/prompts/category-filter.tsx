import type { PromptCategory } from '@/types';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Palette, 
  Landmark, 
  PawPrint, 
  BookOpenText, 
  Camera, 
  ShoppingBag, 
  Wand2, 
  ClipboardList, 
  Shapes, // For 'other'
  ListFilter 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CategoryFilterProps {
  categories: PromptCategory[];
  selectedCategory: PromptCategory | 'all';
  onSelectCategory: (category: PromptCategory | 'all') => void;
}

const categoryIcons: Record<PromptCategory, LucideIcon> = {
  'art styles': Palette,
  'scenes and themes': Landmark,
  'animals and characters': PawPrint,
  'storytelling and comics': BookOpenText,
  'history and nostalgia': Camera,
  'product and advertising': ShoppingBag,
  'fantasy concepts and technical details': Wand2,
  'prompt templates': ClipboardList,
  'other': Shapes,
};

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <Button
        variant={selectedCategory === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectCategory('all')}
        className={cn(
          "rounded-full transition-all duration-300 shadow-sm hover:shadow-md",
          selectedCategory === 'all' ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent/10"
        )}
      >
        <ListFilter className="h-4 w-4 mr-2" />
        All
      </Button>
      {categories.map((category) => {
        const IconComponent = categoryIcons[category] || Shapes; // Fallback to Shapes icon
        return (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelectCategory(category)}
            className={cn(
              "capitalize rounded-full transition-all duration-300 shadow-sm hover:shadow-md",
              selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent/10"
            )}
          >
            <IconComponent className="h-4 w-4 mr-2" />
            {category}
          </Button>
        );
      })}
    </div>
  );
}

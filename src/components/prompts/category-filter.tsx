import type { PromptCategory } from '@/types';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette, SquarePen, ImageUp, Sparkles, Wand2, Shapes, ListFilter } from 'lucide-react';

interface CategoryFilterProps {
  categories: PromptCategory[];
  selectedCategory: PromptCategory | 'all';
  onSelectCategory: (category: PromptCategory | 'all') => void;
}

const categoryIcons: Record<PromptCategory, typeof Palette> = {
  'style transfer': Palette,
  'object manipulation': SquarePen,
  'background change': ImageUp,
  enhancement: Sparkles,
  'artistic effects': Wand2,
  other: Shapes,
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
        const IconComponent = categoryIcons[category];
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
            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
            {category}
          </Button>
        );
      })}
    </div>
  );
}

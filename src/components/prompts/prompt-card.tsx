'use client';

import type { Prompt } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, type ElementType } from 'react';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.text);
    toast({
      title: "Copied to clipboard!",
      description: `Prompt "${prompt.text.substring(0,30)}..." copied.`,
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const IconComponent = prompt.icon as ElementType | undefined;

  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="capitalize py-1 px-3 rounded-full text-sm bg-primary/10 text-primary border-primary/30">
            {IconComponent && <IconComponent className="h-4 w-4 mr-2" />}
            {prompt.category}
          </Badge>
        </div>
        <CardTitle className="text-lg font-headline mt-2 leading-tight break-words">
          {prompt.text}
        </CardTitle>
      </CardHeader>
      {prompt.description && (
        <CardContent className="pt-0 pb-4 text-sm text-muted-foreground flex-grow">
          <CardDescription>{prompt.description}</CardDescription>
        </CardContent>
      )}
      <CardFooter className="pt-0 mt-auto">
        <Button variant="outline" size="sm" onClick={handleCopy} className="w-full transition-all duration-300 hover:bg-accent/10">
          {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Copy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Prompt'}
        </Button>
      </CardFooter>
    </Card>
  );
}

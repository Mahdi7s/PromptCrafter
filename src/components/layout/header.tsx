
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Simplified Header: Removed searchTerm handling for now as main page is crafter.
// Search functionality might be re-added or adapted later.
export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex"> {/* Removed md:flex to always show */}
          <a href="/" className="mr-6 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="h-6 w-6 text-primary">
              <rect width="256" height="256" fill="none"></rect>
              <path d="M128,24a104,104,0,1,0,104,104A104.12,104.12,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" opacity="0.2" fill="currentColor"></path>
              <path d="M166.17,96.57a8,8,0,0,0-8.74-1.57l-56,24a8,8,0,0,0,0,14l56,24a8,8,0,0,0,8.74-1.57,8,8,0,0,0,1.57-8.74L150,128l17.74-19.69A8,8,0,0,0,166.17,96.57Z" fill="currentColor"></path>
            </svg>
            <span className="font-bold sm:inline-block font-headline text-xl">
              AIPromptoImage
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search bar can be re-enabled if needed for a future prompt list page */}
          {/* 
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search saved prompts..." // Placeholder updated
                className="pl-10 pr-4 py-2 h-10 rounded-lg border shadow-sm focus:ring-primary focus:border-primary transition-all duration-300"
                // value={searchTerm}
                // onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>
          */}
        </div>
      </div>
    </header>
  );
}

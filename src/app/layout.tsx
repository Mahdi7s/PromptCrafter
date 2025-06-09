
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'AIPromptoImage',
  description: 'Categorize and manage image transformation prompts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // LanguageProvider will set lang and dir on <html>
    <LanguageProvider>
      <html lang="en" dir="ltr"> 
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
          {/* Consider adding a dedicated Persian font if Inter/Poppins are not ideal */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet" /> */}
        </head>
        <body className="font-body antialiased">
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}

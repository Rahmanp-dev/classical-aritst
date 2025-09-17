import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Prata, Mukta } from 'next/font/google';
import { SiteBackground } from '@/components/layout/site-background';


const prata = Prata({ 
  subsets: ['latin'], 
  weight: '400',
  variable: '--font-prata' 
});
const mukta = Mukta({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mukta'
});

export const metadata: Metadata = {
  title: 'Acoustic Edge | Classical Music Reimagined',
  description: 'The official website for Acoustic Edge, a musical pioneer blending classical techniques with modern soundscapes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${prata.variable} ${mukta.variable}`}>
      <body className="font-body antialiased">
        <SiteBackground />
        <div className="relative z-10">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}

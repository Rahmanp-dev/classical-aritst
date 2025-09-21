
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, JetBrains_Mono } from 'next/font/google';
import { MusicBackground } from '@/components/ui/music-background';
import Script from 'next/script';


const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased">
        <MusicBackground />
        {children}
        <Toaster />
        <Script async src="//www.instagram.com/embed.js"></Script>
      </body>
    </html>
  );
}

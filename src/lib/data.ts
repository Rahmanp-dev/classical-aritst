import { PlaceHolderImages } from './placeholder-images';

export const artistName = "Acoustic Edge";
export const artistTagline = "Classical Music Reimagined";
export const artistBio = "Acoustic Edge is a musical pioneer, blending classical techniques with modern electronic soundscapes to create a truly unique auditory experience. With a background in classical cello and a passion for contemporary production, Acoustic Edge bridges centuries of music, captivating audiences worldwide.";

export const tourDates = [
  { date: 'OCT 25, 2024', venue: 'The Grand Hall', city: 'Berlin', ticketUrl: '#' },
  { date: 'NOV 02, 2024', venue: 'Symphony House', city: 'London', ticketUrl: '#' },
  { date: 'NOV 15, 2024', venue: 'Le Trianon', city: 'Paris', ticketUrl: '#' },
  { date: 'DEC 01, 2024', venue: 'Carnegie Hall', city: 'New York', ticketUrl: '#' },
];

export const musicLinks = [
  { platform: 'Spotify', url: '#', icon: 'spotify' },
  { platform: 'Apple Music', url: '#', icon: 'apple' },
  { platform: 'Youtube', url: '#', icon: 'youtube' },
  { platform: 'SoundCloud', url: '#', icon: 'soundcloud' },
];

export const galleryItems = [
  {
    id: 'gallery-1',
    title: 'Live at The Acropolis',
    description: 'An unforgettable night under the stars in Athens.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-1')!,
  },
  {
    id: 'gallery-2',
    title: 'Studio Sessions',
    description: 'Crafting the new album.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-2')!,
  },
  {
    id: 'gallery-3',
    title: 'Backstage Moments',
    description: 'The calm before the storm.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-3')!,
  },
  {
    id: 'gallery-4',
    title: 'The Crowd',
    description: 'Connecting with fans.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-4')!,
  },
  {
    id: 'gallery-5',
    title: 'In the Zone',
    description: 'Recording new sounds.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-5')!,
  },
  {
    id: 'gallery-6',
    title: 'Urban Explorer',
    description: 'Finding inspiration in the city.',
    image: PlaceHolderImages.find(img => img.id === 'gallery-6')!,
  },
];


export const socialLinks = [
  { platform: 'Instagram', url: '#', icon: 'instagram' },
  { platform: 'Twitter', url: '#', icon: 'twitter' },
  { platform: 'Facebook', url: '#', icon: 'facebook' },
];

export const navLinks = [
  { href: '#tour', label: 'Tour' },
  { href: '#music', label: 'Music' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

// This is a placeholder for a real authentication system.
// In a production app, you would use a secure method for admin access.
export const DUMMY_ADMIN_PASSWORD = "password123";

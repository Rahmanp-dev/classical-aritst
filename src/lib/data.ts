
export type ImageType = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type TourDate = {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
};

export type Link = {
  platform: string;
  url: string;
  icon: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: {
    imageUrl: string;
    imageHint: string;
  };
};

// In a real application, this data would be fetched from a CMS or database.
// For this demo, we're using a static file.
// The admin panel (`/src/app/admin/page.tsx`) uses this file for its default values.

export const artistName = "Aniruddh Aithal";
export const artistTagline = "Hindustani Classical Musician";
export const artistBio = "Aniruddh Aithal is a 24-year-old Hindustani classical musician with expertise in vocal music. He started formal training at 10 years old and has trained for 8 years with Smt. Geetha Garud Prithviraj, and now receives training from Dr. Ashok Huggannavar. He's an award-winning artist and a graded artist of All India Radio, and has received scholarships from CCRT and the Karnataka Sangeetha Nritya academy.";

export const heroImage: Omit<ImageType, "id" | "description"> = {
  imageUrl: "https://picsum.photos/seed/hero/1920/1080",
  imageHint: "musician stage"
};

export const artistImage: Omit<ImageType, "id" | "description"> = {
  imageUrl: "https://picsum.photos/seed/about/600/800",
  imageHint: "artist portrait"
};

export const tourImage: ImageType = {
  id: "tour-map",
  description: "An illustrative map showing tour locations.",
  imageUrl: "https://picsum.photos/seed/map/1200/800",
  imageHint: "tour map"
};


export const tourDates: TourDate[] = [
  { date: 'OCT 25, 2024', venue: 'The Grand Hall', city: 'Berlin', ticketUrl: '#' },
  { date: 'NOV 02, 2024', venue: 'Symphony House', city: 'London', ticketUrl: '#' },
  { date: 'NOV 15, 2024', venue: 'Le Trianon', city: 'Paris', ticketUrl: '#' },
  { date: 'DEC 01, 2024', venue: 'Carnegie Hall', city: 'New York', ticketUrl: '#' },
];

export const musicLinks: Link[] = [
  { platform: 'Spotify', url: '#', icon: 'spotify' },
  { platform: 'Apple Music', url: '#', icon: 'apple' },
  { platform: 'Youtube', url: '#', icon: 'youtube' },
  { platform: 'SoundCloud', url: '#', icon: 'soundcloud' },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Live at The Acropolis',
    description: 'An unforgettable night under the stars in Athens.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery1/600/400",
        imageHint: "concert hall"
    },
  },
  {
    id: 'gallery-2',
    title: 'Studio Sessions',
    description: 'Crafting the new album.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery2/600/400",
        imageHint: "playing instrument"
    },
  },
  {
    id: 'gallery-3',
    title: 'Backstage Moments',
    description: 'The calm before the storm.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery3/600/400",
        imageHint: "artist backstage"
    },
  },
  {
    id: 'gallery-4',
    title: 'The Crowd',
    description: 'Connecting with fans.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery4/600/400",
        imageHint: "concert crowd"
    },
  },
  {
    id: 'gallery-5',
    title: 'In the Zone',
    description: 'Recording new sounds.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery5/600/400",
        imageHint: "recording studio"
    },
  },
  {
    id: 'gallery-6',
    title: 'Urban Explorer',
    description: 'Finding inspiration in the city.',
    image: {
        imageUrl: "https://picsum.photos/seed/gallery6/600/400",
        imageHint: "artist urban"
    },
  },
];


export const socialLinks: Link[] = [
  { platform: 'Instagram', url: '#', icon: 'instagram' },
  { platform: 'Twitter', url: '#', icon: 'twitter' },
  { platform: 'Facebook', url: '#', icon: 'facebook' },
];

export const navLinks: NavLink[] = [
  { href: '#tour', label: 'Tour' },
  { href: '#music', label: 'Music' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

// This is a placeholder for a real authentication system.
// In a production app, you would use a secure method for admin access.
export const DUMMY_ADMIN_PASSWORD = "password123";

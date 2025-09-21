

export type ImageType = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
};

export type TourDate = {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
};

export type Link = {
  platform: string;
  url:string;
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
    imageHint?: string;
  };
};

export type InfoCard = {
  label: string;
  value: string;
  icon: string;
};

export type AboutStat = {
  label: string;
  value: string;
  icon: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  source: string;
};

export type YoutubeVideo = {
  id: string;
  url: string;
  title: string;
};

export type InstagramReel = {
  id: string;
  url: string;
  caption: string;
};


// This is the default content that will be inserted into the database
// if no content is found.
export const defaultContent = {
  artistName: "Aniruddh Aithal",
  artistTagline: "Hindustani Classical Musician",
  artistBio: "Aniruddh Aithal is a 24-year-old Hindustani classical musician with expertise in vocal music. He started formal training at 10 years old and has trained for 8 years with Smt. Geetha Garud Prithviraj, and now receives training from Dr. Ashok Huggannavar. He's an award-winning artist and a graded artist of All India Radio, and has received scholarships from CCRT and the Karnataka Sangeetha Nritya academy.",
  
  heroImage: {
    imageUrl: "https://picsum.photos/seed/hero/1920/1080",
    imageHint: "musician stage"
  },
  
  heroCTAs: {
    listenNow: "#music",
    upcomingShows: "#tour",
  },
  
  infoCards: [
    { label: "Latest Album", value: "Now Streaming", icon: "Headphones" },
    { label: "Live Shows", value: "World Tour 2025", icon: "Radio" },
    { label: "Platforms", value: "All Major Services", icon: "Volume2" }
  ],
  
  musicLinks: [
    { platform: 'Spotify', url: 'https://open.spotify.com', icon: 'spotify' },
    { platform: 'Apple Music', url: 'https://music.apple.com', icon: 'apple' },
    { platform: 'Youtube', url: 'https://youtube.com', icon: 'youtube' },
    { platform: 'SoundCloud', url: 'https://soundcloud.com', icon: 'soundcloud' },
  ],

  featuredVideoUrl: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
  startListeningUrl: "#music",

  youtubeVideos: [
    { id: 'yt-1', url: 'https://www.youtube.com/embed/LXb3EKWsInQ', title: 'Classical Rendition' },
    { id: 'yt-2', url: 'https://www.youtube.com/embed/LXb3EKWsInQ', title: 'Live Performance Clip' },
    { id: 'yt-3', url: 'https://www.youtube.com/embed/LXb3EKWsInQ', title: 'Studio Session' },
    { id: 'yt-4', url: 'https://www.youtube.com/embed/LXb3EKWsInQ', title: 'Acoustic Cover' },
  ],

  instagramReels: [
      { id: 'ig-1', url: 'https://www.instagram.com/p/C2-b_j_r_qW/', caption: 'Quick jam session' },
      { id: 'ig-2', url: 'https://www.instagram.com/p/C2-b_j_r_qW/', caption: 'Behind the scenes' },
      { id: 'ig-3', url: 'https://www.instagram.com/p/C2-b_j_r_qW/', caption: 'From the tour bus' },
  ],

  galleryItems: [
    {
      id: 'gallery-1',
      title: 'Live at The Acropolis',
      description: 'An unforgettable night under the stars in Athens.',
      image: { imageUrl: "https://picsum.photos/seed/gallery1/600/400", imageHint: "concert hall" },
    },
    {
      id: 'gallery-2',
      title: 'Studio Sessions',
      description: 'Crafting the new album.',
      image: { imageUrl: "https://picsum.photos/seed/gallery2/600/400", imageHint: "playing instrument" },
    },
    {
      id: 'gallery-3',
      title: 'Backstage Moments',
      description: 'The calm before the storm.',
      image: { imageUrl: "https://picsum.photos/seed/gallery3/600/400", imageHint: "artist backstage" },
    },
    {
      id: 'gallery-4',
      title: 'The Crowd',
      description: 'Connecting with fans.',
      image: { imageUrl: "https://picsum.photos/seed/gallery4/600/400", imageHint: "concert crowd" },
    },
    {
      id: 'gallery-5',
      title: 'In the Zone',
      description: 'Recording new sounds.',
      image: { imageUrl: "https://picsum.photos/seed/gallery5/600/400", imageHint: "recording studio" },
    },
    {
      id: 'gallery-6',
      title: 'Urban Explorer',
      description: 'Finding inspiration in the city.',
      image: { imageUrl: "https://picsum.photos/seed/gallery6/600/400", imageHint: "artist urban" },
    },
  ],

  artistImage: {
    imageUrl: "https://picsum.photos/seed/about/600/800",
    imageHint: "artist portrait"
  },

  aboutStats: [
    { label: 'Awards', value: '12+', icon: 'Award' },
    { label: 'Countries', value: '30+', icon: 'Globe' },
    { label: 'Albums', value: '8', icon: 'Music2' },
  ],

  pressKitUrl: "/press-kit.pdf",

  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  ],

  navLinks: [
    { href: '#tour', label: 'Tour' },
    { href: '#music', label: 'Music' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ],

  tourDates: [
    { date: 'OCT 25, 2024', venue: 'The Grand Hall', city: 'Berlin', ticketUrl: 'https://www.example.com' },
    { date: 'NOV 02, 2024', venue: 'Symphony House', city: 'London', ticketUrl: 'https://www.example.com' },
    { date: 'NOV 15, 2024', venue: 'Le Trianon', city: 'Paris', ticketUrl: 'https://www.example.com' },
    { date: 'DEC 01, 2024', venue: 'Carnegie Hall', city: 'New York', ticketUrl: 'https://www.example.com' },
  ],
  tourImage: {
    imageUrl: "https://picsum.photos/seed/map/1200/800",
    imageHint: "tour map"
  },

  testimonials: [
    { id: 't-1', quote: "A breathtaking performance that reimagines what classical music can be. A true innovator.", author: "Jane Doe", source: "Music Critic, The Times" },
    { id: 't-2', quote: "An absolute master of the craft. The live show is an experience you won't forget.", author: "John Smith", source: "Acoustic Magazine" },
    { id: 't-3', quote: "The new album is a masterpiece of composition and technical skill.", author: "Emily White", source: "Classical Today" },
  ],

  contact: {
    email: "booking@acousticedge.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  },
};

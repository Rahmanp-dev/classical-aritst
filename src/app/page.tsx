
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent, type SiteContent } from "@/lib/actions";
import { defaultContent } from "@/lib/data";

// Correct deep merge utility that handles arrays properly
function deepMerge(target: any, source: any): SiteContent {
  const isObject = (obj: any) => obj && typeof obj === 'object';
  
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      // For arrays, we will prefer the source (database) value if it exists and is an array.
      // If you wanted to merge array contents, this logic would be different.
      output[key] = sourceValue;
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue);
    } else {
      output[key] = sourceValue;
    }
  });

  return output as SiteContent;
}


export default async function Home() {
  const dbContent = await getSiteContent();
  // Use a deep merge to ensure all nested properties from defaultContent are present
  const content = deepMerge(defaultContent, dbContent);


  return (
    <div className="flex flex-col min-h-dvh">
      <Header navLinks={content.navLinks} artistName={content.artistName} />
      <main className="flex-1">
        <HeroSection 
          heroImage={content.heroImage}
          artistName={content.artistName}
          artistTagline={content.artistTagline}
          heroCTAs={content.heroCTAs}
          infoCards={content.infoCards}
        />
        <TourSection tourDates={content.tourDates} tourImage={content.tourImage} />
        <MusicSection 
          musicLinks={content.musicLinks}
          featuredVideoUrl={content.featuredVideoUrl}
          startListeningUrl={content.startListeningUrl}
        />
        <GallerySection galleryItems={content.galleryItems} />
        <AboutSection 
          artistImage={content.artistImage}
          artistName={content.artistName}
          artistBio={content.artistBio}
          stats={content.aboutStats}
          pressKitUrl={content.pressKitUrl}
        />
        <ContactSection contactInfo={content.contact} />
      </main>
      <Footer 
        socialLinks={content.socialLinks}
        navLinks={content.navLinks}
        artistName={content.artistName}
      />
    </div>
  );
}

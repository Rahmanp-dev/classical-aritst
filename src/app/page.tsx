
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { getSiteContent, type SiteContent } from "@/lib/actions";
import { defaultContent } from "@/lib/data";

// Correct deep merge utility that handles arrays properly
function deepMerge(target: any, source: any): SiteContent {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);

  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceValue = source[key];
      if (isObject(sourceValue)) {
        if (!(key in target) || !isObject(target[key])) {
          output[key] = sourceValue;
        } else {
          output[key] = deepMerge(target[key], sourceValue);
        }
      } else if (Array.isArray(sourceValue)) {
        // If the source has an array, prefer it, unless it's empty.
        // This prevents an empty array from the DB from overwriting default content.
        if(sourceValue.length > 0) {
          output[key] = sourceValue;
        } else if (!target[key] || target[key].length === 0) {
          output[key] = sourceValue;
        }
      } else {
        output[key] = sourceValue;
      }
    });
  }

  // Ensure all keys from defaultContent are present, even if not in source
  Object.keys(defaultContent).forEach(key => {
    if (!(key in output)) {
      output[key] = (defaultContent as any)[key];
    }
    // ensure nested objects are also carried over if they don't exist at all in the source
    if (isObject((defaultContent as any)[key]) && (!output[key] || !isObject(output[key]))) {
        output[key] = deepMerge(output[key] || {}, (defaultContent as any)[key]);
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
          youtubeVideos={content.youtubeVideos}
          instagramReels={content.instagramReels}
        />
        <GallerySection galleryItems={content.galleryItems} />
        <TestimonialsSection testimonials={content.testimonials} />
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


import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent } from "@/lib/actions";
import { defaultContent } from "@/lib/data";

export default async function Home() {
  const dbContent = await getSiteContent();
  const content = { ...defaultContent, ...dbContent };


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

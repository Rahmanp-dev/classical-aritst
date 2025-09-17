
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { TourSection } from "@/components/sections/tour-section";
import { MusicSection } from "@/components/sections/music-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { getSiteContent } from "@/lib/actions";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <div className="flex flex-col min-h-dvh bg-transparent">
      <Header navLinks={content.navLinks} artistName={content.artistName} />
      <main className="flex-1">
        <HeroSection 
          heroImage={content.heroImage}
          artistName={content.artistName}
          artistTagline={content.artistTagline}
        />
        <TourSection tourDates={content.tourDates} tourImage={content.tourImage} />
        <MusicSection musicLinks={content.musicLinks} />
        <GallerySection galleryItems={content.galleryItems} />
        <AboutSection 
          artistImage={content.artistImage}
          artistName={content.artistName}
          artistBio={content.artistBio}
        />
        <ContactSection />
      </main>
      <Footer 
        socialLinks={content.socialLinks}
        navLinks={content.navLinks}
        artistName={content.artistName}
      />
    </div>
  );
}

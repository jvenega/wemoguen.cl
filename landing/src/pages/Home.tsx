import Hero from "../components/pages/hero/Hero";
import AboutSection from "../components/pages/about/AboutSection";
import CommunitySection from "../components/pages/community/CommunitySection";
import AgreementsSection from "../components/pages/agreements/AgreementSection";
import ContactSection from "../components/pages/contact/ContactSection";
import BlogPreviewSection from "../components/pages/blog/BlogPreviewSection";
export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CommunitySection />
      <BlogPreviewSection />
      <AgreementsSection />
      <ContactSection />

      {/* Secciones siguientes (placeholder por ahora) */}
     
    </>
  );
}

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { Particles } from "@/components/ui/Particles";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { BackToTop } from "@/components/ui/BackToTop";
import { ShareButton } from "@/components/ui/ShareButton";
import { GitHubStats } from "@/components/ui/GitHubStats";
import { ThreeBackground } from "@/components/ui/ThreeBackground";
import { useForm } from "@/hooks/useForm";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { formData, formStatus, handleSubmit, updateField } = useForm();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]">
            <div className="h-8 w-8 animate-pulse rounded-full bg-[var(--primary)]" />
          </div>
        )}
      </AnimatePresence>

      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen((o) => !o)}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <main>
        <Hero />
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url(/photo.jpeg)", backgroundAttachment: "fixed" }}
          />
          <SectionDivider />
        </div>
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Services />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Blog />
        <SectionDivider />
        <GitHubStats />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <Contact
          formData={formData}
          formStatus={formStatus}
          onSubmit={handleSubmit}
          onFieldChange={updateField}
        />
      </main>

      <ThreeBackground />
      <Particles />
      <ScrollProgress />
      <BackToTop />
      <ShareButton />
      <Footer />
      <Chatbot />
      <CursorFollower />
    </div>
  );
}

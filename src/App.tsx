import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { Particles } from "@/components/ui/Particles";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionDivider } from "@/components/ui/SectionDivider";
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
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Certifications />
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

      <Particles />
      <ScrollProgress />
      <Footer />
      <Chatbot />
      <CursorFollower />
    </div>
  );
}

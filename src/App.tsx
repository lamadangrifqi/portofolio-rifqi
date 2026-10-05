import { usePageScroll } from "./hooks/usePageScroll";
import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { BrandSection } from "./components/BrandSection";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { Gallery } from "./components/Gallery";
import { KaryaSection } from "./components/KaryaSection";
import { LayananSection } from "./components/LayananSection";
import { TechStackSection } from "./components/TechStackSection";
import { CareerJourneySection } from "./components/CareerJourneySection";
import { WorkflowSection } from "./components/WorkflowSection";
import { InteractiveLabSection } from "./components/InteractiveLabSection";
import { ContactSocialSection } from "./components/ContactSocialSection";
import { Footer } from "./components/Footer";
import { HireMeModal } from "./components/HireMeModal";
export default function App() {
  const navigate = usePageScroll();
  const [hireModalOpen, setHireModalOpen] = useState(false);
  const [modalServiceId, setModalServiceId] = useState<string>();
  const openHire = (serviceId?: string) => {
    setModalServiceId(serviceId);
    setHireModalOpen(true);
  };
  return (
    <div
      id="app-root"
      className="min-h-screen bg-black text-white selection:bg-red-500 selection:text-white flex flex-col font-sans"
    >
      <a
        href="#karya"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          navigate("karya");
          document.getElementById("karya")?.focus({ preventScroll: true });
        }}
      >
        Langsung ke karya
      </a>
      <Navbar onOpenHireModal={openHire} />
      <main>
        <HeroSection onOpenHireModal={openHire} />
        <BrandSection />
        <AboutSection onOpenHireModal={openHire} />
        <KaryaSection onOpenHireModal={openHire} />
        <Gallery />
        <LayananSection onOpenHireModal={openHire} />
        <section
          id="stack"
          className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10"
        >
          <TechStackSection />
        </section>
        <CareerJourneySection />
        <section
          id="workflow"
          className="relative z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/10"
        >
          <WorkflowSection />
        </section>
        <InteractiveLabSection />
        <ContactSocialSection onOpenHireModal={openHire} />
      </main>
      <Footer />
      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
        initialServiceId={modalServiceId}
      />
    </div>
  );
}

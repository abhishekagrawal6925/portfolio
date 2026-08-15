"use client";

import { useState } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  return (
    <main className="min-h-screen bg-[#FAF2EE] relative selection:bg-[#0F3040] selection:text-[#D99B7F]">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Initial Loading Splash Animation */}
      <LoadingScreen />

      {/* Navigation Header */}
      <Navbar onOpenConsultation={openConsultation} />

      {/* 1. Hero Section */}
      <Hero onOpenConsultation={openConsultation} />

      {/* 2. About Section */}
      <About />

      {/* 3. Why Choose Us */}
      <WhyChooseUs onOpenConsultation={openConsultation} />

      {/* 4. Services */}
      <Services onOpenConsultation={openConsultation} />

      {/* 5. Process */}
      <Process />

      {/* 6. FAQs */}
      <FAQ />

      {/* 8. Contact */}
      <Contact />

      {/* 9. Footer */}
      <Footer />

      {/* Consultation Popup Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
      />

      {/* Floating WhatsApp Contact Widget */}
      <WhatsAppButton />
    </main>
  );
}

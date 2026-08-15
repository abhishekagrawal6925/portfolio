"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  PieChart,
  ShieldCheck,
  Landmark,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Calendar,
  HelpCircle,
  ChevronDown,
  Award,
  Clock,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getServiceByCategorySlug, serviceCategoriesData } from "@/data/servicesData";
import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

const iconMap = {
  FileText: FileText,
  PieChart: PieChart,
  ShieldCheck: ShieldCheck,
  Landmark: Landmark,
  Briefcase: Briefcase,
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const service = getServiceByCategorySlug(slug);

  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#FAF2EE] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-[#0F3040]">Service Not Found</h1>
          <p className="text-sm text-[#464858]">The requested practice area does not exist or has been moved.</p>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F3040] text-white text-xs font-semibold hover:bg-[#A56F63] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Services</span>
          </Link>
        </div>
      </main>
    );
  }

  const IconComponent = iconMap[service.iconName];

  return (
    <main className="min-h-screen bg-[#FAF2EE] text-[#0F3040] relative selection:bg-[#0F3040] selection:text-[#D99B7F]">
      {/* Navigation Bar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Hero Header for Service */}
      <section className="pt-32 pb-20 bg-[#0F3040] text-white relative overflow-hidden">
        <GridPattern
          width={32}
          height={32}
          strokeDasharray="4 2"
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "opacity-30 stroke-[#D99B7F]/40"
          )}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs text-[#FAF2EE]/70 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#D99B7F] font-semibold">{service.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D99B7F]/30 backdrop-blur-md text-xs font-bold text-[#D99B7F] tracking-wider uppercase"
              >
                <IconComponent className="w-4 h-4 text-[#D99B7F]" />
                <span>{service.badge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-sans text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white"
              >
                {service.title} Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-[#FAF2EE]/85 max-w-2xl leading-relaxed"
              >
                {service.fullDesc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="px-7 py-3.5 rounded-xl bg-[#D99B7F] text-[#0F3040] font-bold text-xs uppercase tracking-wider hover:bg-[#c88b6f] transition-all shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation for {service.title}</span>
                </button>

                <Link
                  href="/#services"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>View Other Services</span>
                </Link>
              </motion.div>
            </div>

            {/* Right Card Summary Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 border border-white/15 space-y-5">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center shrink-0`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Expert CA Oversight</h4>
                    <p className="text-xs text-[#FAF2EE]/70">Pankaj Agrawal & Co.</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#FAF2EE]/80">
                    <span>Turnaround</span>
                    <span className="font-semibold text-white">Prompt & Timely</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#FAF2EE]/80">
                    <span>Compliance Assurance</span>
                    <span className="font-semibold text-white">100% Statutory</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#FAF2EE]/80">
                    <span>Lead CA Partner</span>
                    <span className="font-semibold text-[#D99B7F]">Mr. Pankaj Agrawal</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Detailed Scope of Work Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#A56F63] uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-[#A56F63]/20 shadow-xs">
            Comprehensive Offerings
          </span>
          <h2 className="text-3xl font-bold text-[#0F3040] mt-3">
            Detailed Scope of {service.title} Services
          </h2>
          <p className="text-xs sm:text-sm text-[#464858] mt-2">
            Structured solutions designed to meet statutory requirements and protect your financial interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.detailedScope.map((scope, idx) => (
            <motion.div
              key={scope.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-[#A56F63]/20 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-[#0F3040]/10 text-[#0F3040] flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F3040]">{scope.title}</h3>
                </div>

                <p className="text-xs sm:text-sm text-[#464858] leading-relaxed mb-5">
                  {scope.desc}
                </p>

                {scope.items && (
                  <div className="space-y-2 pt-4 border-t border-[#A56F63]/15">
                    {scope.items.map((sub, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#0F3040] font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#A56F63] shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Benefits & Deliverables Split Section */}
      <section className="py-20 bg-white border-y border-[#A56F63]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Left: Key Benefits */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#A56F63] uppercase tracking-wider">Why Choose Us</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F3040] mt-1">
                  Key Benefits &amp; Advantage
                </h3>
              </div>

              <div className="space-y-4">
                {service.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FAF2EE] border border-[#A56F63]/15">
                    <div className="w-7 h-7 rounded-xl bg-[#0F3040] text-[#D99B7F] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#0F3040] font-semibold leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Deliverables */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#A56F63] uppercase tracking-wider">What You Receive</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0F3040] mt-1">
                  Client Deliverables & Outputs
                </h3>
              </div>

              <div className="bg-[#0F3040] text-white rounded-3xl p-8 space-y-4 shadow-xl border border-[#D99B7F]/30">
                {service.deliverables.map((deliv, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-white/10 last:border-b-0 last:pb-0">
                    <CheckCircle2 className="w-5 h-5 text-[#D99B7F] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#FAF2EE]/90 font-medium leading-relaxed">{deliv}</span>
                  </div>
                ))}

                <div className="pt-4 mt-4 border-t border-white/15">
                  <button
                    onClick={() => setIsConsultationOpen(true)}
                    className="w-full py-3 px-4 rounded-xl bg-[#D99B7F] text-[#0F3040] font-bold text-xs uppercase tracking-wider hover:bg-[#c88b6f] transition-colors shadow-md cursor-pointer"
                  >
                    Request Proposal for {service.title}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-[#A56F63] uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-[#A56F63]/20 shadow-xs">
            Got Questions?
          </span>
          <h2 className="text-3xl font-bold text-[#0F3040] mt-3">
            {service.title} FAQs
          </h2>
        </div>

        <div className="space-y-4">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#A56F63]/20 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-[#0F3040] text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#A56F63] shrink-0 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-[#464858] leading-relaxed border-t border-[#A56F63]/10">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F3040] text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-[#D99B7F]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Need Expert Guidance in {service.title}?</h3>
            <p className="text-xs sm:text-sm text-[#FAF2EE]/80 max-w-xl">
              Schedule a direct consultation with Mr. Pankaj Agrawal (Qualified CA) to discuss your specific requirements.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <button
              onClick={() => setIsConsultationOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-[#D99B7F] text-[#0F3040] font-bold text-xs uppercase tracking-wider hover:bg-[#c88b6f] transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </main>
  );
}

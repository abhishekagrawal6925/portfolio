"use client";

import { motion } from "framer-motion";
import { Award, Clock, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";

import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

interface WhyChooseUsProps {
  onOpenConsultation: () => void;
}

export default function WhyChooseUs({ onOpenConsultation }: WhyChooseUsProps) {
  const cards = [
    {
      title: "Professional Knowledge",
      subtitle: "In-Depth Domain Knowledge",
      desc: "Professinal knowledge and experience in Direct & Indirect Taxation, GST, audit and regulatory compliance, supported by rigorous professional standards.",
      icon: Award,
      badge: "Expert CA Oversight",
    },
    {
      title: "Structured Compliance Support",
      subtitle: "Zero Penalty Assurance",
      desc: "Systematic compliance processes designed to help businesses meet applicable statutory and regulatory requirements within prescribed timelines.",
      icon: Clock,
      badge: "Punctual Filings",
    },
    {
      title: "Practical Professional Guidance",
      subtitle: "Custom Tailored Strategy",
      desc: "Direct professional engagement to understand business requirements and provide practical guidance suited to the circumstances of each assignment.",
      icon: HeartHandshake,
      badge: "Proprietor Driven",
    },
    {
      title: "Professional & Transparent Approach",
      subtitle: "End-to-End Partnership",
      desc: "Clear communication, transparent fee arrangements and professional support throught the engagement.",
      icon: ShieldCheck,
      badge: "Always Accessible",
    },
  ];

  return (
    <section id="our-values" className="py-24 bg-[#FAF2EE] relative overflow-hidden">
      <GridPattern
        width={32}
        height={32}
        strokeDasharray="4 2"
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "opacity-60 stroke-[#464858]/20"
        )}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] shadow-xs mb-3"
          >
            Why Partner With Us
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Built on Professional Excellence, Integrity &amp; Trust
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-4 leading-relaxed"
          >
            We provide professional guidance across taxation, audit, accounting and regulatory compliance, with a focus on sound financial practices and informed business decisionns.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white/90 rounded-2xl p-7 border border-[#A56F63]/20 shadow-luxury hover:shadow-luxury-hover hover:border-[#A56F63]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0F3040]/10 group-hover:bg-[#0F3040] group-hover:text-[#D99B7F] text-[#0F3040] flex items-center justify-center transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#A56F63] group-hover:text-[#0F3040] transition-colors bg-[#FAF2EE] px-2.5 py-1 rounded-md border border-[#A56F63]/20">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-bold text-[#0F3040] group-hover:text-black transition-colors mb-1">
                    {card.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#A56F63] mb-3">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-[#464858] leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("services");
                    if (element) {
                      const navHeaderHeight = 70;
                      const targetPosition = element.offsetTop - navHeaderHeight;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="pt-6 mt-6 border-t border-[#A56F63]/15 flex items-center justify-between text-xs font-semibold text-[#0F3040] group-hover:text-[#A56F63] transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-[#0F3040] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#D99B7F]/30"
        >
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-sans text-2xl font-bold text-white">Tax & Regulatory Compliance</h3>
            <p className="text-xs sm:text-sm text-[#FAF2EE]/80 max-w-xl">
              Professional services relating to GST, Income Tax and corporate regulatory matters.
            </p>
          </div>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("services");
              if (element) {
                const navHeaderHeight = 70;
                const targetPosition = element.offsetTop - navHeaderHeight;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#D99B7F] text-[#0F3040] font-bold text-xs uppercase tracking-wider hover:bg-[#c88b6f] transition-colors shadow-sm cursor-pointer inline-flex items-center justify-center"
          >
            View Services
          </a>
        </motion.div>

      </div>
    </section>
  );
}

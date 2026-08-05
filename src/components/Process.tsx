"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, Rocket, ShieldAlert } from "lucide-react";

export default function Process() {
  const steps = [
    {
      stepNumber: "01",
      title: "Consultation",
      desc: "Initial discussion to review your financial requirements, business entity, and tax situation.",
      icon: MessageSquare,
    },
    {
      stepNumber: "02",
      title: "Understanding Requirements",
      desc: "In-depth audit of financial books, past tax filings, GST data, and statutory compliance needs.",
      icon: Search,
    },
    {
      stepNumber: "03",
      title: "Planning",
      desc: "Formulating a tailored tax-saving roadmap, statutory filing schedules, and audit protocols.",
      icon: FileCheck,
    },
    {
      stepNumber: "04",
      title: "Execution",
      desc: "Precise drafting of tax computations, GST returns, ROC forms, and statutory audit verification.",
      icon: Rocket,
    },
    {
      stepNumber: "05",
      title: "Compliance & Support",
      desc: "Continuous advisory, notice resolution support, and ongoing regulatory guidance.",
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#FAF2EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] shadow-xs mb-3"
          >
            Structured Engagement Model
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Our Seamless 5-Step Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-4 leading-relaxed"
          >
            A transparent and disciplined approach designed to eliminate tax hassle, meet statutory deadlines, and safeguard your financial integrity.
          </motion.p>
        </div>

        {/* Timeline Grid Layout */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#A56F63]/25 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.stepNumber}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white/90 p-6 rounded-2xl border border-[#A56F63]/20 shadow-luxury hover:shadow-luxury-hover hover:border-[#A56F63]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F3040] text-[#D99B7F] flex items-center justify-center font-sans text-lg font-bold shadow-md group-hover:bg-[#0A222E] transition-colors">
                        <IconComponent className="w-6 h-6 text-[#D99B7F]" />
                      </div>
                      <span className="font-sans text-2xl font-bold text-[#464858]/35 group-hover:text-[#A56F63] transition-colors">
                        {item.stepNumber}
                      </span>
                    </div>

                    <h3 className="font-sans text-lg font-bold text-[#0F3040] mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#464858] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#A56F63]/15 flex items-center justify-between text-[11px] font-semibold text-[#464858]">
                    <span>Phase {idx + 1}</span>
                    <span className="w-2 h-2 rounded-full bg-[#D99B7F]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

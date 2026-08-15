"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileText, Settings, ShieldCheck, Info } from "lucide-react";

export default function Process() {
  const steps = [
    {
      stepNumber: "01",
      title: "Consultation",
      desc: "Initial discussion to understand your requirements, review available information and the scope of engagement.",
      icon: MessageSquare,
      phase: "Phase 1",
    },
    {
      stepNumber: "02",
      title: "Understanding Requirements",
      desc: "Detailed review of financial information, past records, tax data and applicable compliance requirements.",
      icon: Search,
      phase: "Phase 2",
    },
    {
      stepNumber: "03",
      title: "Planning",
      desc: "Developing a tailored plan, timelines and documentation checklist based on applicable laws and professional standards.",
      icon: FileText,
      phase: "Phase 3",
    },
    {
      stepNumber: "04",
      title: "Execution",
      desc: "Preparing, reviewing and filing returns, forms and representations with accuracy and due care.",
      icon: Settings,
      phase: "Phase 4",
    },
    {
      stepNumber: "05",
      title: "Compliance & Ongoing Support",
      desc: "Providing ongoing support, responding to notices and advising on regulatory matters as applicable.",
      icon: ShieldCheck,
      phase: "Phase 5",
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#FAF2EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-bold uppercase tracking-wider text-[#A56F63] shadow-xs mb-4"
          >
            OUR WORK APPROACH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Our 5-Step Engagement Process
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-3 leading-relaxed max-w-2xl mx-auto"
          >
            A transparent and disciplined approach to deliver professional services with quality, confidentiality and compliance.
          </motion.p>
        </div>

        {/* 5 Cards Grid */}
        <div className="relative mb-16">
          {/* Dashed Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-10 right-10 border-t-2 border-dashed border-[#A56F63]/30 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.stepNumber}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative bg-white/95 p-6 rounded-2xl border border-[#A56F63]/20 shadow-luxury hover:shadow-luxury-hover hover:border-[#A56F63]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Icon & Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-[#FAF2EE] text-[#A56F63] border border-[#A56F63]/25 flex items-center justify-center transition-colors group-hover:bg-[#0F3040] group-hover:text-white group-hover:border-[#0F3040]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-sans text-xl font-extrabold text-[#A56F63]">
                        {item.stepNumber}
                      </span>
                    </div>

                    <h3 className="font-sans text-base font-bold text-[#0F3040] mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#464858] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#A56F63]/15 flex items-center justify-between text-[11px] font-semibold text-[#464858]">
                    <span>{item.phase}</span>
                    <span className="w-2 h-2 rounded-full bg-[#D99B7F]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Commitment Banner (Image 2 design) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#A56F63]/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
        >
          <div className="w-10 h-10 rounded-full bg-[#FAF2EE] text-[#A56F63] border border-[#A56F63]/30 flex items-center justify-center font-serif text-lg font-bold italic shrink-0">
            i
          </div>
          <div className="space-y-1">
            <h4 className="font-sans text-sm font-bold text-[#0F3040]">
              Our Commitment
            </h4>
            <p className="text-xs text-[#464858] leading-relaxed">
              We adhere to the Code of Ethics issued by ICAI. We maintain confidentiality, act in the best interest of our clients, and comply with all applicable professional and regulatory requirements.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

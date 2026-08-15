"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  PieChart,
  ShieldCheck,
  Landmark,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { serviceCategoriesData } from "@/data/servicesData";
import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

interface ServicesProps {
  onOpenConsultation?: () => void;
}

const iconMap = {
  FileText: FileText,
  PieChart: PieChart,
  ShieldCheck: ShieldCheck,
  Landmark: Landmark,
  Briefcase: Briefcase,
};

export default function Services({ onOpenConsultation }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-[#FAF2EE] relative overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        squares={[
          [2, 3],
          [5, 8],
          [10, 4],
        ]}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-40 stroke-[#464858]/20"
        )}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] mb-3 shadow-xs"
          >
            Practice Areas &amp; Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Tax, Audit &amp; Regulatory Compliance Services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-4 leading-relaxed"
          >
            Professional services in taxation, audit, accounting and regulatory compliance, provided in accordance with applicable laws and professional standards.
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategoriesData.map((service, idx) => {
            const IconComponent = iconMap[service.iconName];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group relative bg-white/95 rounded-3xl p-8 border border-[#A56F63]/20 shadow-luxury hover:shadow-luxury-hover ${service.borderHover} transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  {/* Category Soft Pastel Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-105`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                  </div>

                  <h3 className="font-sans text-2xl font-bold text-[#0F3040] group-hover:text-[#A56F63] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#464858] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Service Sub-items list with checkmarks */}
                  <div className="space-y-2.5 mb-8 pt-5 border-t border-[#A56F63]/15">
                    {service.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#0F3040] font-medium leading-tight">
                        <CheckCircle2 className="w-4 h-4 text-[#A56F63] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More link going to dedicated detail page */}
                <div className="pt-4 border-t border-[#A56F63]/15 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0F3040] group-hover:text-[#A56F63] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

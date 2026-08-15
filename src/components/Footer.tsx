"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  MapPin,
  Smartphone,
} from "lucide-react";
import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const usefulLinks = [
    { name: "Income Tax Dept.", href: "https://www.incometax.gov.in", external: true },
    { name: "Central Board of Direct Taxes (CBDT)", href: "https://www.incometaxindia.gov.in", external: true },
    { name: "GST Portal", href: "https://www.gst.gov.in", external: true },
    { name: "Ministry of Corporate Affairs (MCA)", href: "https://www.mca.gov.in", external: true },
    { name: "Employees Provident Fund (EPFO)", href: "https://www.epfindia.gov.in", external: true },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About Us", href: "#about" },
    { name: "Practice Areas", href: "#services" },
    { name: "Engagement Process", href: "#process" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <footer className="bg-[#0F3040] text-gray-300 relative overflow-hidden font-sans border-t border-[#D99B7F]/20">
      {/* 21st Dev SVG Grid Background Pattern with Dark Mask */}
      <GridPattern
        width={32}
        height={32}
        strokeDasharray="2 2"
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "opacity-20 stroke-[#D99B7F]/30 fill-white/[0.01]"
        )}
      />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-12">

        {/* Top 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">

          {/* Col 1: More Info (Left -> Right Entrance) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <h3 className="text-xl font-bold text-white tracking-wide">
              More Info
            </h3>

            <p className="text-xs text-[#FAF2EE]/80 leading-relaxed max-w-md">
              Pankaj Agrawal &amp; Co. is a qualified Chartered Accountancy firm committed to delivering high-precision Direct &amp; Indirect Taxation, Statutory Audits, GST Litigation &amp; Business Advisory solutions across India.
            </p>

            {/* Corporate Brand Emblem */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="pt-3 flex items-center gap-3.5"
            >
              <div className="h-10 px-3 rounded-xl bg-[#D99B7F] text-[#0F3040] flex items-center justify-center gap-1 font-sans shadow-sm select-none leading-none shrink-0">
                <span className="text-xs sm:text-sm font-bold tracking-tight text-[#0F3040]">PACO</span>
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-bold text-base tracking-wide text-white uppercase leading-tight">
                  PANKAJ AGRAWAL &amp; CO.
                </span>
                <span className="font-sans font-semibold text-[10px] tracking-[0.18em] uppercase text-[#D99B7F] mt-0.5">
                  CHARTERED ACCOUNTANTS
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Col 2: Useful Links (Up -> Down Entrance) */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-4"
          >
            <h3 className="text-xl font-bold text-white tracking-wide">
              Useful Links
            </h3>

            <ul className="space-y-2.5 text-xs">
              {usefulLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                  whileHover={{ x: 6, color: "#ffffff" }}
                >
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="group inline-flex items-center gap-2 text-[#FAF2EE]/80 hover:text-white transition-colors"
                  >
                    <span className="text-[#D99B7F] group-hover:text-white transition-colors font-mono">→</span>
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Quick Links (Right -> Left Entrance) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-4"
          >
            <h3 className="text-xl font-bold text-white tracking-wide">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + idx * 0.08 }}
                  whileHover={{ x: -4, color: "#ffffff" }}
                >
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[#FAF2EE]/80 hover:text-white transition-colors"
                  >
                    <span className="text-[#D99B7F] group-hover:text-white transition-colors font-mono">→</span>
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Middle Info Row: 3 Bordered Contact Cards with Staggered Scale & Fade-Up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10">

          {/* Card 1: Address */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{
              y: -5,
              borderColor: "rgba(217, 155, 127, 0.5)",
              backgroundColor: "rgba(70, 72, 88, 0.2)",
              boxShadow: "0 12px 30px -10px rgba(217, 155, 127, 0.2)",
            }}
            className="bg-[#464858]/20 border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D99B7F]/10 border border-[#D99B7F]/30 text-[#D99B7F] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                ADDRESS
              </h4>
              <p className="text-xs text-[#FAF2EE]/80 mt-1 leading-relaxed">
                Head Office - C-730, Vikaspuri, New Delhi – 110018, India.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Reach Us */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            whileHover={{
              y: -5,
              borderColor: "rgba(217, 155, 127, 0.5)",
              backgroundColor: "rgba(70, 72, 88, 0.2)",
              boxShadow: "0 12px 30px -10px rgba(217, 155, 127, 0.2)",
            }}
            className="bg-[#464858]/20 border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D99B7F]/10 border border-[#D99B7F]/30 text-[#D99B7F] flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wide">
                Reach Us
              </h4>
              <p className="text-xs text-[#FAF2EE]/80 mt-1 leading-relaxed">
                connect with us on{" "}
                <a
                  href="tel:+918273801105"
                  className="text-white hover:text-[#D99B7F] transition-colors font-medium"
                >
                  +91 8273801105
                </a>
              </p>
            </div>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 35 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{
              y: -5,
              borderColor: "rgba(217, 155, 127, 0.5)",
              backgroundColor: "rgba(70, 72, 88, 0.2)",
              boxShadow: "0 12px 30px -10px rgba(217, 155, 127, 0.2)",
            }}
            className="bg-[#464858]/20 border border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D99B7F]/10 border border-[#D99B7F]/30 text-[#D99B7F] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                EMAIL
              </h4>
              <p className="text-xs text-[#FAF2EE]/80 mt-1 leading-relaxed">
                Write to us on{" "}
                <a
                  href="mailto:pankaj@pacoadvisory.com"
                  className="text-white hover:text-[#D99B7F] transition-colors font-medium break-all"
                >
                  pankaj@pacoadvisory.com
                </a>
              </p>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Bottom Bar with Fade-Up Animation */}
      <div className="bg-[#0A222E] border-t border-white/10 py-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF2EE]/70"
        >
          <div>
            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Pankaj Agrawal &amp; Co.</span> All rights reserved. Registered Chartered Accountant Firm, New Delhi.
          </div>

          <div className="flex items-center gap-4">
            {/* Social Link */}
            <motion.a
              href="https://www.linkedin.com/in/pankaj-agrawal-b110b31a1?"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-[#D99B7F]/20 text-[#D99B7F] hover:bg-[#D99B7F] hover:text-[#0F3040] flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
              </svg>
            </motion.a>

            {/* Scroll To Top Button */}
            <motion.button
              onClick={scrollToTop}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.15, rotate: 6, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-10 h-10 rounded-full bg-[#D99B7F] hover:bg-[#c88b6f] text-[#0F3040] flex items-center justify-center shadow-lg transition-colors ml-2 cursor-pointer font-bold"
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

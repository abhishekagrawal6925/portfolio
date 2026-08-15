"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, FileText, PieChart, Scale } from "lucide-react";

import { GridPattern } from "@/components/ui/GridPattern";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ConnectingBeams } from "@/components/ui/ConnectingBeams";
import { cn } from "@/lib/utils";

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Magnetic Tilt Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setActiveCardIndex(null);
  };

  const floatingCards = [
    {
      id: 0,
      title: "GST Compliance",
      desc: "Registration, Filings & Refunds",
      icon: FileText,
      delay: 0.1,
      position: "-top-10 -left-2 sm:-top-12 sm:-left-10",
      floatKeyframes: {
        y: [0, -8, 0, 8, 0],
        x: [0, 3, 0, -3, 0],
        rotate: [0, -1.5, 0, 1.5, 0],
      },
      duration: 5.5,
    },
    {
      id: 1,
      title: "Audit & Assurance",
      desc: "Statutory & Tax Audits",
      icon: ShieldCheck,
      delay: 0.2,
      position: "-top-10 -right-2 sm:-top-12 sm:-right-10",
      floatKeyframes: {
        y: [0, 8, 0, -8, 0],
        x: [0, -3, 0, 3, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      },
      duration: 6.2,
    },
    {
      id: 2,
      title: "Tax Planning",
      desc: "Direct Tax & ITR Filing",
      icon: PieChart,
      delay: 0.3,
      position: "-bottom-10 -left-2 sm:-bottom-12 sm:-left-10",
      floatKeyframes: {
        y: [0, -6, 0, 6, 0],
        x: [0, -4, 0, 4, 0],
        rotate: [0, 1, 0, -1, 0],
      },
      duration: 5.8,
    },
    {
      id: 3,
      title: "ROC & MCA",
      desc: "Company Incorporation & Filings",
      icon: Scale,
      delay: 0.4,
      position: "-bottom-10 -right-2 sm:-bottom-12 sm:-right-10",
      floatKeyframes: {
        y: [0, 6, 0, -6, 0],
        x: [0, 4, 0, -4, 0],
        rotate: [0, -1, 0, 1, 0],
      },
      duration: 6.6,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F3040] via-[#2A3A4A] to-[#464858] text-white selection:bg-[#D99B7F] selection:text-[#0F3040]"
    >
      {/* 21st Dev Magic Animated Grid Pattern Background */}
      <GridPattern
        width={36}
        height={36}
        x={-1}
        y={-1}
        squares={[
          [4, 3],
          [6, 8],
          [12, 4],
          [16, 10],
          [20, 5],
          [14, 15],
          [8, 14],
          [24, 8],
        ]}
        className={cn(
          "[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]",
          "opacity-35 stroke-[#D99B7F]/30 fill-[#D99B7F]/[0.04]"
        )}
      />

      {/* Ambient Radial Glow in Center */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#D99B7F]/20 via-[#A56F63]/25 to-transparent rounded-full blur-3xl opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Main Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5">



            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]"
            >
              Chartered Accountants for Taxation, Compliance &amp; Advisory
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-[#FAF2EE]/90 font-normal leading-relaxed max-w-2xl"
            >
              Helping Businesses &amp; Individuals navigate Taxation, GST, Audits, and Regulatory Compliance through Technical Competence.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 pt-1 w-full sm:w-auto"
            >
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold text-[#0F3040] bg-[#D99B7F] hover:bg-[#c88b6f] shadow-lg shadow-[#D99B7F]/20 transition-all active:scale-95 cursor-pointer group"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-colors"
              >
                <span>Explore Services</span>
              </a>
            </motion.div>

            {/* Trust Markers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-5 border-t border-white/15 flex items-center gap-6 text-xs text-[#FAF2EE]/80 font-medium"
            >
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D99B7F]" />
                <span>Comprehensive Compliance Support</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D99B7F]" />
                <span>Personalized Advisory</span>
              </div>
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D99B7F]" />
                <span>Transparent Filings</span>
              </div>
            </motion.div>
          </div>

          {/* Graphic Column with 3D Tilt Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center py-10 px-4 sm:px-8 perspective-1000"
          >
            {/* Animated Laser Beams linking Satellite Cards to Central Card */}
            <ConnectingBeams activeCardIndex={activeCardIndex} />

            {/* Central Main Card with 3D Spring Tilt */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-square rounded-3xl bg-[#0F3040]/90 backdrop-blur-xl p-7 border border-[#D99B7F]/30 shadow-2xl flex flex-col justify-between overflow-hidden text-white gpu-layer group transition-shadow duration-300 hover:shadow-[#D99B7F]/20"
            >
              {/* 21st Dev Magic Border Beam Light Effect */}
              <BorderBeam
                size={220}
                duration={9}
                colorFrom="#D99B7F"
                colorTo="#A56F63"
                borderWidth={1.5}
              />

              {/* Dynamic Cursor Spotlight Effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: useTransform(
                    [spotlightX, spotlightY],
                    ([x, y]) =>
                      `radial-gradient(400px circle at ${x}% ${y}%, rgba(217, 155, 127, 0.15), transparent 75%)`
                  ),
                }}
              />

              {/* Header Info */}
              <div className="relative z-10 flex justify-between items-center transform-gpu translate-z-4">
                <div className="text-[11px] font-semibold uppercase tracking-widest text-[#D99B7F] flex items-center gap-1">
                  <span>Pankaj Agrawal</span>
                  <span className="font-sans font-normal text-white/50">&amp;</span>
                  <span>Co.</span>
                </div>
              </div>

              {/* Central Logo & Information */}
              <div className="relative z-10 my-auto text-center py-4 transform-gpu translate-z-8">
                {/* Monogram Badge with Shimmer Sheen */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative inline-flex items-center justify-center h-11 px-4 mx-auto mb-3.5 rounded-2xl bg-[#D99B7F] text-[#0F3040] gap-1.5 font-sans shadow-lg select-none leading-none overflow-hidden group/logo"
                >
                  {/* Metallic Shimmer Streak */}
                  <div className="absolute inset-0 -translate-x-full group-hover/logo:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out" />

                  <span className="text-base sm:text-lg font-bold tracking-tight text-[#0F3040]">PACO</span>
                </motion.div>

                <h3 className="font-sans text-lg sm:text-xl font-bold text-white tracking-tight">
                  Financial Integrity &amp; Compliance
                </h3>
                <p className="text-xs text-[#FAF2EE]/80 mt-1.5 max-w-xs mx-auto leading-relaxed">
                  New Delhi based advisory firm delivering transparent, practical &amp; statutory solutions.
                </p>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-xs text-[#FAF2EE]/80 transform-gpu translate-z-4">
                <span className="font-medium text-[#FAF2EE]/80">Direct &amp; Indirect Taxation</span>
                <span className="font-semibold text-[#D99B7F] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                  Est. 2024
                </span>
              </div>
            </motion.div>

            {/* Satellite Floating Glass Cards */}
            {floatingCards.map((card, idx) => {
              const IconComp = card.icon;
              const isActive = activeCardIndex === idx;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{
                    opacity: 1,
                    y: card.floatKeyframes.y,
                    x: card.floatKeyframes.x,
                    rotate: card.floatKeyframes.rotate,
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: card.delay },
                    y: {
                      duration: card.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    x: {
                      duration: card.duration * 1.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: card.duration * 1.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    scale: 1.08,
                    zIndex: 30,
                    boxShadow: "0 14px 28px -8px rgba(217, 155, 127, 0.25)",
                  }}
                  onMouseEnter={() => setActiveCardIndex(idx)}
                  onMouseLeave={() => setActiveCardIndex(null)}
                  className={`absolute ${card.position} bg-[#464858]/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border ${isActive ? "border-[#D99B7F] ring-2 ring-[#D99B7F]/30" : "border-white/20"
                    } flex items-center gap-3 z-20 max-w-[205px] hidden sm:flex text-white gpu-layer cursor-pointer transition-colors duration-200`}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                      isActive ? "bg-[#D99B7F] text-[#0F3040] shadow-xs" : "bg-[#0F3040] text-[#D99B7F]"
                    )}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-[10px] text-[#FAF2EE]/80 leading-tight mt-0.5">
                      {card.desc}
                    </p>
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

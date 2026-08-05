"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ShieldCheck, Zap, Award, CheckCircle, FileText } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
}

function Counter({ value, suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 800; // Fast 800ms duration
    const steps = 20;
    const stepTime = duration / steps;
    const increment = Math.ceil(value / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    {
      label: "Qualified CA Firm",
      numeric: 2024,
      suffix: "+",
      subtext: "ICAI Nov 2024 Batch Qualified Leader",
      icon: Award,
    },
    {
      label: "Statutory Filing Accuracy",
      numeric: 100,
      suffix: "%",
      subtext: "Zero-Defect Audit & Return Submissions",
      icon: ShieldCheck,
    },
    {
      label: "Professional Advisory",
      textDisplay: "Direct CA",
      subtext: "Personalized Support by Mr. Pankaj Agrawal",
      icon: FileText,
    },
    {
      label: "Rapid Tax Refunds & Filing",
      textDisplay: "Fast & Precise",
      subtext: "Accelerated GST & Income Tax Refund Claims",
      icon: Zap,
    },
    {
      label: "Client Compliance Trust",
      textDisplay: "Reliable",
      subtext: "Transparent Fees & Uncompromising Integrity",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#0F3040] via-[#464858] to-[#0F3040] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D99B7F]">
            Proven Commitment &amp; Standards
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl font-bold mt-1 text-white">
            Excellence in Numbers &amp; Commitment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-[#0F3040]/80 backdrop-blur-md rounded-2xl p-5 border border-[#D99B7F]/30 text-center flex flex-col items-center justify-between hover:shadow-lg hover:border-[#D99B7F] transition-all gpu-layer"
              >
                <div className="p-2.5 rounded-xl bg-[#464858] text-[#D99B7F] mb-3 shadow-sm">
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="font-sans text-2xl font-bold text-[#D99B7F] mb-1">
                  {stat.numeric !== undefined ? (
                    <Counter value={stat.numeric} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.textDisplay}</span>
                  )}
                </div>

                <h3 className="text-xs font-semibold text-white mt-1">
                  {stat.label}
                </h3>

                <p className="text-[11px] text-[#FAF2EE]/80 mt-1.5 leading-snug">
                  {stat.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

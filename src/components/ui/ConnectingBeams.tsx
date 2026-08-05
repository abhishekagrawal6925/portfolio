"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConnectingBeamsProps {
  activeCardIndex: number | null;
  className?: string;
}

export function ConnectingBeams({ activeCardIndex, className }: ConnectingBeamsProps) {
  // SVG viewBox is normalized 0 0 100 100 for responsive relative scaling
  const paths = [
    // Top-Left (Card 0) to Center Card Top-Left
    {
      id: 0,
      d: "M 22 20 Q 32 30 38 35",
      gradientId: "beam-grad-0",
    },
    // Top-Right (Card 1) to Center Card Top-Right
    {
      id: 1,
      d: "M 78 20 Q 68 30 62 35",
      gradientId: "beam-grad-1",
    },
    // Bottom-Left (Card 2) to Center Card Bottom-Left
    {
      id: 2,
      d: "M 22 80 Q 32 70 38 65",
      gradientId: "beam-grad-2",
    },
    // Bottom-Right (Card 3) to Center Card Bottom-Right
    {
      id: 3,
      d: "M 78 80 Q 68 70 62 65",
      gradientId: "beam-grad-3",
    },
  ];

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible z-10 hidden sm:block",
        className
      )}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {paths.map((path) => (
          <linearGradient key={path.gradientId} id={path.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0F172A" stopOpacity="1" />
            <stop offset="100%" stopColor="#64748B" stopOpacity="0.4" />
          </linearGradient>
        ))}

        {/* Pulse Glow Filter */}
        <filter id="beam-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {paths.map((path, idx) => {
        const isActive = activeCardIndex === idx;
        const isAnyActive = activeCardIndex !== null;
        
        return (
          <g key={path.id}>
            {/* Background static dashed guide line */}
            <path
              d={path.d}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth={isActive ? "0.6" : "0.35"}
              strokeDasharray="1 1.5"
              strokeOpacity={isActive ? "0.9" : isAnyActive ? "0.2" : "0.5"}
              className="transition-all duration-300"
            />

            {/* Glowing active path outline */}
            {isActive && (
              <path
                d={path.d}
                fill="none"
                stroke="#1E293B"
                strokeWidth="0.8"
                filter="url(#beam-glow)"
                strokeOpacity="0.9"
              />
            )}

            {/* Animated Light Pulse travelling along path */}
            <motion.path
              d={path.d}
              fill="none"
              stroke={isActive ? "#0F172A" : "#64748B"}
              strokeWidth={isActive ? "1" : "0.5"}
              strokeLinecap="round"
              strokeDasharray="3 12"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -15 }}
              transition={{
                duration: isActive ? 1.2 : 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              strokeOpacity={isActive ? "1" : isAnyActive ? "0.25" : "0.7"}
            />
          </g>
        );
      })}
    </svg>
  );
}

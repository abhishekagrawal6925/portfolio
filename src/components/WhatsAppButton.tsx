"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://wa.me/918273801105?text=Hello%20Pankaj%20Agrawal%20%26%20Co.,%20I%20would%20like%20to%20inquire%20about%20your%20taxation%20and%20compliance%20services.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 text-white shadow-2xl hover:bg-emerald-800 transition-all duration-300 group"
      aria-label="Chat on WhatsApp with Pankaj Agrawal & Co."
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-emerald-700" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
      </div>
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
        WhatsApp Consultation
      </span>
    </motion.a>
  );
}

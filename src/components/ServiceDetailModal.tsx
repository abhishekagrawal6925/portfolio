"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Shield, FileCheck } from "lucide-react";

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: any;
  items: string[];
  keyBenefits: string[];
}

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onOpenConsultation,
}: ServiceDetailModalProps) {
  if (!service) return null;

  const IconComponent = service.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10 my-8 text-slate-900"
        >
          <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium tracking-wide uppercase mb-3 text-gray-200">
              {service.category}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-xs text-gray-300 mt-1">{service.shortDesc}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto bg-white text-slate-900">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Overview & Scope
              </h4>
              <p className="text-sm text-slate-900 leading-relaxed font-normal">{service.fullDesc}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Key Services Covered
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-slate-900"
                  >
                    <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Client Advantages
              </h4>
              <div className="space-y-2">
                {service.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <FileCheck className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-800" />
              <span>Compliant with Indian Tax Code & ICAI Standards</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors shadow-sm"
            >
              <span>Consult on {service.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

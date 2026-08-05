"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({
  isOpen,
  onClose,
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Online Video Call",
    preferredDate: "",
    service: "GST & Tax Planning",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 50,
        origin: { y: 0.5 },
      });
    }, 800);
  };

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
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden z-10 my-8 text-slate-900"
        >
          <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium tracking-wide uppercase mb-2 text-gray-200">
              Personalized CA Session
            </div>
            <h3 className="font-sans text-2xl font-bold text-white">Book Advisory Session</h3>
            <p className="text-xs text-gray-300 mt-1">
              Direct interaction with Mr. Pankaj Agrawal (FCA)
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-white text-slate-900">
            {submitted ? (
              <div className="py-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-sans text-2xl font-bold text-slate-900">
                  Consultation Confirmed!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs">
                  We have reserved your advisory request for <strong className="text-slate-900">{form.service}</strong>. Our office team will call you at {form.phone} to finalize timing.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                >
                  Close & Return
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 82738 01105"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="pankaj@pacoadvisory.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      Consultation Mode
                    </label>
                    <select
                      value={form.mode}
                      onChange={(e) => setForm({ ...form, mode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                    >
                      <option value="Online Video Call">Online Video Call (Google Meet)</option>
                      <option value="Office Visit (Vikaspuri)">Office Visit (Vikaspuri, ND)</option>
                      <option value="Direct Phone Call">Direct Phone Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                      Primary Subject
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                    >
                      <option value="GST Registration & Refunds">GST Registration & Refunds</option>
                      <option value="Income Tax Planning & Filing">Income Tax Planning & Filing</option>
                      <option value="Tax Appeals & Notice Resolution">Tax Appeals & Notice Resolution</option>
                      <option value="Statutory & Tax Audit">Statutory & Tax Audit</option>
                      <option value="Company Incorporation & ROC">Company Incorporation & ROC</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-1.5">
                    Preferred Date & Time Window
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next Tuesday morning around 11 AM"
                    value={form.preferredDate}
                    onChange={(e) =>
                      setForm({ ...form, preferredDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-300 text-xs text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-black transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Reserving Slot...</span>
                    ) : (
                      <>
                        <span>Confirm Consultation Booking</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center justify-center gap-1.5 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
                  <span>Strict confidentiality maintained for all financial data.</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

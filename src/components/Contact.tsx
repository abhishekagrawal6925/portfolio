"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import confetti from "canvas-confetti";

import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "GST Registration & Compliance",
    message: "",
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF2EE] text-[#0F3040] relative overflow-hidden">
      <GridPattern
        width={32}
        height={32}
        squares={[
          [3, 2],
          [7, 6],
          [12, 5],
        ]}
        className={cn(
          "[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]",
          "opacity-60 stroke-[#464858]/20"
        )}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] shadow-xs mb-3"
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Schedule Your Advisory Consultation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-4 leading-relaxed"
          >
            Whether you need assistance with GST appeals, Income Tax return filing, statutory audits, or company setup in New Delhi, we are ready to assist.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6 text-slate-900">
              <h3 className="font-sans text-2xl font-bold text-slate-900 border-b border-gray-200 pb-4">
                Office Information
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Office Location
                  </div>
                  <div className="text-sm font-semibold text-slate-900 mt-1 leading-snug">
                    Pankaj Agrawal &amp; Co.
                  </div>
                  <address className="text-xs text-slate-600 not-italic mt-0.5 leading-relaxed">
                    C-730, Vikaspuri, New Delhi – 110018, India
                  </address>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-slate-800 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Direct Phone Line
                  </div>
                  <a
                    href="tel:+918273801105"
                    className="text-sm font-semibold text-slate-900 hover:text-black mt-1 inline-block"
                  >
                    +91 8273801105
                  </a>
                  <button
                    onClick={() => handleCopy("+918273801105", "phone")}
                    className="ml-3 inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {copiedField === "phone" ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedField === "phone" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-slate-800 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Official Email
                  </div>
                  <a
                    href="mailto:pankaj@pacoadvisory.com"
                    className="text-sm font-semibold text-slate-900 hover:text-black mt-1 inline-block break-all"
                  >
                    pankaj@pacoadvisory.com
                  </a>
                  <button
                    onClick={() => handleCopy("pankaj@pacoadvisory.com", "email")}
                    className="ml-3 inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedField === "email" ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 text-slate-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Working Hours
                  </div>
                  <p className="text-xs text-slate-900 font-medium mt-1">
                    Mon – Sat: 09:30 AM – 07:00 PM IST
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Sunday: Prior appointment only
                  </p>
                </div>
              </div>

            </div>

            {/* Google Map Embedded Visual */}
            <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-xl overflow-hidden">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-200 border border-gray-300 flex flex-col justify-between p-4 group">
                <iframe
                  title="Pankaj Agrawal & Co Office Location Map"
                  src="https://maps.google.com/maps?q=Vikaspuri,New%20Delhi,110018&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="relative z-10 self-end bg-white px-3 py-1.5 rounded-lg border border-gray-300 text-[11px] font-semibold text-slate-900 flex items-center gap-1.5 shadow-sm">
                  <span>Vikaspuri, New Delhi</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-xl relative text-slate-900">
              <h3 className="font-sans text-2xl font-bold text-slate-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-600 mb-8">
                Fill out the form below to receive a response within 24 business hours.
              </p>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-slate-900">
                    Thank You, {formData.name}!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-md">
                    Your inquiry regarding <strong className="text-slate-900">{formData.service}</strong> has been received by Pankaj Agrawal & Co. We will contact you at {formData.phone || formData.email} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: "GST Registration & Compliance",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition-colors"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajesh@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                      />
                    </div>

                    {/* Service Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                        Practice Area *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                      >
                        <option value="GST Registration & Compliance">
                          GST Registration & Compliance
                        </option>
                        <option value="GST Refunds & Appeals">
                          GST Refunds & Appeals
                        </option>
                        <option value="Direct Tax & ITR Filing">
                          Direct Tax & ITR Filing
                        </option>
                        <option value="Income Tax Scrutiny & Appeals">
                          Income Tax Scrutiny & Appeals
                        </option>
                        <option value="Statutory & Tax Audit">
                          Statutory & Tax Audit
                        </option>
                        <option value="ROC & MCA Company Compliances">
                          ROC & MCA Company Compliances
                        </option>
                        <option value="Business Advisory & Setup">
                          Business Advisory & Setup
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">
                      Brief Description of Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please summarize your tax notice, GST refund claim, or audit needs..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-800 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider hover:bg-black shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  Clock,
  Compass,
  Mail,
  Phone,
  Award,
  Maximize2,
  X,
  GraduationCap,
} from "lucide-react";

export default function About() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  const highlights = [
    {
      title: "2024 Qualified Chartered Accountant",
      desc: "Fresh, updated mastery over recent Income Tax amendments & GST statutory updates.",
      icon: UserCheck,
    },
    {
      title: "Client-Centric Approach",
      desc: "Tailored financial advisory aligned with your specific business goals.",
      icon: Compass,
    },
    {
      title: "Transparent Advisory",
      desc: "Clear statutory guidance without hidden complexities or jargon.",
      icon: ShieldCheck,
    },
    {
      title: "Timely Compliance",
      desc: "Strict adherence to filing deadlines avoiding interest and penal charges.",
      icon: Clock,
    },
    {
      title: "Personalized Solutions",
      desc: "Dedicated personal involvement from proprietor for every engagement.",
      icon: CheckCircle2,
    },
  ];

  const credentials = [
    {
      id: "membership-cert",
      src: "/images/graduation.png",
      title: "ICAI Membership & Practice Certificates",
      subtitle: "Certificate of Practice & Membership",
      desc: "Official Certificate of Membership & Practice issued by The Institute of Chartered Accountants of India (ICAI).",
      badge: "Official Certificate",
    },
    {
      id: "convocation-stage",
      src: "/images/graduation_ceremony.png",
      title: "ICAI Convocation Ceremony",
      subtitle: "Nov 2024 Batch Convocation",
      desc: "Stage honor & convocation presentation with ICAI dignitaries receiving official CA credentials.",
      badge: "Convocation Stage",
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FAF2EE] text-[#0F3040] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: CA Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Profile Photo Frame */}
              <div
                onClick={() =>
                  setSelectedImage({
                    src: "/images/profile.jpeg",
                    alt: "Mr. Pankaj Agrawal - Chartered Accountant",
                    caption: "Mr. Pankaj Agrawal — Proprietor & Qualified Chartered Accountant",
                  })
                }
                className="group relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-gray-50 aspect-[4/5] cursor-pointer"
              >
                <Image
                  src="/images/profile.jpeg"
                  alt="Mr. Pankaj Agrawal - Chartered Accountant"
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

                {/* Quick Zoom Overlay Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
                
                {/* Photo Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wider uppercase mb-2">
                    Proprietor & Founder
                  </div>
                  <h3 className="font-sans text-2xl font-bold">Mr. Pankaj Agrawal</h3>
                  <p className="text-xs text-gray-200 mt-0.5">
                    Qualified Chartered Accountant (Nov 2024)
                  </p>
                </div>
              </div>

              {/* Highlight Floating Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-200 flex items-center gap-3 max-w-xs text-slate-900"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center font-sans text-lg font-bold shrink-0">
                  CA
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Direct & Indirect Tax Specialist</div>
                  <div className="text-[11px] text-slate-600">Expertise in GST Refunds & Tax Appeals</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Right Column: Bio & Core Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-4 w-fit">
              About The Firm
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              Pankaj Agrawal &amp; Co.
            </h2>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-800 mt-1">
              Chartered Accountants
            </p>

            <div className="space-y-4 mt-6 text-slate-700 text-base leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">Pankaj Agrawal & Co.</strong> is a premier Chartered Accountancy firm committed to delivering reliable financial, taxation, and compliance solutions to businesses and individuals across India.
              </p>
              <p>
                Mr. Pankaj Agrawal qualified as a Chartered Accountant in <strong className="text-slate-900 font-semibold">November 2024</strong> and possesses strong expertise in Direct and Indirect Taxation. Under his leadership, the firm specializes in statutory audits, GST compliance, income tax planning, and ROC advisory.
              </p>
              <p className="text-sm text-slate-700 italic border-l-2 border-slate-800 pl-4 py-1 bg-gray-50 rounded-r-lg">
                &ldquo;Our objective is to provide timely, transparent, and practical financial solutions while helping clients remain fully compliant with statutory regulations.&rdquo;
              </p>
            </div>

            {/* Key Value Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-start gap-3 text-slate-900"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-800 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Contact Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-medium">
              <a
                href="mailto:pankaj@pacoadvisory.com"
                className="flex items-center gap-2 hover:text-slate-900 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-800" />
                <span>pankaj@pacoadvisory.com</span>
              </a>
              <a
                href="tel:+918273801105"
                className="flex items-center gap-2 hover:text-slate-900 transition-colors"
              >
                <Phone className="w-4 h-4 text-slate-800" />
                <span>+91 8273801105</span>
              </a>
            </div>

          </motion.div>

        </div>

        {/* ICAI Convocation & Credentials Showcase Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
              <GraduationCap className="w-4 h-4 text-slate-800" />
              <span>Official ICAI Credentials</span>
            </div>

            <h3 className="font-sans text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              ICAI Qualification & Convocation Highlights
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Demonstrating statutory qualification from The Institute of Chartered Accountants of India (ICAI).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {credentials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                onClick={() =>
                  setSelectedImage({
                    src: item.src,
                    alt: item.title,
                    caption: item.desc,
                  })
                }
                className="group relative bg-gray-50 rounded-3xl p-5 border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Holder */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 mb-4 border border-gray-200">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 uppercase tracking-wider border border-gray-200 shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="font-sans text-lg font-bold text-slate-900 group-hover:text-black transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-xs font-semibold text-amber-800 mb-2">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-[11px] font-semibold text-slate-800 group-hover:text-amber-800 transition-colors">
                  <span>Click to view full image</span>
                  <Award className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-800"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full max-h-[75vh] aspect-[4/3] sm:aspect-[16/10] bg-slate-950 flex items-center justify-center p-2">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="p-5 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans text-lg font-bold">{selectedImage.alt}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedImage.caption}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 text-[10px] uppercase tracking-wider font-semibold text-gray-300 shrink-0">
                  ICAI Official Record
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

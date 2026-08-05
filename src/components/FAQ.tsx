"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqsData: FAQItem[] = [
  {
    question: "Who needs GST Registration?",
    answer:
      "Businesses with an annual turnover exceeding ₹40 Lakhs (for goods) or ₹20 Lakhs (for services) are mandated to register for GST in India. Additionally, any business engaged in inter-state supply, e-commerce selling, export of goods/services, or liable under Reverse Charge Mechanism (RCM) must obtain mandatory GST registration regardless of turnover.",
    category: "GST",
  },
  {
    question: "What services do you provide?",
    answer:
      "Pankaj Agrawal & Co. specializes in Direct & Indirect Taxation (GST Registration, Return Filing, Refunds & Appeals), Statutory & Internal Audits, Income Tax Return filing, Scrutiny Notice resolution, MCA/ROC Company Compliances, and Business Advisory services for startups and established enterprises.",
    category: "General",
  },
  {
    question: "How can I contact you for consultation?",
    answer:
      "You can schedule a consultation by calling our office directly at +91 8273801105, sending an email to pankaj@pacoadvisory.com, or submitting a request via the 'Book Consultation' button on this website. Our physical office is located at C-730, Vikaspuri, New Delhi – 110018.",
    category: "General",
  },
  {
    question: "Do you assist with GST Appeals and legal notices?",
    answer:
      "Yes, absolutely. We provide end-to-end legal representation for GST Show Cause Notices (SCN), Demand Notices, and represent clients before GST Appellate Authorities (Appeals before Joint/Additional Commissioner & Appellate Tribunals). We also assist in processing pending GST export and inverted duty refunds.",
    category: "GST",
  },
  {
    question: "Do you provide Income Tax consultancy and notice resolution?",
    answer:
      "Yes. Mr. Pankaj Agrawal provides expert Income Tax advisory including strategic tax planning, Sec 148 re-assessment notice responses, Section 143(1)/143(3) scrutiny resolution, capital gains tax optimization, and drafting appeals before the CIT (Appeals).",
    category: "Direct Tax",
  },
  {
    question: "What documents are required for Company or LLP Incorporation?",
    answer:
      "For company/LLP incorporation, you will need: PAN Card, Aadhaar Card, Passport/Voter ID (for identity proof), Bank Statement/Electricity bill (for address proof), Digital Signature Certificate (DSC), and proof of registered office address (Electricity bill & Rent agreement with NOC). We manage the entire SPICe+ filing process with the MCA.",
    category: "ROC",
  },
  {
    question: "Why is a Statutory Audit necessary for my business?",
    answer:
      "A Statutory Audit is required under the Companies Act 2013 for all incorporated companies to ensure true and fair view representation of financial accounts. Furthermore, Tax Audit under Sec 44AB of the Income Tax Act is mandatory when turnover exceeds specified statutory limits. Audited accounts significantly increase creditworthiness for bank loans and investor funding.",
    category: "Audit",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "GST", "Direct Tax", "Audit", "ROC", "General"];

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faqs" className="py-24 bg-[#FAF2EE] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] shadow-xs mb-3"
          >
            Frequently Asked Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Clear Answers to Your Tax &amp; Statutory Queries
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-3"
          >
            Find quick guidance on GST returns, Income Tax filing, Audits, and ROC corporate compliances.
          </motion.p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tax, GST, or audit questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#A56F63]/25 text-sm text-[#0F3040] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F3040]/20 focus:border-[#0F3040] transition-all"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0F3040] text-[#D99B7F] shadow-sm font-bold"
                    : "bg-white/80 text-[#464858] hover:bg-[#A56F63] hover:text-white border border-[#A56F63]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-[#A56F63]/20 bg-white overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans text-lg font-semibold text-[#0F3040] hover:text-black transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#A56F63] shrink-0" />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 text-sm text-secondary leading-relaxed border-t border-border/60 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-border">
              <MessageSquare className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-primary">No matching questions found.</p>
              <p className="text-xs text-secondary mt-1">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

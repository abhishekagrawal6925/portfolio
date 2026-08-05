"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  PieChart,
  Scale,
  Briefcase,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import ServiceDetailModal, { ServiceItem } from "./ServiceDetailModal";

import { GridPattern } from "@/components/ui/GridPattern";
import { cn } from "@/lib/utils";

interface ServicesProps {
  onOpenConsultation: () => void;
}

const servicesData: ServiceItem[] = [
  {
    id: "indirect-tax-gst",
    category: "Indirect Tax",
    title: "GST Registration & Compliance",
    shortDesc: "End-to-end Goods and Services Tax advisory, monthly/annual return filings, GST refund claims & tribunal appeals.",
    fullDesc:
      "Navigating GST statutory mandates requires extreme accuracy. We handle seamless GST registrations, GSTR-1, GSTR-3B & GSTR-9 annual return filings, ITC reconciliations, export refund processing, and formal representation for GST audit notices and appeals.",
    icon: FileText,
    items: [
      "GST Registration & Modifications",
      "GSTR-1, 3B, 9 & 9C Filings",
      "GST Refund Processing (Exports & Inverted Duty)",
      "GST Appeals & Legal Notices",
      "Input Tax Credit (ITC) Reconciliation",
      "GST Audit & Advisory Support",
    ],
    keyBenefits: [
      "Maximized Input Tax Credit utilization with automated matching.",
      "Swift processing of export & inverted tax structure refunds.",
      "Robust representation before GST appellate authorities.",
    ],
  },
  {
    id: "direct-tax-advisory",
    category: "Direct Tax",
    title: "Income Tax Advisory & Filings",
    shortDesc: "Comprehensive Income Tax planning, statutory ITR filings, scrutiny assessments, and notice resolution.",
    fullDesc:
      "Our direct tax solutions help individuals, HNIs, firms, and corporations optimize tax positions legally while remaining fully compliant with the Income Tax Act. From complex ITR filings to handling Sec 148 notices and CIT(A) appeals.",
    icon: PieChart,
    items: [
      "Income Tax Return (ITR 1 to 7) Filing",
      "Strategic Tax Planning & Tax Saving",
      "Scrutiny Assessment & Notice Resolution",
      "Appeals before CIT(A) & ITAT Drafting",
      "Advance Tax Estimation & TDS Filings",
      "Capital Gains Advisory & Exemptions",
    ],
    keyBenefits: [
      "Proactive tax structuring to minimize overall tax burden.",
      "Quick turnaround on complex IT scrutiny notices.",
      "Precise TDS & Advance Tax compliance to avoid interest penalties.",
    ],
  },
  {
    id: "audit-assurance",
    category: "Audit & Assurance",
    title: "Statutory & Internal Audits",
    shortDesc: "Independent, rigorous statutory, tax, and internal audits ensuring regulatory adherence and financial health.",
    fullDesc:
      "Independent assurance builds credibility with banks, investors, and regulatory bodies. We perform thorough Statutory Audits under Companies Act 2013, Tax Audits under Sec 44AB, and custom Internal Financial Controls (IFC) evaluations.",
    icon: ShieldCheck,
    items: [
      "Statutory Audit of Companies & LLPs",
      "Tax Audit under Section 44AB",
      "Internal Audit & Risk Assessment",
      "Financial Reporting (Ind AS / AS)",
      "Stock & Special Purpose Audits",
      "Internal Financial Controls (IFC)",
    ],
    keyBenefits: [
      "Enhanced credibility of financial statements for banking & credit.",
      "Early identification of internal control gaps and financial risks.",
      "Full compliance with Companies Act and ICAI auditing standards.",
    ],
  },
  {
    id: "roc-compliances",
    category: "Corporate & Secretarial",
    title: "ROC & MCA Compliances",
    shortDesc: "Company incorporation, annual MCA filings, LLP compliance, DIN/DSC issuance, and secretarial support.",
    fullDesc:
      "We provide comprehensive corporate law services for Private Limited Companies, Public Companies, One Person Companies (OPC), and LLPs. From name approval to AOC-4 & MGT-7 annual filings and director compliance.",
    icon: Scale,
    items: [
      "Private Limited & LLP Incorporation",
      "MCA Annual Return Filing (AOC-4 & MGT-7)",
      "DIN & Digital Signature (DSC) Services",
      "Director KYC & Share Transfer Formalities",
      "LLP Form 8 & Form 11 Filings",
      "Secretarial Compliance & Board Minutes",
    ],
    keyBenefits: [
      "Seamless company formation with fast approval.",
      "Avoid heavy MCA late fees and director disqualifications.",
      "Accurate upkeep of statutory registers & minute books.",
    ],
  },
  {
    id: "business-advisory",
    category: "Strategic Advisory",
    title: "Business Advisory & Startup Mentorship",
    shortDesc: "Financial structuring, cash flow management, internal control design, and strategic business consulting.",
    fullDesc:
      "Empowering businesses to scale with clarity. We assist early-stage startups and established enterprises with financial modeling, cash flow forecasting, budgeting, capital structuring, and regulatory licensing.",
    icon: Briefcase,
    items: [
      "Business Entity Selection & Setup",
      "Cash Flow Management & Financial Modeling",
      "Internal Financial Systems Setup",
      "Project Reports & Bank Loan Advisory",
      "MSME & Startup India Registrations",
      "Ongoing Virtual CFO Support",
    ],
    keyBenefits: [
      "Data-driven financial clarity for strategic decision making.",
      "Higher success rate in bank loan approvals and pitch evaluations.",
      "Comprehensive regulatory clearance from day one.",
    ],
  },
];

export default function Services({ onOpenConsultation }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");

  const tabs = ["All", "Indirect Tax", "Direct Tax", "Audit & Assurance", "Corporate & Secretarial", "Strategic Advisory"];

  const filteredServices =
    activeTab === "All"
      ? servicesData
      : servicesData.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="py-24 bg-[#FAF2EE] relative overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        squares={[
          [2, 3],
          [5, 8],
          [10, 4],
        ]}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "opacity-40 stroke-[#464858]/20"
        )}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#A56F63]/30 text-xs font-semibold uppercase tracking-wider text-[#A56F63] mb-3 shadow-xs"
          >
            Practice Areas &amp; Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-sans text-3xl sm:text-4xl font-bold text-[#0F3040] tracking-tight"
          >
            Comprehensive Financial &amp; Compliance Solutions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#464858] mt-4 leading-relaxed"
          >
            Tailored chartered accountancy services designed to maintain statutory compliance, minimize tax liabilities, and support sustainable business growth.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#0F3040] text-[#D99B7F] shadow-md font-bold"
                  : "bg-white/80 text-[#464858] hover:bg-[#A56F63] hover:text-white border border-[#A56F63]/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative bg-[#F8F9FA] rounded-3xl p-8 border border-border/80 shadow-luxury hover:shadow-luxury-hover hover:border-gray-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Tag & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center shadow-sm border border-border/60 transition-colors duration-300">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-border/60">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="font-sans text-2xl font-bold text-primary group-hover:text-black transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-xs text-secondary leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Top 3 Sub-services preview */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-border/60">
                    {service.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-secondary font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learn More Button */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-border text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <span>Learn More & Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal Drawer */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenConsultation={onOpenConsultation}
      />
    </section>
  );
}

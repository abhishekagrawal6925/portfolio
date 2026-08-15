export interface SubServiceDetail {
  title: string;
  desc: string;
  items?: string[];
}

export interface ServiceCategoryData {
  slug: string;
  title: string;
  category: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  iconName: "FileText" | "PieChart" | "ShieldCheck" | "Landmark" | "Briefcase";
  iconBg: string;
  iconColor: string;
  borderHover: string;
  items: string[];
  detailedScope: SubServiceDetail[];
  keyBenefits: string[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
}

export const serviceCategoriesData: ServiceCategoryData[] = [
  {
    slug: "indirect-tax",
    title: "Indirect Tax",
    category: "Indirect Tax",
    badge: "GST & Indirect Taxation",
    shortDesc:
      "Comprehensive GST and Indirect Tax services to help your business remain compliant and optimize tax outcomes.",
    fullDesc:
      "Navigating GST statutory mandates requires technical expertise and precision. We provide end-to-end GST solutions including hassle-free registrations, timely monthly/quarterly/annual return filings (GSTR-1, 3B, 9 & 9C), automated Input Tax Credit (ITC) reconciliations, export & inverted tax structure refund processing, and formal legal representation for GST notices, audits, and tribunal appeals.",
    iconName: "FileText",
    iconBg: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600",
    borderHover: "hover:border-blue-300",
    items: [
      "GST Registration & Compliance",
      "GST Returns & Reconciliation",
      "GST Refunds",
      "GST Audit & Assessments",
      "GST Advisory & Litigation Support",
    ],
    detailedScope: [
      {
        title: "GST Registration & Setup",
        desc: "Seamless new GST registrations, casual taxable person registrations, non-resident taxable person setup, core & non-core amendment updates, and cancellation/revocation applications.",
        items: ["Proprietorship, Partnership, LLP & Company Registrations", "Composition Scheme Opt-in / Opt-out", "E-Way Bill & E-Invoicing Setup"]
      },
      {
        title: "GST Returns & Automated Reconciliation",
        desc: "Accurate drafting and filing of GSTR-1, GSTR-3B, GSTR-4, GSTR-6 (ISD), and annual GSTR-9/9C statements with automated 2B vs Purchase Register matching.",
        items: ["2A / 2B vs Books Reconciliation to maximize ITC", "Vendor Follow-ups for Non-Filing / Mismatches", "Annual Return GSTR-9 & Reconciliation Statement 9C"]
      },
      {
        title: "GST Refund Processing",
        desc: "Specialized assistance in claiming GST refunds under export without payment of tax (LUT), inverted duty structure, and accumulated unutilized ITC.",
        items: ["LUT (Letter of Undertaking) Filings", "Export Refund Claim Preparation & Bank Realization (FIRC)", "Inverted Tax Structure Refund Computation & Representation"]
      },
      {
        title: "GST Audit, Notices & Litigation Support",
        desc: "End-to-end representation before GST officers for department audits under Sec 65, scrutiny notices (ASMT-10), DRC-01 demand notices, and drafting formal appeal petitions.",
        items: ["Scrutiny Notice Reply Drafting (ASMT-11)", "Departmental Audit Assistance & Records Inspection", "Appeals before Appellate Authority (GST Appeals)"]
      },
      {
        title: "GST Advisory & Structuring",
        desc: "Practical opinions on GST applicability across complex transactions, place of supply determinations, cross-border services, and valuation rules.",
        items: ["Place of Supply & Time of Supply Opinions", "Reverse Charge Mechanism (RCM) Advisory", "Classification & HSN/SAC Mapping"]
      }
    ],
    keyBenefits: [
      "100% Timely Filing Assurance to avoid late fees and interest penalties.",
      "Maximized Input Tax Credit (ITC) utilization through rigorous reconciliation.",
      "Swift refund processing for exporters and manufacturers under inverted duty.",
      "Expert legal representation before GST authorities for ASMT-10 and DRC-01 notices."
    ],
    deliverables: [
      "Monthly GST Return Summaries & Filing Acknowledgments",
      "2B Mismatch & Vendor Non-Compliance Reports",
      "Annual GSTR-9 / 9C Audit Folders & Reconciliation Certificates",
      "Formal Written Opinions & Notice Reply Drafts"
    ],
    faqs: [
      {
        question: "When is GST registration mandatory for businesses?",
        answer: "GST registration is mandatory if your annual turnover exceeds ₹40 Lakhs for goods (₹20 Lakhs for special category states) or ₹20 Lakhs for services (₹10 Lakhs for special category states). Furthermore, inter-state suppliers, e-commerce sellers, and businesses subject to Reverse Charge Mechanism must register regardless of turnover."
      },
      {
        question: "How do you handle ITC mismatches between GSTR-2B and GSTR-3B?",
        answer: "We perform automated monthly reconciliations between GSTR-2B and your purchase register. Any missing or incorrect invoices are flagged early, and we provide vendor follow-up templates so you never lose legitimate Input Tax Credits."
      },
      {
        question: "What is the timeline for claiming GST Export Refunds?",
        answer: "GST refund applications can be filed within 2 years from the relevant date (e.g., date of export of goods or date of receipt of convertible foreign exchange for services). We process claims efficiently to minimize working capital lockup."
      }
    ]
  },
  {
    slug: "direct-tax",
    title: "Direct Tax",
    category: "Direct Tax",
    badge: "Income Tax & Appeals",
    shortDesc:
      "End-to-end Income Tax services for individuals, businesses and organizations.",
    fullDesc:
      "Our direct tax solutions help individuals, HNIs, partnership firms, LLPs, and corporate entities optimize tax structures legally while ensuring strict adherence to the Income Tax Act, 1961. From statutory ITR filings (ITR 1 through 7) and strategic capital gains planning to handling complex scrutiny assessments (Sec 143/147) and filing appeals before CIT(Appeals) and ITAT.",
    iconName: "PieChart",
    iconBg: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600",
    borderHover: "hover:border-orange-300",
    items: [
      "Income Tax Return Filing (ITR 1 to 7)",
      "Tax Planning & Advisory",
      "Tax Audit under Section 44AB",
      "Assessments & Notices Representation",
      "Tax Litigation & Appeals",
    ],
    detailedScope: [
      {
        title: "Income Tax Return (ITR) Preparation & Filing",
        desc: "Meticulous computation of total income, tax liability, and return filing across all forms (ITR 1, 2, 3, 4, 5, 6, 7) for salaried individuals, HNIs, sole proprietors, firms, LLPs, and companies.",
        items: ["Salaried, Capital Gains & Multi-Source Income Filings", "Business & Professional Income (Presumptive & Regular)", "NRI Income Tax Returns & Double Tax Relief (DTAA) Claims"]
      },
      {
        title: "Tax Planning & Capital Gains Structuring",
        desc: "Proactive, legal tax planning strategies to minimize tax outflow utilizing allowable exemptions, deductions, and tax-efficient investments under Old and New Tax Regimes.",
        items: ["Sec 54/54F/54EC Capital Gains Tax Exemption Planning", "New vs. Old Tax Regime Optimization", "HNI & Family Tax Structuring"]
      },
      {
        title: "Tax Audit under Section 44AB",
        desc: "Independent Tax Audit for businesses exceeding turnover thresholds (₹1 Cr / ₹10 Cr) and professionals (₹50 L / ₹75 L), including Form 3CA/3CB and Form 3CD filing.",
        items: ["Verification of Books of Accounts & Allowable Expenses", "Clause-by-Clause Form 3CD Reporting", "TDS & Statutory Disallowances Review"]
      },
      {
        title: "Income Tax Assessment & Notice Resolution",
        desc: "Expert drafting and representation for e-Assessments, faceless scrutiny notices under Sec 143(2), Sec 142(1), Sec 148 (reassessment), and Sec 245 refund adjustments.",
        items: ["Faceless Assessment Reply Drafting & Documentation", "Defective Return Notice (Sec 139(9)) Resolution", "Penalty Proceedings (Sec 270A/271(1)(c)) Representation"]
      },
      {
        title: "Tax Litigation & Appeals (CIT(A) & ITAT)",
        desc: "Preparation of Statement of Facts, Grounds of Appeal, Written Submissions, and verbal representation before Commissioner of Income Tax (Appeals) and ITAT.",
        items: ["Drafting Form 35 for CIT(Appeals)", "Stay of Demand Applications", "Litigation Strategy for Complex Assessment Orders"]
      }
    ],
    keyBenefits: [
      "Legally optimized tax liabilities through comprehensive regime & exemption planning.",
      "Zero notice penalty risk with thorough documentation and timely submissions.",
      "Expert representation before Faceless Assessment Units & CIT(Appeals).",
      "Accurate TDS/TCS filings to prevent short-deduction notices and interest."
    ],
    deliverables: [
      "Tax Computation Sheets & ITR Filing Acknowledgments",
      "Form 3CA/3CB & Form 3CD Audit Reports",
      "Sec 143(1) Intimation Matching & Refund Tracking Reports",
      "Formal Notice Replies & Appellate Appeal Submissions"
    ],
    faqs: [
      {
        question: "Who is required to undergo a Tax Audit under Section 44AB?",
        answer: "A tax audit is mandatory if your business turnover exceeds ₹1 Crore (or ₹10 Crores if digital transactions exceed 95%) or if professional gross receipts exceed ₹50 Lakhs (or ₹75 Lakhs under presumptive tax opt-out)."
      },
      {
        question: "How do I choose between the Old Tax Regime and New Tax Regime?",
        answer: "We run a comparative analysis of your total income against eligible deductions (Sec 80C, 80D, HRA, Home Loan Interest). We recommend the regime that yields the lowest net tax outgo for your specific income profile."
      },
      {
        question: "What should I do if I receive a notice under Section 143(2) or 148?",
        answer: "Do not ignore the notice. We analyze the reasons recorded by the Income Tax Department, prepare factual explanations backed by accounting evidence, and submit replies through the faceless portal within prescribed deadlines."
      }
    ]
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    category: "Audit & Assurance",
    badge: "Audit & Risk Assurance",
    shortDesc:
      "Assurance and audit services to enhance transparency, governance and reliability of financial information.",
    fullDesc:
      "Independent audit and assurance build trust with investors, lenders, shareholders, and regulatory authorities. We provide objective, rigorous audit services adhering strictly to ICAI Standards on Auditing (SAs), Companies Act 2013, and statutory mandates. Our audits evaluate financial controls, ensure compliance, and mitigate operational & financial risks.",
    iconName: "ShieldCheck",
    iconBg: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    borderHover: "hover:border-emerald-300",
    items: [
      "Statutory Audit of Companies & LLPs",
      "Tax Audit under Section 44AB",
      "Internal Audit",
      "Concurrent Audit",
      "Risk Assessment & Assurance Services",
    ],
    detailedScope: [
      {
        title: "Statutory Audit under Companies Act 2013",
        desc: "Independent examination of annual financial statements for Private Limited Companies, Public Companies, and LLPs to express an opinion on true and fair view.",
        items: ["Balance Sheet, Profit & Loss and Cash Flow Verification", "CARO 2020 Reporting & Schedule III Compliance", "Independent Auditor's Report (Form ADT-1 / Annual Report)"]
      },
      {
        title: "Internal Financial Controls (IFC) & Internal Audit",
        desc: "Evaluating the operational effectiveness of internal financial controls, inventory management, revenue assurance, purchase-to-pay processes, and governance systems.",
        items: ["Process Walkthroughs & Key Control Identification", "Risk & Control Matrix (RCM) Development", "Internal Control Deficiency Reports & Actionable Recommendations"]
      },
      {
        title: "Tax Audit & Special Audits",
        desc: "Statutory Tax Audits under Sec 44AB of Income Tax Act, GST Audits, and Special Audits ordered by regulatory authorities or management.",
        items: ["Form 3CD Clause Compliance Review", "Stock Verification & Fixed Asset Physical Audits", "Special Purpose Financial Certification"]
      },
      {
        title: "Concurrent & Bank Audits",
        desc: "Systematic ongoing audits for banks, NBFCs, financial institutions, and treasury operations ensuring real-time compliance and risk mitigation.",
        items: ["Revenue Leakage Audits", "Borrower Credit Monitoring & Stock Audits for Bank Financing", "Compliance Verification for Credit Facilities"]
      },
      {
        title: "Risk Assessment & Governance Advisory",
        desc: "Identifying key business, regulatory, and financial risks and providing strategic frameworks to improve corporate governance.",
        items: ["Fraud Risk Assessments", "Management Information System (MIS) Reliability Reviews", "Accounting Standards (AS / Ind AS) Transition Guidance"]
      }
    ],
    keyBenefits: [
      "Enhanced stakeholder trust and bankability for credit line approvals.",
      "Early detection of revenue leakages, fraud risks, and accounting errors.",
      "Strict compliance with CARO 2020, Companies Act 2013, and ICAI Standards.",
      "Actionable management recommendations to streamline accounting workflows."
    ],
    deliverables: [
      "Independent Auditor's Reports & Certified Financial Statements",
      "Internal Audit & IFC Evaluation Reports with Management Action Plans",
      "Stock & Asset Verification Certificates for Bank Lenders",
      "CARO 2020 Compliance Spreadsheets"
    ],
    faqs: [
      {
        question: "Why is a Statutory Audit required for Private Limited Companies?",
        answer: "Under Section 139 of the Companies Act, 2013, every company incorporated in India is mandated to appoint an independent Chartered Accountant to conduct a statutory audit of its financial statements annually, irrespective of turnover or profit."
      },
      {
        question: "What is CARO 2020 and who does it apply to?",
        answer: "CARO 2020 (Companies Auditor's Report Order) is an enhanced audit reporting framework requiring auditors to report on 21 specific clauses, including inventory physical verification, fixed asset registers, working capital usage, default on loans, and internal audit systems."
      },
      {
        question: "How does Internal Audit differ from Statutory Audit?",
        answer: "Statutory Audit is a backward-looking legal requirement focused on rendering an opinion on the fairness of annual financial statements for external stakeholders. Internal Audit is an ongoing management tool focused on risk management, operational efficiency, internal controls, and fraud prevention."
      }
    ]
  },
  {
    slug: "corporate-secretarial",
    title: "Corporate & Secretarial",
    category: "Corporate & Secretarial",
    badge: "ROC & Corporate Law",
    shortDesc:
      "Comprehensive corporate compliance and secretarial services to ensure regulatory adherence.",
    fullDesc:
      "Maintaining compliance under the Companies Act 2013 and Ministry of Corporate Affairs (MCA) regulations is critical for corporate governance. We manage everything from business entity incorporation (Private Limited, Public Ltd, OPC, LLP, Section 8 Company) to annual ROC filings (AOC-4 & MGT-7), director onboarding, share transfers, board meeting documentation, and structural changes.",
    iconName: "Landmark",
    iconBg: "bg-indigo-50 border-indigo-100",
    iconColor: "text-indigo-600",
    borderHover: "hover:border-indigo-300",
    items: [
      "ROC Compliances & Filings",
      "Company Law Compliances",
      "LLP Compliances",
      "Secretarial Support Services",
      "Annual Compliance Management",
    ],
    detailedScope: [
      {
        title: "Company & LLP Incorporation",
        desc: "End-to-end incorporation services through MCA SPICe+ and FiLLiP forms, including name reservation, MOA & AOA drafting, PAN/TAN issuance, and bank account setup.",
        items: ["Private Limited, OPC & Public Company Incorporation", "Limited Liability Partnership (LLP) Setup", "Section 8 (Non-Profit) & Startup Registration"]
      },
      {
        title: "Annual ROC Filings & Compliance",
        desc: "Preparation and filing of annual MCA returns to ensure your company remains active and compliant, avoiding heavy daily penalties.",
        items: ["Form AOC-4 (Financial Statements Filing)", "Form MGT-7 / MGT-7A (Annual Return Filing)", "LLP Form 8 (Statement of Accounts) & Form 11 (Annual Return)"]
      },
      {
        title: "Director & Secretarial Formalities",
        desc: "Managing Director Identification Number (DIN) applications, annual DIR-3 KYC, Digital Signature Certificates (DSC), director changes, and registered office updates.",
        items: ["DIR-3 KYC & DIR-12 Appointments/Resignations", "Form INC-22 Registered Office Shift", "BEN-2 Significant Beneficial Ownership Filings"]
      },
      {
        title: "Corporate Restructuring & Event-Based Filings",
        desc: "Handling share capital increases, share allotments (PAS-3), share transfers (SH-4), creation/modification of bank charges (CHG-1/CHG-4), and alteration of MOA/AOA.",
        items: ["Form PAS-3 Share Allotment & Board Resolutions", "Form CHG-1/4 Bank Charge Creation & Satisfaction", "Form SH-7 Authorised Capital Enhancement"]
      },
      {
        title: "Statutory Registers & Board Minutes Support",
        desc: "Maintenance of prescribed statutory registers under Companies Act 2013 and professional drafting of Notice, Agenda, and Minutes of Board & General Meetings.",
        items: ["Maintenance of Statutory Registers (Members, Directors, Charges)", "Board & General Meeting Minutes Drafting", "Secretarial Health Check & Due Diligence"]
      }
    ],
    keyBenefits: [
      "Complete protection against MCA late fees (₹100/day) and director disqualification.",
      "Rapid incorporation turnaround with error-free SPICe+ documentation.",
      "Accurate maintenance of statutory registers for investor due diligence.",
      "Seamless bank charge registration for timely credit facility disbursements."
    ],
    deliverables: [
      "Certificate of Incorporation, MOA, AOA & PAN/TAN Allotment Copies",
      "Approved ROC Filing Challenge Receipts & Form Copies (AOC-4, MGT-7)",
      "Bound Statutory Register Records & Certified Board Meeting Minutes",
      "DIN Allotment Letters & Active DSC Tokens"
    ],
    faqs: [
      {
        question: "What are the mandatory annual ROC filings for a Private Limited Company?",
        answer: "Every Private Limited Company must file Form AOC-4 (Financial Statements) within 30 days of AGM and Form MGT-7/7A (Annual Return) within 60 days of AGM annually. Directors must also complete DIR-3 KYC annually before September 30."
      },
      {
        question: "What happens if a company delays its ROC filing?",
        answer: "Delaying AOC-4 or MGT-7 attracts an additional MCA fee of ₹100 per day per form with no capping limit. Continued default can lead to director disqualification (under Sec 164) and company strike-off by ROC."
      },
      {
        question: "What is required to register a Limited Liability Partnership (LLP)?",
        answer: "LLP incorporation requires at least 2 Designated Partners (at least one Indian resident), DIN/DSC for partners, name approval via RUN-LLP, and filing FiLLiP forms along with an executed LLP Agreement (Form 3) within 30 days."
      }
    ]
  },
  {
    slug: "advisory-consultancy",
    title: "Advisory & Consultancy",
    category: "Advisory & Consultancy",
    badge: "Strategic Financial Advisory",
    shortDesc:
      "Practical advisory solutions to support business decisions and sustainable growth.",
    fullDesc:
      "Navigating business growth requires sound financial intelligence and strategic guidance. We serve as trusted advisors to proprietors, growing SMEs, and startups—providing virtual CFO leadership, financial modeling, capital structuring, bank loan project reports, internal systems setup, and MSME/Startup India compliance.",
    iconName: "Briefcase",
    iconBg: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-600",
    borderHover: "hover:border-sky-300",
    items: [
      "Business & Financial Advisory",
      "Management Consulting",
    ],
    detailedScope: [
      {
        title: "Virtual CFO & Strategic Financial Management",
        desc: "Part-time executive CFO services for growing companies needing high-level financial guidance, cash flow oversight, budgeting, and strategic planning without full-time CFO overhead.",
        items: ["Monthly Cash Flow Forecasting & Working Capital Management", "Budgeting vs. Actual Performance Analysis", "Strategic Financial Decision Support"]
      },
      {
        title: "Bank Loan Project Reports & Credit Structuring",
        desc: "Preparing detailed Techno-Economic Viability (TEV) study reports, projected balance sheets, CMA data, and cash flow statements for bank loan sanctions.",
        items: ["CMA Data Preparation for Cash Credit & Term Loans", "DPR (Detailed Project Report) Drafting for Bank Credit", "Debt Structuring & Loan Renewal Consultation"]
      },
      {
        title: "Business Formation & Entity Structuring",
        desc: "Strategic advice on selecting the optimal legal entity structure (Proprietorship vs. Partnership vs. LLP vs. Pvt Ltd) based on tax efficiency, liability exposure, and funding needs.",
        items: ["Tax-Efficient Business Entity Selection", "Co-founder Equity & Profit Sharing Agreements Advisory", "MSME & Startup India Recognition"]
      },
      {
        title: "Internal Systems & Accounting Process Engineering",
        desc: "Designing and implementing robust internal accounting systems, chart of accounts, cloud software selection, inventory management controls, and approval matrices.",
        items: ["Chart of Accounts & Tally/Zoho/QuickBooks Setup", "Approval Delegation & Internal Control Matrix", "MIS Reporting Architecture"]
      },
      {
        title: "Management Consulting & Cost Optimization",
        desc: "Analyzing cost drivers, profit margins by product/service line, break-even thresholds, and providing actionable strategies to enhance gross & net margins.",
        items: ["Product Line Margin Analysis & Pricing Advisory", "Overhead Cost Rationalization", "Standard Operating Procedure (SOP) Formulation"]
      }
    ],
    keyBenefits: [
      "Clear, actionable financial metrics for confident business decision-making.",
      "Significantly higher bank loan approval rates with professional CMA data.",
      "Scalable accounting architecture to support rapid revenue expansion.",
      "Access to experienced Chartered Accountant leadership on demand."
    ],
    deliverables: [
      "Bank Credit CMA Data & Detailed Project Reports (DPR)",
      "Monthly Executive MIS Dashboards & Cash Flow Forecasts",
      "Internal Control SOP Documentation & Chart of Accounts Manuals",
      "MSME (Udyam) & Startup India Official Certificates"
    ],
    faqs: [
      {
        question: "What is CMA Data and why do banks demand it for business loans?",
        answer: "CMA (Credit Monitoring Arrangement) Data is a structured financial report required by banks to evaluate a borrower's past financial performance and future projections (working capital requirement, DSCR ratio, current ratio). We prepare accurate CMA reports to expedite loan approvals."
      },
      {
        question: "How does Virtual CFO service work for an SME?",
        answer: "Our Virtual CFO service provides senior CA expertise on a flexible, periodic basis. We participate in monthly strategy reviews, oversee your accounts team, monitor cash flow, and ensure financial discipline at a fraction of the cost of a full-time CFO."
      },
      {
        question: "How do you help early-stage startups with financial planning?",
        answer: "We assist startups with entity choice, financial projections for investor pitch decks, MSME & Startup India registration (for 80-IAC tax exemptions), and building sound accounting systems from day one."
      }
    ]
  }
];

export function getServiceByCategorySlug(slug: string): ServiceCategoryData | undefined {
  return serviceCategoriesData.find((s) => s.slug === slug);
}

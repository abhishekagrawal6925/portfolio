import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";

// In-memory initial data store for administrative consultation inquiries & leads
let inquiriesStore = [
  {
    id: "INQ-2026-001",
    clientName: "Rajesh Sharma",
    company: "Apex Tech Solutions Private Limited",
    email: "rajesh.sharma@apextech.in",
    phone: "+91 98112 34567",
    serviceRequested: "GST Registration & Returns",
    date: "2026-08-05T14:30:00Z",
    status: "New",
    notes: "Requires assistance with multi-state GST registration and monthly GSTR-3B filings.",
  },
  {
    id: "INQ-2026-002",
    clientName: "Ananya Verma",
    company: "Verma Enterprises",
    email: "ananya@vermaent.com",
    phone: "+91 98765 43210",
    serviceRequested: "Statutory Audit & Assurance",
    date: "2026-08-04T10:15:00Z",
    status: "In Progress",
    notes: "Scheduled initial audit consultation call for FY 2025-26 statutory compliance.",
  },
  {
    id: "INQ-2026-003",
    clientName: "Vikram Malhotra",
    company: "Malhotra Logistics Services",
    email: "vikram@malhotralogistics.co.in",
    phone: "+91 98100 87654",
    serviceRequested: "ROC & MCA Compliances",
    date: "2026-08-03T16:45:00Z",
    status: "Completed",
    notes: "DIR-3 KYC filings and Annual MCA Returns submitted successfully.",
  },
  {
    id: "INQ-2026-004",
    clientName: "Dr. Sunita Rao",
    company: "MediCare Diagnostics",
    email: "sunita.rao@medicare.org",
    phone: "+91 98991 12233",
    serviceRequested: "Income Tax Advisory",
    date: "2026-08-02T11:20:00Z",
    status: "New",
    notes: "Tax optimization advisory for high-net-worth individual & medical trust income.",
  },
  {
    id: "INQ-2026-005",
    clientName: "Amitabh Gupta",
    company: "Gupta Traders & Co",
    email: "agupta@guptatraders.in",
    phone: "+91 97170 54321",
    serviceRequested: "Financial & Tax Planning",
    date: "2026-08-01T09:00:00Z",
    status: "Archived",
    notes: "Requested quotation for virtual CFO services.",
  },
];

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  return NextResponse.json({ inquiries: inquiriesStore });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id, status, notes } = await request.json();
    const item = inquiriesStore.find((i) => i.id === id);

    if (!item) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    if (status) item.status = status;
    if (notes !== undefined) item.notes = notes;

    return NextResponse.json({ success: true, inquiry: item });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

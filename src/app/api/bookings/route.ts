import { NextResponse } from "next/server";
import { getWeeklyAvailability, getBookings, createBooking } from "@/lib/consultationsDb";
import { isSlotAvailable } from "@/lib/slotGenerator";
import { sendNewBookingNotificationToAdmin } from "@/lib/emailService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      requestedDate,
      requestedTime,
      consultationMode,
      service,
      message,
    } = body;

    // Basic Validation
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }

    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    if (!requestedDate || !/^\d{4}-\d{2}-\d{2}$/.test(requestedDate)) {
      return NextResponse.json({ error: "Requested date is required in YYYY-MM-DD format" }, { status: 400 });
    }

    if (!requestedTime || !/^\d{2}:\d{2}$/.test(requestedTime)) {
      return NextResponse.json({ error: "Requested time is required in HH:mm format" }, { status: 400 });
    }

    const availability = getWeeklyAvailability();
    const duration = availability.durationMinutes || 30;
    const existingBookings = getBookings();

    // Server-side double booking & availability validation
    const slotCheck = isSlotAvailable(
      requestedDate,
      requestedTime,
      duration,
      availability,
      existingBookings
    );

    if (!slotCheck.valid) {
      return NextResponse.json(
        { error: slotCheck.reason || "The selected time slot is no longer available." },
        { status: 409 } // 409 Conflict for double-booking/race condition
      );
    }

    // Save booking atomically
    const { booking } = createBooking({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone ? customerPhone.trim() : "",
      requestedDate,
      requestedTime,
      duration,
      consultationMode: consultationMode || "Online Video Call",
      service: service || "General Tax Consultation",
      message: message ? message.trim() : "",
      status: "PENDING",
    });

    // Dispatch email notification to admin asynchronously (non-blocking for UI speed)
    sendNewBookingNotificationToAdmin(booking).catch((err) => {
      console.error("[POST /api/bookings] Admin email dispatch error:", err);
    });

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully.",
      booking,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getBookingById, updateBookingStatus, BookingStatus } from "@/lib/consultationsDb";
import { sendBookingAcceptedToCustomer, sendBookingDeclinedToCustomer } from "@/lib/emailService";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, declineReason } = body as { status: BookingStatus; declineReason?: string };

    const validStatuses: BookingStatus[] = ["PENDING", "ACCEPTED", "DECLINED", "COMPLETED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid booking status" }, { status: 400 });
    }

    const existing = getBookingById(id);
    if (!existing) {
      return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
    }

    const updated = updateBookingStatus(id, status, declineReason);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
    }

    // Trigger emails via SMTP for ACCEPTED and DECLINED statuses
    if (status === "ACCEPTED") {
      await sendBookingAcceptedToCustomer(updated).catch((err) => {
        console.error("[PATCH /api/admin/bookings/[id]] Email error:", err);
      });
    } else if (status === "DECLINED") {
      await sendBookingDeclinedToCustomer(updated, declineReason).catch((err) => {
        console.error("[PATCH /api/admin/bookings/[id]] Email error:", err);
      });
    }

    return NextResponse.json({
      success: true,
      message: `Booking status updated to ${status}`,
      booking: updated,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

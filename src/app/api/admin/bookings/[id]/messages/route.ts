import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getBookingById, getBookingMessages, addBookingMessage } from "@/lib/consultationsDb";
import { sendAdminReplyToCustomer } from "@/lib/emailService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const booking = getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
    }

    const messages = getBookingMessages(id);
    return NextResponse.json({ messages });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(
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
    const { message } = body as { message: string };

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message content cannot be empty" }, { status: 400 });
    }

    const booking = getBookingById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking record not found" }, { status: 404 });
    }

    const newMessage = addBookingMessage(
      id,
      "ADMIN",
      "Mr. Pankaj Agrawal (FCA)",
      "pankaj@pacoadvisory.com",
      message.trim()
    );

    // Send email to customer via SMTP
    const emailResult = await sendAdminReplyToCustomer(booking, message.trim()).catch((err) => {
      console.error("[POST /api/admin/bookings/[id]/messages] Email error:", err);
      return { success: false, error: err.message };
    });

    return NextResponse.json({
      success: true,
      message: newMessage,
      emailSent: emailResult.success,
      emailError: emailResult.error,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

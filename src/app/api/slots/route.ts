import { NextResponse } from "next/server";
import { getWeeklyAvailability, getBookings } from "@/lib/consultationsDb";
import { generateAvailableSlots } from "@/lib/slotGenerator";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json(
        { error: "Invalid or missing date parameter. Format required: YYYY-MM-DD" },
        { status: 400 }
      );
    }

    const availability = getWeeklyAvailability();
    const existingBookings = getBookings();

    const slots = generateAvailableSlots(dateStr, availability, existingBookings);

    return NextResponse.json({
      date: dateStr,
      durationMinutes: availability.durationMinutes || 30,
      slots,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to generate slots" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getBookings } from "@/lib/consultationsDb";

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const bookings = getBookings();
    return NextResponse.json({ bookings });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to fetch bookings" }, { status: 500 });
  }
}

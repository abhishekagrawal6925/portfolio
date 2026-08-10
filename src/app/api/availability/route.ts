import { NextResponse } from "next/server";
import { getWeeklyAvailability } from "@/lib/consultationsDb";

export async function GET() {
  try {
    const availability = getWeeklyAvailability();
    return NextResponse.json({ availability });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to fetch availability" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";
import { getWeeklyAvailability, saveWeeklyAvailability, WeeklyAvailability } from "@/lib/consultationsDb";

export async function GET() {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const availability = getWeeklyAvailability();
  return NextResponse.json({ availability });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.valid) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as WeeklyAvailability;

    if (!body.durationMinutes || ![15, 30, 45, 60].includes(body.durationMinutes)) {
      return NextResponse.json({ error: "Invalid duration. Allowed values: 15, 30, 45, 60 minutes." }, { status: 400 });
    }

    if (!body.days || !Array.isArray(body.days) || body.days.length === 0) {
      return NextResponse.json({ error: "Weekly availability schedule days structure is invalid." }, { status: 400 });
    }

    const updated = saveWeeklyAvailability(body);

    return NextResponse.json({
      success: true,
      message: "Weekly availability schedule saved successfully.",
      availability: updated,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message || "Failed to update availability" }, { status: 500 });
  }
}

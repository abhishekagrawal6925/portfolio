import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminAuth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session.valid) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { username: session.username },
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { authenticated: false, error: error.message },
      { status: 500 }
    );
  }
}

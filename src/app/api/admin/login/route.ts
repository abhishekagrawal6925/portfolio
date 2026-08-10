import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DEFAULT_ADMIN_USERNAME,
  DEFAULT_ADMIN_PASSWORD,
  SESSION_COOKIE_NAME,
  generateSessionToken,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Verify against static single-admin credentials
    const expectedUsername = DEFAULT_ADMIN_USERNAME;
    const expectedPassword = DEFAULT_ADMIN_PASSWORD;

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate session token
    const token = generateSessionToken(username);

    // Set HTTP-only session cookie
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return NextResponse.json({
      success: true,
      user: { username },
      message: "Authenticated successfully",
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: error.message || "Failed to authenticate" },
      { status: 500 }
    );
  }
}

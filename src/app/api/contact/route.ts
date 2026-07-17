import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, topic, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Name, email, and message are required",
          },
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_ERROR", message: "Invalid email address" },
        },
        { status: 400 },
      );
    }

    console.log("Contact form submission:", {
      name,
      email,
      company,
      phone,
      topic,
      messageLength: message.length,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully. We'll respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "SERVER_ERROR", message: "Failed to send message" },
      },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { chips, requirements, urgency, name, email, company, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Name and email are required" } },
        { status: 400 }
      );
    }

    if (!chips || !Array.isArray(chips) || chips.length === 0) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "At least one chip is required" } },
        { status: 400 }
      );
    }

    const refId = `RFQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    console.log("RFQ Received:", {
      refId,
      name,
      email,
      company,
      phone,
      urgency,
      chipCount: chips.length,
      chips: chips.map((c: { chipId: string; quantity: number }) => ({ chipId: c.chipId, quantity: c.quantity })),
      requirements,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      id: refId,
      message: `RFQ received. Reference: ${refId}. Our team will respond within 24 hours.`,
    });
  } catch (error) {
    console.error("RFQ submission error:", error);
    return NextResponse.json(
      { success: false, error: { code: "SERVER_ERROR", message: "Failed to submit RFQ" } },
      { status: 500 }
    );
  }
}

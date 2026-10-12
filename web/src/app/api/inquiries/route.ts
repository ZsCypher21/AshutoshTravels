import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { saveInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }

  // Honeypot filled in: pretend success so bots learn nothing.
  if (parsed.data.website) return NextResponse.json({ reference: "ATT-OK" }, { status: 201 });

  const { reference } = await saveInquiry(parsed.data);
  return NextResponse.json({ reference }, { status: 201 });
}

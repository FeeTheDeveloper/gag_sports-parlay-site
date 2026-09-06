/**
 * POST /api/kyc — submit KYC documents
 * GET  /api/kyc?userId=xxx — get KYC status
 */
import { NextRequest, NextResponse } from "next/server";
import { createKycRecord } from "@/lib/kyc";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId query param required." }, { status: 400 });
  }
  // TODO: fetch from database
  return NextResponse.json(createKycRecord(userId));
}

export async function POST(req: NextRequest) {
  let body: { userId: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (!body.userId) {
    return NextResponse.json({ error: "userId is required." }, { status: 400 });
  }
  // TODO: submit to KYC vendor SDK, persist record
  const record = createKycRecord(body.userId);
  return NextResponse.json(record, { status: 201 });
}

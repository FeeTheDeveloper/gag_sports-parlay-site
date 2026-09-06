/**
 * GET /api/events
 * Server-Sent Events endpoint for real-time odds updates and live line movement.
 *
 * Each client subscribes here; the server pushes delta updates as
 * odds change. In production this would fan out updates received from
 * the odds-feed provider's websocket connection.
 */
import { NextRequest } from "next/server";
import { OddsLine } from "@/types";
import { americanToDecimal } from "@/lib/odds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Generate a simulated live odds update for demonstration. */
function generateOddsUpdate(): OddsLine {
  const basePrice = Math.random() > 0.5 ? -110 : 105;
  return {
    id: "line-003-ml-home",
    eventId: "evt-003",
    marketType: "MONEYLINE",
    label: "Heat",
    price: basePrice,
    normalizedDecimal: americanToDecimal(basePrice),
    isLive: true,
    updatedAt: new Date().toISOString(),
  };
}

export async function GET(_req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send an initial connection acknowledgement
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`)
      );

      // Push a simulated odds update every 5 seconds
      const interval = setInterval(() => {
        const update = generateOddsUpdate();
        try {
          controller.enqueue(
            encoder.encode(`event: odds_update\ndata: ${JSON.stringify(update)}\n\n`)
          );
        } catch {
          clearInterval(interval);
        }
      }, 5_000);

      // Clean up when the client disconnects
      _req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

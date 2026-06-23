import { createFileRoute } from "@tanstack/react-router";
import { buildIcs, getSelectedItems } from "../lib/program";

export const Route = createFileRoute("/download.ics")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const ids = (url.searchParams.get("ids") ?? "")
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);

        const ics = buildIcs(getSelectedItems(ids));

        return new Response(ics, {
          status: 200,
          headers: {
            "content-type": "text/calendar; charset=utf-8",
            "content-disposition": 'attachment; filename="thyrock-2026.ics"',
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});

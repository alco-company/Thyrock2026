import { createFileRoute, Link } from "@tanstack/react-router";
import { buildIcs, getSelectedItems } from "../lib/program";

export const Route = createFileRoute("/download-ics")({
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
  component: DownloadIcsFallback,
});

function DownloadIcsFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-lg rounded-3xl border border-border bg-surface p-8 text-center">
        <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Kalenderfil</div>
        <h1 className="font-display mt-3 text-3xl">Download starter ikke her</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Gå tilbage til forsiden og prøv igen. Hvis du åbner siden fra Facebook eller Instagram,
          kan deres indbyggede browser blokere fil-downloads.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="font-display inline-flex rounded-full bg-primary px-5 py-3 text-sm uppercase tracking-wider text-primary-foreground"
          >
            Gå tilbage
          </Link>
        </div>
      </div>
    </main>
  );
}

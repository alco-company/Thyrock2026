import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getSelectedItems, PROGRAM, type Stage } from "../lib/program";
import facebookTop from "../../facebooktop.png?url";

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- UI ----------

function Index() {
  const [activeDay, setActiveDay] = useState<"fri" | "sat">("fri");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [downloadGuideOpen, setDownloadGuideOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [inAppNoticeDismissed, setInAppNoticeDismissed] = useState(false);

  const day = PROGRAM.find((d) => d.key === activeDay)!;
  const selectedList = useMemo(() => getSelectedItems(selected), [selected]);
  const downloadHref = useMemo(() => {
    const ids = Array.from(selected);
    if (ids.length === 0) return "#";
    return `/download-ics?ids=${encodeURIComponent(ids.join(","))}`;
  }, [selected]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const isInAppBrowser =
    typeof navigator !== "undefined" &&
    /FBAN|FBAV|Instagram|Messenger|Line|Twitter/i.test(navigator.userAgent);
  const isMobileDevice =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const showInAppNotice = isInAppBrowser && isMobileDevice && !inAppNoticeDismissed;

  const closeDownloadGuide = () => {
    setDownloadGuideOpen(false);
  };

  const copyCurrentLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };

  const downloadIcs = () => {
    if (selectedList.length === 0) return;
    window.location.href = downloadHref;
    setDownloadGuideOpen(true);
  };

  return (
    <main className="min-h-screen noise-bg">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 noise-bg opacity-90" />
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:pt-20 sm:pb-14">
          {showInAppNotice && (
            <div className="mb-8 rounded-3xl border border-[var(--hot)]/30 bg-[var(--hot)]/10 p-5">
              <div className="flex flex-wrap items-start gap-4">
                <div className="max-w-2xl">
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--hot)]">Åbn direkte</div>
                  <h2 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
                    Facebooks browser kan blokere download af kalenderfilen
                  </h2>
                  <p className="mt-3 text-sm text-foreground/85 sm:text-base">
                    Åbn siden direkte i Safari eller Chrome før du downloader. Kopiér linket herunder,
                    eller tryk på de tre prikker i topmenuen i Facebook og vælg “Åbn i ekstern browser”
                    eller “Åbn i browser”.
                  </p>
                </div>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-3xl border border-border bg-white shadow-lg">
                <img
                  src={facebookTop}
                  alt="Facebook-menu med de tre prikker øverst til højre"
                  className="block w-full"
                />
                <div className="pointer-events-none absolute right-6 top-3 flex flex-col items-center text-[var(--hot)] sm:right-8 sm:top-4">
                  <div className="text-3xl leading-none">↓</div>
                  <div className="mt-1 rounded-full bg-[var(--hot)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:text-[11px]">
                    Tryk her
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                eller
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={copyCurrentLink}
                  className="font-display inline-flex rounded-full bg-primary px-5 py-3 text-sm uppercase tracking-wider text-primary-foreground transition hover:opacity-95"
                >
                  Kopiér link
                </button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {copyState === "copied" && "Linket er kopieret. Du kan nu indsætte det i Safari eller Chrome."}
                {copyState === "error" && "Linket kunne ikke kopieres automatisk. Tryk på de tre prikker i topmenuen i Facebook og vælg “Åbn i ekstern browser” eller “Åbn i browser”."}
              </p>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setInAppNoticeDismissed(true)}
                  className="rounded-full border border-border px-4 py-2 text-sm hover:bg-surface-2"
                >
                  Luk
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--hot)]" />
            Thy Rock · 26.–27. juni 2026
          </div>
          <h1 className="font-display mt-5 text-balance text-5xl leading-[0.95] sm:text-7xl md:text-8xl">
            Byg dit <span className="text-primary">eget</span> <br className="hidden sm:block" />
            festivalprogram.
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Vælg de programpunkter du vil høre. Download din personlige kalenderfil
            og få hele weekenden direkte i lommen.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full border border-border bg-surface p-1">
              {PROGRAM.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setActiveDay(d.key)}
                  className={`font-display rounded-full px-5 py-2 text-sm uppercase tracking-wider transition ${
                    activeDay === d.key
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {selected.size} valgt
            </div>
          </div>
        </div>
      </header>

      {/* Program grid */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-4xl">
            {day.label} <span className="text-muted-foreground">/ {new Date(day.date).toLocaleDateString("da-DK", { day: "2-digit", month: "long" })}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {day.stages.map((stage) => (
            <StageCard key={stage.name} stage={stage} selected={selected} onToggle={toggle} />
          ))}
        </div>
      </section>

      {/* Floating CTA */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="font-display fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full bg-primary px-5 py-3 text-sm uppercase tracking-wider text-primary-foreground shadow-2xl shadow-black/40 transition hover:scale-[1.02]"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-foreground/15">{selected.size}</span>
        Min kalender
      </button>

      {/* Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Din weekend</div>
                <div className="font-display text-2xl">Min kalender</div>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-full border border-border px-3 py-1 text-sm hover:bg-surface-2"
              >
                Luk
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {selectedList.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Du har ikke valgt nogen programpunkter endnu.
                </p>
              ) : (
                <ul className="space-y-2">
                  {selectedList.map(({ day: d, stage, slot }) => (
                    <li key={slot.id} className="rounded-xl border border-border bg-surface-2 p-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="font-display text-lg leading-tight">{slot.artist}</div>
                        <button
                          onClick={() => toggle(slot.id)}
                          className="text-xs text-muted-foreground hover:text-[var(--hot)]"
                        >
                          Fjern
                        </button>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {d.label} · {slot.start}{slot.end ? `–${slot.end}` : ""} · {stage.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-border p-4">
              <button
                onClick={downloadIcs}
                disabled={selectedList.length === 0}
                className="font-display w-full rounded-full bg-primary py-3 text-sm uppercase tracking-wider text-primary-foreground transition disabled:opacity-40"
              >
                Download .ics-fil
              </button>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                Virker med Apple Kalender, Google Kalender og Outlook.
              </p>
            </div>
          </aside>
        </div>
      )}

      {downloadGuideOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeDownloadGuide} />
          <div className="absolute inset-x-4 top-1/2 mx-auto w-auto max-w-2xl -translate-y-1/2 rounded-3xl border border-border bg-surface shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Downloadet</div>
                <h3 className="font-display mt-2 text-2xl leading-tight">Sådan får du kalenderen ind</h3>
              </div>
              <button
                onClick={closeDownloadGuide}
                className="rounded-full border border-border px-3 py-1 text-sm hover:bg-surface-2"
              >
                Luk
              </button>
            </div>

            {isInAppBrowser && (
              <div className="border-b border-border bg-[var(--hot)]/10 px-5 py-4 text-sm text-foreground sm:px-6">
                Facebooks browser kan blokere downloads. Hvis filen ikke kom ned, så prøv knappen herunder
                eller åbn siden i Safari eller Chrome.
              </div>
            )}

            <div className="grid gap-4 px-5 py-5 sm:px-6 sm:py-6 md:grid-cols-3">
              <section className="rounded-2xl border border-border bg-surface-2 p-4">
                <h4 className="font-display text-lg">iPhone / Apple Kalender</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Åbn filen fra Downloads og vælg Kalender. Bekræft derefter at du vil importere begivenhederne.
                </p>
              </section>

              <section className="rounded-2xl border border-border bg-surface-2 p-4">
                <h4 className="font-display text-lg">Google Kalender</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Åbn Google Kalender på computer, vælg Indstillinger, gå til Importér og upload filen
                  <span className="font-medium text-foreground"> thyrock-2026.ics</span>.
                </p>
              </section>

              <section className="rounded-2xl border border-border bg-surface-2 p-4">
                <h4 className="font-display text-lg">Outlook</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Åbn kalenderen i Outlook og vælg import af kalenderfil. Vælg derefter den downloadede
                  <span className="font-medium text-foreground"> .ics</span>-fil.
                </p>
              </section>
            </div>

            <div className="border-t border-border px-5 py-4 sm:px-6">
              {selectedList.length > 0 && (
                <a
                  href={downloadHref}
                  download="thyrock-2026.ics"
                  className="font-display mb-3 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm uppercase tracking-wider text-primary-foreground transition hover:opacity-95"
                >
                  Tryk her hvis download ikke startede
                </a>
              )}
              <p className="text-center text-xs text-muted-foreground">
                Hvis filen ikke åbner automatisk, finder du den normalt i din mappe til downloads.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Uofficielt program-værktøj · Thy Rock 2026 · udviklet af{" "}
        <a
          href="https://alco.dk"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-current underline-offset-2 hover:text-foreground"
        >
          ALCO
        </a>
      </footer>
    </main>
  );
}

function StageCard({
  stage,
  selected,
  onToggle,
}: {
  stage: Stage;
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  const activeCount = stage.slots.filter((s) => selected.has(s.id)).length;
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition hover:border-primary/50">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display text-lg leading-tight">{stage.name}</h3>
        {activeCount > 0 && (
          <span className="font-display rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">
            {activeCount}
          </span>
        )}
      </header>
      <ul className="divide-y divide-border">
        {stage.slots.map((slot) => {
          const isOn = selected.has(slot.id);
          return (
            <li key={slot.id}>
              <button
                onClick={() => onToggle(slot.id)}
                className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 text-left transition ${
                  isOn ? "bg-primary/10" : "hover:bg-surface-2"
                }`}
              >
                <div className="font-display tabular-nums text-sm">
                  <div className={isOn ? "text-primary" : "text-foreground"}>{slot.start}</div>
                  {slot.end && <div className="text-[10px] text-muted-foreground">→ {slot.end}</div>}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{slot.artist}</div>
                  {slot.note && <div className="truncate text-xs text-muted-foreground">{slot.note}</div>}
                  {slot.nextDay && (
                    <div className="mt-0.5 inline-block rounded bg-[var(--hot)]/15 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-[var(--hot)]">
                      Natten efter
                    </div>
                  )}
                </div>
                <span
                  aria-hidden
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition ${
                    isOn
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface-2 text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

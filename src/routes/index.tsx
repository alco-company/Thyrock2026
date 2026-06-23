import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- Data ----------

type Slot = {
  id: string;
  start: string; // "HH:MM"
  end?: string;
  artist: string;
  note?: string;
  nextDay?: boolean; // start belongs to early-morning of next day
};
type Stage = { name: string; slots: Slot[] };
type Day = { key: "fri" | "sat"; label: string; date: string; stages: Stage[] };

const PROGRAM: Day[] = [
  {
    key: "fri",
    label: "Fredag",
    date: "2026-06-26",
    stages: [
      {
        name: "Store Scene",
        slots: [
          { id: "fri-ss-1", start: "16:00", artist: "Andreas Odbjerg", note: "Konferencier: Harske Hubbi" },
          { id: "fri-ss-2", start: "20:00", artist: "Benjamin Hav & Familien", note: "Konferencier: Harske Hubbi" },
          { id: "fri-ss-3", start: "23:45", artist: "Christopher", note: "Konferencier: Harske Hubbi" },
        ],
      },
      {
        name: "Sparekassen Thy Teltet",
        slots: [
          { id: "fri-st-1", start: "18:00", artist: "Madsen" },
          { id: "fri-st-2", start: "21:45", artist: "Smokie" },
        ],
      },
      {
        name: "Den Lille Vilde",
        slots: [
          { id: "fri-dlv-1", start: "17:45", artist: "Replika" },
          { id: "fri-dlv-2", start: "22:25", artist: "Kliken" },
        ],
      },
      {
        name: "Pianobar",
        slots: [
          { id: "fri-pb-1", start: "15:00", end: "16:00", artist: "Lasse Mark" },
          { id: "fri-pb-2", start: "17:15", end: "20:00", artist: "Matilde Alexandra / Lasse Mark" },
          { id: "fri-pb-3", start: "21:15", end: "23:45", artist: "Jason J. Dove" },
        ],
      },
      {
        name: "Mandehørm Teltet",
        slots: [
          { id: "fri-mh-1", start: "15:15", artist: "Anders Mikkelsen" },
          { id: "fri-mh-2", start: "17:15", artist: "Mr Thomsen" },
          { id: "fri-mh-3", start: "21:15", artist: "Mr Thomsen" },
          { id: "fri-mh-4", start: "23:00", artist: "Mr Thomsen" },
        ],
      },
      {
        name: "Radio Limfjord Teltet",
        slots: [
          { id: "fri-rl-1", start: "15:00", end: "16:00", artist: "DJ Casper Fink" },
          { id: "fri-rl-2", start: "17:15", end: "20:00", artist: "DJ Needlesplit" },
          { id: "fri-rl-3", start: "21:15", end: "23:45", artist: "Tres Amigos" },
          { id: "fri-rl-4", start: "01:00", end: "02:00", artist: "DJ Aligator", nextDay: true },
        ],
      },
      {
        name: "Brandbilen",
        slots: [
          { id: "fri-bb-1", start: "15:00", end: "16:00", artist: "DJ Jan Larsen" },
          { id: "fri-bb-2", start: "17:15", end: "20:00", artist: "DJ Nallan Josefsen / DJ Harske Hubbi" },
          { id: "fri-bb-3", start: "21:15", end: "23:45", artist: "DJ Kenneth Parmo / DJ Harske Hubbi" },
          { id: "fri-bb-4", start: "01:00", end: "02:00", artist: "DJ Kenneth Lauridsen", nextDay: true },
        ],
      },
    ],
  },
  {
    key: "sat",
    label: "Lørdag",
    date: "2026-06-27",
    stages: [
      {
        name: "Store Scene",
        slots: [
          { id: "sat-ss-1", start: "14:00", artist: "Jonah Blacksmith", note: "Konferencier: Harske Hubbi" },
          { id: "sat-ss-2", start: "17:30", artist: "Medina", note: "Konferencier: Harske Hubbi" },
          { id: "sat-ss-3", start: "20:45", artist: "Suspekt", note: "Konferencier: Harske Hubbi" },
          { id: "sat-ss-4", start: "23:45", artist: "Hugorm", note: "Konferencier: Harske Hubbi" },
        ],
      },
      {
        name: "Sparekassen Thy Teltet",
        slots: [
          { id: "sat-st-1", start: "15:45", artist: "Jacob Dinesen" },
          { id: "sat-st-2", start: "19:00", artist: "MD-Duo" },
          { id: "sat-st-3", start: "22:15", artist: "Zar Paulo" },
        ],
      },
      {
        name: "Den Lille Vilde",
        slots: [
          { id: "sat-dlv-1", start: "15:45", artist: "Efteraar" },
          { id: "sat-dlv-2", start: "19:15", artist: "Rikke Thomsen" },
          { id: "sat-dlv-3", start: "22:15", artist: "Rosa" },
        ],
      },
      {
        name: "Pianobar",
        slots: [
          { id: "sat-pb-1", start: "13:00", end: "14:00", artist: "Michael Fisker & Hans-Jacob Lauridsen" },
          { id: "sat-pb-2", start: "15:15", end: "17:30", artist: "Bjarne Langhoff" },
          { id: "sat-pb-3", start: "18:45", end: "20:45", artist: "Matilde Alexandra / Michael Fisker & Hans Jacob Lauridsen" },
          { id: "sat-pb-4", start: "22:00", end: "23:45", artist: "Bjarne Langhoff" },
        ],
      },
      {
        name: "Mandehørm Teltet",
        slots: [
          { id: "sat-mh-1", start: "13:15", artist: "Anders Mikkelsen" },
          { id: "sat-mh-2", start: "15:15", artist: "Anders Mikkelsen" },
          { id: "sat-mh-3", start: "17:00", artist: "Kejser Larsen Duo" },
          { id: "sat-mh-4", start: "18:45", artist: "Kejser Larsen Duo" },
          { id: "sat-mh-5", start: "20:15", artist: "Kejser Larsen Duo" },
          { id: "sat-mh-6", start: "22:00", artist: "Kejser Larsen Duo" },
        ],
      },
      {
        name: "Radio Limfjord Teltet",
        slots: [
          { id: "sat-rl-1", start: "13:00", end: "14:00", artist: "DJ Falslev" },
          { id: "sat-rl-2", start: "15:15", end: "17:30", artist: "DJ Casper Fink" },
          { id: "sat-rl-3", start: "18:45", end: "20:45", artist: "DJ Kim Birk" },
          { id: "sat-rl-4", start: "22:00", end: "23:45", artist: "DJ Kim Birk" },
          { id: "sat-rl-5", start: "01:00", end: "02:00", artist: "Hampenberg / Alexander Brown / Yepha", nextDay: true },
        ],
      },
      {
        name: "Brandbilen",
        slots: [
          { id: "sat-bb-1", start: "13:00", end: "14:00", artist: "DJ Jan Larsen" },
          { id: "sat-bb-2", start: "15:15", end: "17:30", artist: "DJ Kenneth Parmo" },
          { id: "sat-bb-3", start: "18:45", end: "20:45", artist: "DJ Allan Josefsen / DJ Harske Hubbi" },
          { id: "sat-bb-4", start: "22:00", end: "23:45", artist: "DJ Kenneth Parmo / DJ Harske Hubbi" },
          { id: "sat-bb-5", start: "01:00", end: "02:00", artist: "DJ Kenneth Lauridsen", nextDay: true },
        ],
      },
    ],
  },
];

// ---------- ICS ----------
function pad(n: number) { return String(n).padStart(2, "0"); }
function addDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
function toIcsLocal(date: string, time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${date.replace(/-/g, "")}T${pad(h)}${pad(m)}00`;
}
function buildIcs(selected: { day: Day; stage: Stage; slot: Slot }[]) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Thy Rock 2026//Personal//DA",
    "CALSCALE:GREGORIAN",
  ];
  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  for (const { day, stage, slot } of selected) {
    const startDate = slot.nextDay ? addDays(day.date, 1) : day.date;
    const dtStart = toIcsLocal(startDate, slot.start);
    const endTime = slot.end ?? addMinutes(slot.start, 60);
    const endDate = slot.nextDay || crossesMidnight(slot.start, endTime) ? addDays(startDate, slot.start > endTime ? 1 : 0) : startDate;
    const dtEnd = toIcsLocal(endDate, endTime);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${slot.id}@thyrock2026`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Copenhagen:${dtStart}`,
      `DTEND;TZID=Europe/Copenhagen:${dtEnd}`,
      `SUMMARY:${escapeIcs(slot.artist)}`,
      `LOCATION:${escapeIcs(stage.name)} — Thy Rock`,
      slot.note ? `DESCRIPTION:${escapeIcs(slot.note)}` : "",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.filter(Boolean).join("\r\n");
}
function escapeIcs(s: string) { return s.replace(/[,;\\]/g, (m) => "\\" + m).replace(/\n/g, "\\n"); }
function addMinutes(t: string, mins: number) {
  const [h, m] = t.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}
function crossesMidnight(a: string, b: string) { return b < a; }

// ---------- UI ----------

function Index() {
  const [activeDay, setActiveDay] = useState<"fri" | "sat">("fri");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const day = PROGRAM.find((d) => d.key === activeDay)!;

  const selectedList = useMemo(() => {
    const items: { day: Day; stage: Stage; slot: Slot }[] = [];
    for (const d of PROGRAM)
      for (const st of d.stages)
        for (const sl of st.slots) if (selected.has(sl.id)) items.push({ day: d, stage: st, slot: sl });
    items.sort((a, b) => {
      if (a.day.key !== b.day.key) return a.day.key < b.day.key ? -1 : 1;
      const aKey = (a.slot.nextDay ? "1" : "0") + a.slot.start;
      const bKey = (b.slot.nextDay ? "1" : "0") + b.slot.start;
      return aKey.localeCompare(bKey);
    });
    return items;
  }, [selected]);

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const downloadIcs = () => {
    const ics = buildIcs(selectedList);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thyrock-2026.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen noise-bg">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 noise-bg opacity-90" />
        <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:pt-20 sm:pb-14">
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

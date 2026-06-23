export type Slot = {
  id: string;
  start: string;
  end?: string;
  artist: string;
  note?: string;
  nextDay?: boolean;
};

export type Stage = { name: string; slots: Slot[] };
export type Day = { key: "fri" | "sat"; label: string; date: string; stages: Stage[] };

export const PROGRAM: Day[] = [
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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function addDays(iso: string, n: number) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function toIcsLocal(date: string, time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${date.replace(/-/g, "")}T${pad(h)}${pad(m)}00`;
}

function escapeIcs(s: string) {
  return s.replace(/[,;\\]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
}

function addMinutes(t: string, mins: number) {
  const [h, m] = t.split(":").map(Number);
  const total = h * 60 + m + mins;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}

function crossesMidnight(a: string, b: string) {
  return b < a;
}

export function getSelectedItems(selectedIds: Iterable<string>) {
  const selected = new Set(selectedIds);
  const items: { day: Day; stage: Stage; slot: Slot }[] = [];

  for (const day of PROGRAM) {
    for (const stage of day.stages) {
      for (const slot of stage.slots) {
        if (selected.has(slot.id)) items.push({ day, stage, slot });
      }
    }
  }

  items.sort((a, b) => {
    if (a.day.key !== b.day.key) return a.day.key < b.day.key ? -1 : 1;
    const aKey = (a.slot.nextDay ? "1" : "0") + a.slot.start;
    const bKey = (b.slot.nextDay ? "1" : "0") + b.slot.start;
    return aKey.localeCompare(bKey);
  });

  return items;
}

export function buildIcs(selected: { day: Day; stage: Stage; slot: Slot }[]) {
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
    const endDate =
      slot.nextDay || crossesMidnight(slot.start, endTime)
        ? addDays(startDate, slot.start > endTime ? 1 : 0)
        : startDate;
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

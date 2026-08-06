export function formatLocalTime(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatDigestDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  })
    .format(new Date(iso))
    .toUpperCase();
}

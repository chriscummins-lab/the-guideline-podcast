export function parseDurationMinutes(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export function formatTotalMinutes(totalMin: number): string {
  if (totalMin <= 0) return "";
  if (totalMin < 60) return `ca. ${totalMin} min`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m > 0 ? `ca. ${h} Std ${m} min` : `ca. ${h} Std`;
}

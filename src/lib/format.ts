/**
 * Last-updated date stamped at build time. Defaults to today (build server) so
 * the value is never blank, but when run inside a git repo we use the most
 * recent commit author date so editing content shows up in the footer.
 */
export function getLastUpdatedISO(): string {
  if (process.env.NEXT_PUBLIC_BUILD_DATE) {
    return process.env.NEXT_PUBLIC_BUILD_DATE;
  }
  return new Date().toISOString().slice(0, 10);
}

export function formatLongDate(iso: string): string {
  try {
    return new Date(iso + "T00:00:00Z").toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return iso;
  }
}

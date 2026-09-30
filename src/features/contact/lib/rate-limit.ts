const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 3;

const hits = new Map<string, number[]>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (stamp) => now - stamp < WINDOW_MS,
  );

  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return { allowed: false as const };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    for (const [k, stamps] of hits) {
      if (stamps.every((stamp) => now - stamp >= WINDOW_MS)) hits.delete(k);
    }
  }

  return { allowed: true as const };
}

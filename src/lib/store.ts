export interface UrlEntry {
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

declare global {
  var __ushort_db: Map<string, UrlEntry> | undefined;
}

if (!globalThis.__ushort_db) {
  globalThis.__ushort_db = new Map<string, UrlEntry>();

  globalThis.__ushort_db.set('demo', {
    shortCode: 'demo',
    originalUrl: 'https://github.com',
    clicks: 1420,
    createdAt: new Date().toISOString(),
  });
}

const memoryStore = globalThis.__ushort_db;
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export async function saveUrl(entry: UrlEntry): Promise<void> {
  memoryStore.set(entry.shortCode, entry);

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      await fetch(`${UPSTASH_URL}/set/url:${entry.shortCode}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (err) {
      console.warn('[Storage Notice] Upstash save skipped:', err);
    }
  }
}

export async function getUrl(shortCode: string): Promise<UrlEntry | null> {
  if (memoryStore.has(shortCode)) {
    return memoryStore.get(shortCode)!;
  }

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    try {
      const res = await fetch(`${UPSTASH_URL}/get/url:${shortCode}`, {
        headers: {
          Authorization: `Bearer ${UPSTASH_TOKEN}`,
        },
      });
      const data = await res.json();
      if (data && data.result) {
        const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
        memoryStore.set(shortCode, parsed);
        return parsed;
      }
    } catch (err) {
      console.warn('[Storage Notice] Upstash get skipped:', err);
    }
  }

  return null;
}

export async function incrementClick(shortCode: string): Promise<number> {
  const entry = await getUrl(shortCode);
  if (!entry) return 0;

  entry.clicks += 1;
  await saveUrl(entry);
  return entry.clicks;
}

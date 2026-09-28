// Hybrid Storage Engine for Vercel
// 1. Works 100% out of the box with In-Memory cache (Zero setup needed)
// 2. Automatically upgrades to Cloud Upstash Redis if UPSTASH_REDIS_REST_URL is configured

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

  // Default seed link
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

/**
 * Save shortened URL to memory and Upstash Redis if available
 */
export async function saveUrl(entry: UrlEntry): Promise<void> {
  // Always update memory store
  memoryStore.set(entry.shortCode, entry);

  // If Upstash Redis is connected on Vercel, persist to cloud
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

/**
 * Retrieve shortened URL by shortCode
 */
export async function getUrl(shortCode: string): Promise<UrlEntry | null> {
  // Check memory first
  if (memoryStore.has(shortCode)) {
    return memoryStore.get(shortCode)!;
  }

  // Check Upstash Redis cloud database
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

/**
 * Increment click count
 */
export async function incrementClick(shortCode: string): Promise<number> {
  const entry = await getUrl(shortCode);
  if (!entry) return 0;

  entry.clicks += 1;
  await saveUrl(entry);
  return entry.clicks;
}

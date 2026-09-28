// In-Memory Global Store for Vercel Serverless Function Edge Instances
// Supports fallback data and persistent cloud key-value lookups

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
  
  // Seed demo link
  globalThis.__ushort_db.set('demo', {
    shortCode: 'demo',
    originalUrl: 'https://github.com',
    clicks: 1420,
    createdAt: new Date().toISOString(),
  });
}

export const urlStore = globalThis.__ushort_db;

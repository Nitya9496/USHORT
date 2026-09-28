import { NextRequest, NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';
import { saveUrl, getUrl } from '@/lib/store';

const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoidBase62 = customAlphabet(BASE62_ALPHABET, 6);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url, customAlias } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'A valid destination URL is required.' },
        { status: 400 }
      );
    }

    url = url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    let shortCode = customAlias ? customAlias.trim() : nanoidBase62();

    if (customAlias) {
      const existing = await getUrl(shortCode);
      if (existing) {
        return NextResponse.json(
          { success: false, error: `Alias "${shortCode}" is already in use. Please choose another one.` },
          { status: 409 }
        );
      }
    }

    const entry = {
      shortCode,
      originalUrl: url,
      clicks: 0,
      createdAt: new Date().toISOString(),
    };

    await saveUrl(entry);

    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const shortUrl = `${proto}://${host}/${shortCode}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          shortCode,
          shortUrl,
          originalUrl: url,
          clicks: 0,
          createdAt: entry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

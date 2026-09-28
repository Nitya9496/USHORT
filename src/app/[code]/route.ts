import { NextRequest, NextResponse } from 'next/server';
import { getUrl, incrementClick } from '@/lib/store';

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const { code } = params;

  if (code.startsWith('api') || code.startsWith('_next') || code === 'favicon.ico') {
    return NextResponse.next();
  }

  const entry = await getUrl(code);

  if (entry) {
    // Increment click asynchronously
    incrementClick(code).catch(() => {});
    return NextResponse.redirect(entry.originalUrl, 302);
  }

  return NextResponse.redirect(new URL('/?notfound=' + code, req.url));
}

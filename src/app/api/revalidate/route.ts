import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Sanity webhook target. Configure a webhook in Sanity to POST here with
 * ?secret=<SANITY_REVALIDATE_SECRET>; it busts the `sanity` cache tag.
 */
export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get('secret') ?? req.headers.get('x-revalidate-secret');

  if (
    !process.env.SANITY_REVALIDATE_SECRET ||
    secret !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  // Revalidate the whole site on content publish (small site — simple + safe).
  revalidatePath('/', 'layout');
  return NextResponse.json({ revalidated: true });
}

import type { NextFetchEvent, NextRequest } from 'next/server';
import { getSession, GetSessionParams } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent, context: GetSessionParams) {

  const session = await getSession(context);
  console.log('test1',session)

  console.log('test2',process.env.NEXTAUTH_URL)

  console.log('test3');
  if (req.nextUrl.pathname.startsWith('/page')) {

    // if (!session) {
      return NextResponse.redirect(new URL("/", req.url));

    // }
  }
}
export const config = {
  matcher: '/page/form',
}

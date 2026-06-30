import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on all paths except API, the Sanity Studio, Next internals and files.
  matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'],
};

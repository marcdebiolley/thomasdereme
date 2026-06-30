import { client, projectId } from './client';

/** True once a real Sanity project is wired (not the build-time placeholder). */
export const sanityConfigured = Boolean(projectId) && projectId !== 'placeholder';

/**
 * Tag-cached fetch that degrades gracefully: returns `fallback` when Sanity
 * isn't configured yet or the request fails, so pages never crash pre-CMS.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!sanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query, params, { next: { tags: ['sanity'] } });
  } catch (err) {
    console.warn('[sanity] fetch failed:', err instanceof Error ? err.message : String(err));
    return fallback;
  }
}

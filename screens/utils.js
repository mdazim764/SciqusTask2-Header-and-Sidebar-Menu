// utils.js
/**
 * Extracts the YouTube video ID from various YouTube link formats.
 * Returns null if not found.
 *
 * Supports:
 *   - https://www.youtube.com/watch?v=VIDEO_ID
 *   - https://youtu.be/VIDEO_ID
 *   - https://www.youtube.com/embed/VIDEO_ID
 *   - any extra query params, e.g. ?si=xxx
 */
export function extractVideoId(url) {
  if (!url) {
    return null;
  }

  // 1. Try matching typical watch or embed links
  const watchEmbedRegex =
    /(?:youtube\.com.*(?:\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  let match = url.match(watchEmbedRegex);
  if (match && match[1]) {
    return match[1];
  }

  // 2. If not matched, you can attempt to parse out other forms or fallback
  // For example, if the link is something else, return null
  return null;
}

// Offline Cache Manager for PSV Notes & App State

const CACHE_KEY = 'psv_notes_offline_cached_v1';
const TIMESTAMP_KEY = 'psv_notes_offline_cached_time';

export function isNotesCachedOffline(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(CACHE_KEY) === 'true';
}

export function getOfflineCachedTime(): string | null {
  if (typeof window === 'undefined') return null;
  const timeStr = localStorage.getItem(TIMESTAMP_KEY);
  if (!timeStr) return null;
  try {
    const date = new Date(parseInt(timeStr, 10));
    return date.toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (e) {
    return null;
  }
}

export function markNotesCachedOffline(cached: boolean = true) {
  if (typeof window === 'undefined') return;
  if (cached) {
    localStorage.setItem(CACHE_KEY, 'true');
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  } else {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(TIMESTAMP_KEY);
  }
}

/**
 * Format a remaining time until SLA deadline as human-readable string.
 */
export function formatSlaCountdown(deadline: string | null | undefined): string {
  if (!deadline) return '—';

  const now = Date.now();
  const target = new Date(deadline).getTime();
  const diffMs = target - now;

  if (diffMs <= 0) return 'Überfällig';

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}T ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

/**
 * Check if SLA is breached.
 */
export function isSlaBreached(deadline: string | null | undefined): boolean {
  if (!deadline) return false;
  return Date.now() > new Date(deadline).getTime();
}

/**
 * Get SLA urgency level for UI coloring.
 */
export function getSlaUrgency(deadline: string | null | undefined): 'ok' | 'warning' | 'critical' | 'breached' {
  if (!deadline) return 'ok';

  const diffMs = new Date(deadline).getTime() - Date.now();
  if (diffMs <= 0) return 'breached';
  if (diffMs <= 30 * 60_000) return 'critical'; // < 30 min
  if (diffMs <= 2 * 60 * 60_000) return 'warning'; // < 2 hours
  return 'ok';
}

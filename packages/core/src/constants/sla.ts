import { TicketPriority } from './enums';

/**
 * SLA deadlines in minutes for acknowledgment and resolution per priority.
 * emergency: ack 30 min / resolve 4 h
 * high:      ack 2 h   / resolve 24 h
 * medium:    ack 8 h   / resolve 3 days
 * low:       ack 24 h  / resolve 7 days
 */
export const SLA_CONFIG: Record<TicketPriority, { ackMinutes: number; resolveMinutes: number }> = {
  URGENT: { ackMinutes: 30, resolveMinutes: 240 },
  HIGH: { ackMinutes: 120, resolveMinutes: 1440 },
  MEDIUM: { ackMinutes: 480, resolveMinutes: 4320 },
  LOW: { ackMinutes: 1440, resolveMinutes: 10080 },
};

/** Calculate SLA deadlines from a given start date */
export function calculateSlaDeadlines(
  priority: TicketPriority,
  from: Date = new Date(),
): { ackDeadline: Date; resolveDeadline: Date } {
  const config = SLA_CONFIG[priority];
  return {
    ackDeadline: new Date(from.getTime() + config.ackMinutes * 60_000),
    resolveDeadline: new Date(from.getTime() + config.resolveMinutes * 60_000),
  };
}

/** Check if an SLA deadline has been breached */
export function isSlaBreached(deadline: Date | null | undefined): boolean {
  if (!deadline) return false;
  return new Date() > new Date(deadline);
}

'use client';

import { Badge } from './Badge';

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'on_hold'
  | 'closed'
  | 'resolved'
  | 'pending';

interface TicketStatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md' | 'lg';
}

const TICKET_STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; variant: any; dot?: boolean }
> = {
  open: {
    label: 'Offen',
    variant: 'info',
    dot: true,
  },
  in_progress: {
    label: 'In Bearbeitung',
    variant: 'pending',
    dot: true,
  },
  on_hold: {
    label: 'Ausstehend',
    variant: 'warning',
    dot: true,
  },
  closed: {
    label: 'Geschlossen',
    variant: 'neutral',
    dot: true,
  },
  resolved: {
    label: 'Gelöst',
    variant: 'success',
    dot: true,
  },
  pending: {
    label: 'Ausstehend',
    variant: 'pending',
    dot: true,
  },
};

export function TicketStatusBadge({
  status,
  size = 'md',
}: TicketStatusBadgeProps) {
  const config = TICKET_STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} size={size} dot={config.dot}>
      {config.label}
    </Badge>
  );
}
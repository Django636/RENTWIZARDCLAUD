'use client';

import { Badge } from './Badge';

export type PaymentStatus =
  | 'paid'
  | 'pending'
  | 'overdue'
  | 'failed'
  | 'partial'
  | 'cancelled';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  size?: 'sm' | 'md' | 'lg';
}

const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatus,
  { label: string; variant: any; dot?: boolean }
> = {
  paid: {
    label: 'Bezahlt',
    variant: 'success',
    dot: true,
  },
  pending: {
    label: 'Ausstehend',
    variant: 'pending',
    dot: true,
  },
  overdue: {
    label: 'Überfällig',
    variant: 'error',
    dot: true,
  },
  failed: {
    label: 'Fehlgeschlagen',
    variant: 'error',
    dot: true,
  },
  partial: {
    label: 'Teilweise bezahlt',
    variant: 'warning',
    dot: true,
  },
  cancelled: {
    label: 'Storniert',
    variant: 'neutral',
    dot: true,
  },
};

export function PaymentStatusBadge({
  status,
  size = 'md',
}: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} size={size} dot={config.dot}>
      {config.label}
    </Badge>
  );
}
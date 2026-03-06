'use client';

import { Badge } from './Badge';

export type ContractStatus =
  | 'active'
  | 'ending_soon'
  | 'ended'
  | 'terminated'
  | 'pending'
  | 'draft';

interface ContractStatusBadgeProps {
  status: ContractStatus;
  size?: 'sm' | 'md' | 'lg';
}

const CONTRACT_STATUS_CONFIG: Record<
  ContractStatus,
  { label: string; variant: any; dot?: boolean }
> = {
  active: {
    label: 'Aktiv',
    variant: 'success',
    dot: true,
  },
  ending_soon: {
    label: 'Endet bald',
    variant: 'warning',
    dot: true,
  },
  ended: {
    label: 'Beendet',
    variant: 'neutral',
    dot: true,
  },
  terminated: {
    label: 'Gekündigt',
    variant: 'error',
    dot: true,
  },
  pending: {
    label: 'Ausstehend',
    variant: 'pending',
    dot: true,
  },
  draft: {
    label: 'Entwurf',
    variant: 'info',
    dot: true,
  },
};

export function ContractStatusBadge({
  status,
  size = 'md',
}: ContractStatusBadgeProps) {
  const config = CONTRACT_STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} size={size} dot={config.dot}>
      {config.label}
    </Badge>
  );
}
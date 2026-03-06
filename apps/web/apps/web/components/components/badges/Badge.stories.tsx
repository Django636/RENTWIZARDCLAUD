import { Badge } from './Badge';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { ContractStatusBadge } from './ContractStatusBadge';
import { TicketStatusBadge } from './TicketStatusBadge';

export default {
  title: 'UI/Badges',
};

export const Variants = () => (
  <div className="flex gap-3 flex-wrap">
    <Badge variant="success">Success</Badge>
    <Badge variant="error">Error</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="pending">Pending</Badge>
    <Badge variant="info">Info</Badge>
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="active">Active</Badge>
  </div>
);

export const WithDot = () => (
  <div className="flex gap-3 flex-wrap">
    <Badge variant="success" dot>
      Success
    </Badge>
    <Badge variant="error" dot>
      Error
    </Badge>
    <Badge variant="warning" dot>
      Warning
    </Badge>
    <Badge variant="active" dot>
      Active
    </Badge>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-3 flex-wrap items-center">
    <Badge size="sm">Small</Badge>
    <Badge size="md">Medium</Badge>
    <Badge size="lg">Large</Badge>
  </div>
);

export const PaymentStatus = () => (
  <div className="flex gap-3 flex-wrap">
    <PaymentStatusBadge status="paid" />
    <PaymentStatusBadge status="pending" />
    <PaymentStatusBadge status="overdue" />
    <PaymentStatusBadge status="failed" />
    <PaymentStatusBadge status="partial" />
    <PaymentStatusBadge status="cancelled" />
  </div>
);

export const ContractStatus = () => (
  <div className="flex gap-3 flex-wrap">
    <ContractStatusBadge status="active" />
    <ContractStatusBadge status="ending_soon" />
    <ContractStatusBadge status="ended" />
    <ContractStatusBadge status="terminated" />
    <ContractStatusBadge status="pending" />
    <ContractStatusBadge status="draft" />
  </div>
);

export const TicketStatus = () => (
  <div className="flex gap-3 flex-wrap">
    <TicketStatusBadge status="open" />
    <TicketStatusBadge status="in_progress" />
    <TicketStatusBadge status="on_hold" />
    <TicketStatusBadge status="closed" />
    <TicketStatusBadge status="resolved" />
    <TicketStatusBadge status="pending" />
  </div>
);
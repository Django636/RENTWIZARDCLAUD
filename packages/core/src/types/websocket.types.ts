export const WS_EVENTS = {
  // Client -> Server
  SUBSCRIBE_TICKET: 'ticket.subscribe',
  UNSUBSCRIBE_TICKET: 'ticket.unsubscribe',
  SUBSCRIBE_PROPERTY: 'property.subscribe',

  // Server -> Client
  TICKET_CREATED: 'ticket.created',
  TICKET_STATUS_CHANGED: 'ticket.status.changed',
  TICKET_COMMENT_ADDED: 'ticket.comment.added',
  TICKET_ASSIGNED: 'ticket.assigned',
  TICKET_ESCALATED: 'ticket.escalated',
  TICKET_PHOTO_ADDED: 'ticket.photo.added',
} as const;

export type WsEventName = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];

// ── Server -> Client Payloads ──

export interface WsTicketCreatedPayload {
  ticketId: string;
  unitId: string;
  propertyId: string;
  title: string;
  priority: string;
  category: string;
  reporterName: string;
  createdAt: string;
}

export interface WsTicketStatusChangedPayload {
  ticketId: string;
  oldStatus: string;
  newStatus: string;
  changedById: string;
  updatedAt: string;
}

export interface WsTicketCommentPayload {
  ticketId: string;
  commentId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface WsTicketAssignedPayload {
  ticketId: string;
  contractorId: string;
  contractorName: string;
  costEstimate: number | null;
  assignedAt: string;
}

export interface WsTicketEscalatedPayload {
  ticketId: string;
  reason: 'SLA_ACK_BREACH' | 'SLA_RESOLVE_BREACH' | 'MANUAL';
  priority: string;
  escalatedAt: string;
}

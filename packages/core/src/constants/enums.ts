// ── User Roles ──
export const UserRole = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  TENANT: 'TENANT',
  CONTRACTOR: 'CONTRACTOR',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// ── Ticket Status ──
export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  WAITING_FOR_PARTS: 'WAITING_FOR_PARTS',
  ESCALATED: 'ESCALATED',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

// Valid status transitions
export const TICKET_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  OPEN: ['IN_PROGRESS', 'ESCALATED', 'CLOSED'],
  IN_PROGRESS: ['WAITING_FOR_PARTS', 'RESOLVED', 'ESCALATED'],
  WAITING_FOR_PARTS: ['IN_PROGRESS', 'ESCALATED'],
  ESCALATED: ['IN_PROGRESS', 'CLOSED'],
  RESOLVED: ['CLOSED', 'IN_PROGRESS'], // reopen
  CLOSED: [], // terminal
};

// ── Ticket Priority ──
export const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

// ── Ticket Category ──
export const TicketCategory = {
  PLUMBING: 'PLUMBING',
  ELECTRICAL: 'ELECTRICAL',
  HVAC: 'HVAC',
  STRUCTURAL: 'STRUCTURAL',
  APPLIANCE: 'APPLIANCE',
  PEST_CONTROL: 'PEST_CONTROL',
  CLEANING: 'CLEANING',
  SECURITY: 'SECURITY',
  OTHER: 'OTHER',
} as const;
export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory];

// ── Document Type ──
export const DocumentType = {
  LEASE: 'LEASE',
  INVOICE: 'INVOICE',
  INSPECTION_REPORT: 'INSPECTION_REPORT',
  INSURANCE: 'INSURANCE',
  PERMIT: 'PERMIT',
  PHOTO: 'PHOTO',
  RECEIPT: 'RECEIPT',
  OTHER: 'OTHER',
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

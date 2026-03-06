import { z } from 'zod';

export const createTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  category: z.enum([
    'PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL',
    'APPLIANCE', 'PEST_CONTROL', 'CLEANING', 'SECURITY', 'OTHER',
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  unitId: z.string().cuid(),
});

export const updateTicketStatusSchema = z.object({
  status: z.enum([
    'OPEN', 'IN_PROGRESS', 'WAITING_FOR_PARTS',
    'ESCALATED', 'RESOLVED', 'CLOSED',
  ]),
});

export const createTicketCommentSchema = z.object({
  content: z.string().min(1).max(5000),
});

export const assignTicketSchema = z.object({
  contractorId: z.string().cuid(),
  costEstimate: z.number().positive().optional(),
});

export const ticketFilterSchema = z.object({
  status: z.enum([
    'OPEN', 'IN_PROGRESS', 'WAITING_FOR_PARTS',
    'ESCALATED', 'RESOLVED', 'CLOSED',
  ]).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  category: z.enum([
    'PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL',
    'APPLIANCE', 'PEST_CONTROL', 'CLEANING', 'SECURITY', 'OTHER',
  ]).optional(),
  unitId: z.string().cuid().optional(),
  propertyId: z.string().cuid().optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;
export type CreateTicketCommentInput = z.infer<typeof createTicketCommentSchema>;
export type AssignTicketInput = z.infer<typeof assignTicketSchema>;
export type TicketFilterInput = z.infer<typeof ticketFilterSchema>;

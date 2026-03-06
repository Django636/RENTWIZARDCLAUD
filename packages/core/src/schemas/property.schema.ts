import { z } from 'zod';

export const createPropertySchema = z.object({
  name: z.string().min(1).max(200),
  street: z.string().min(1).max(300),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  zipCode: z.string().min(1).max(20),
  country: z.string().length(2).default('DE'),
});

export const updatePropertySchema = createPropertySchema.partial();

export const createUnitSchema = z.object({
  unitNumber: z.string().min(1).max(20),
  floor: z.number().int().optional(),
  rooms: z.number().int().positive().optional(),
  area: z.number().positive().optional(),
  rentAmount: z.number().positive().optional(),
});

export const updateUnitSchema = createUnitSchema.partial();

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type CreateUnitInput = z.infer<typeof createUnitSchema>;
export type UpdateUnitInput = z.infer<typeof updateUnitSchema>;

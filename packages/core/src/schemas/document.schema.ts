import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
] as const;

export const requestUploadSchema = z.object({
  propertyId: z.string().cuid(),
  name: z.string().min(1).max(300),
  type: z.enum([
    'LEASE', 'INVOICE', 'INSPECTION_REPORT',
    'INSURANCE', 'PERMIT', 'PHOTO', 'RECEIPT', 'OTHER',
  ]),
  mimeType: z.string().min(1),
  size: z.number().int().positive().max(MAX_FILE_SIZE, 'Datei darf maximal 50 MB groß sein'),
});

export const documentFilterSchema = z.object({
  propertyId: z.string().cuid().optional(),
  type: z.enum([
    'LEASE', 'INVOICE', 'INSPECTION_REPORT',
    'INSURANCE', 'PERMIT', 'PHOTO', 'RECEIPT', 'OTHER',
  ]).optional(),
});

export type RequestUploadInput = z.infer<typeof requestUploadSchema>;
export type DocumentFilterInput = z.infer<typeof documentFilterSchema>;
export { ALLOWED_MIME_TYPES, MAX_FILE_SIZE };

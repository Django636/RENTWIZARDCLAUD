import { z } from 'zod';

const envSchema = z.object({
  // Database – required
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL URL'),

  // JWT – required
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_REFRESH_SECRET: z.string().min(16).optional(),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  // Redis – optional in dev
  REDIS_URL: z.string().optional(),

  // S3 – optional in dev (features degrade gracefully)
  S3_ENDPOINT: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET: z.string().default('rentwizard'),
  S3_REGION: z.string().default('eu-central-1'),

  // App
  API_PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  ✗ ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');

    console.error('\n╔══════════════════════════════════════════╗');
    console.error('║  ENV VALIDATION FAILED – cannot start    ║');
    console.error('╚══════════════════════════════════════════╝\n');
    console.error(formatted);
    console.error('\nCheck your .env file or environment variables.\n');
    process.exit(1);
  }

  return result.data;
}

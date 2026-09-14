import * as z from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
  EXPO_PUBLIC_COGNITO_DOMAIN: z.url(),
  EXPO_PUBLIC_COGNITO_CLIENT_ID: z.string().min(1),
});

export const env = envSchema.parse(process.env);

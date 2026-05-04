import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '../../prisma-client.js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  trustedOrigins: (
    process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:3001'
  ).split(',').map((o) => o.trim()),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:8000',
});

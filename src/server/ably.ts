import * as Ably from 'ably/promises'
import { Session } from 'next-auth';
import { env } from '~/env.mjs';

const globalForPrisma = globalThis as unknown as {
  ably: Ably.Rest | undefined;
};

export const ably =
  globalForPrisma.ably ??
  new Ably.Rest(env.ABLY_API_KEY);

if (env.NODE_ENV !== "production") globalForPrisma.ably = ably;
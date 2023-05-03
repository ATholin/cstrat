import type { NextApiRequest, GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { RelyingParty } from 'openid';

import Steam, { PROVIDER_ID } from 'next-auth-steam';

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { randomUUID } from "crypto";
import type { IncomingMessage } from "http";
import type { SteamProviderOptions } from "next-auth-steam/lib/steam";
import type { AdapterAccount } from "next-auth/adapters";
import { TokenSet } from "openid-client";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const prismaAdapter = PrismaAdapter(prisma)

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const createAuthOptions = (req: IncomingMessage): NextAuthOptions => ({
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  // adapter: PrismaAdapter(prisma),
  adapter: {
    ...prismaAdapter,
    linkAccount: (account: AdapterAccount) => {
      console.table(account)
      delete account['steamId']
      return prismaAdapter.linkAccount(account)
    }
  },
  providers: [
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    SteamProvider(req as NextApiRequest, {
      clientSecret: process.env.STEAM_SECRET,
      callbackUrl: 'http://localhost:3000/api/auth/callback'
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
});

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, createAuthOptions(ctx.req));
};


function SteamProvider(req: NextApiRequest, options: SteamProviderOptions): ReturnType<typeof Steam> {
  const callbackUrl = new URL(options.callbackUrl)

  // https://example.com
  // https://example.com/api/auth/callback/steam
  const realm = callbackUrl.origin
  const returnTo = `${callbackUrl.href}/${PROVIDER_ID}`

  return {
    ...Steam(req, options),
    token: {
      async request() {
        // May throw an error, dunno should I handle it or no
        if (!req.url) throw new Error('Unauthenticated')
        // prettier-ignore
        const claimedIdentifier = await verifyAssertion(req.url, realm, returnTo)

        if (!claimedIdentifier) {
          throw new Error('Unauthenticated')
        }

        const matches = claimedIdentifier.match(
          /^https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)$/
        )

        if (!matches) {
          throw new Error('Unauthenticated')
        }

        return {
          tokens: new TokenSet({
            id_token: randomUUID(),
            access_token: randomUUID(),
            steamId: matches[1]
          })
        }
      }
    },
  }
}

/**
 * Verifies an assertion and returns the claimed identifier if authenticated, otherwise null.
 */
async function verifyAssertion(
  url: string,
  realm: string,
  returnTo: string
): Promise<string | null> {
  const party = new RelyingParty(returnTo, realm, true, false, [])

  const result: {
    authenticated: boolean
    claimedIdentifier?: string | undefined
  } = await new Promise((resolve, reject) => {
    party.verifyAssertion(url, (error, result) => {
      if (error) {
        reject(error)
      } else if (result) {
        resolve(result)
      }
    })
  })

  if (!result.authenticated || !result.claimedIdentifier) {
    return null
  }

  return result.claimedIdentifier
}
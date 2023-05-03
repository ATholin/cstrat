import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { createAuthOptions } from "~/server/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, createAuthOptions(req))
}
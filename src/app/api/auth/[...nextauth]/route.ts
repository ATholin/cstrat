import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { createAuthOptions } from "~/server/auth";

function handler(req: NextApiRequest, res: NextApiResponse) {
    return NextAuth(req, res, createAuthOptions(req))
}

export { handler as GET, handler as POST };
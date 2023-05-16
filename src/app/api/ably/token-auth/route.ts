import * as Ably from 'ably/promises'
import { getUserLobby } from '~/api/lobby'
import { env } from '~/env.mjs'
import getServerSession from '~/utils/getServerSession'

export async function GET() {
    const session = await getServerSession()
    const lobby = await getUserLobby()

    if (!session?.user) return new Response("Unauthorized", {
        status: 401
    })

    // const clientId = req.body["clientId"] || process.env.DEFAULT_CLIENT_ID || "NO_CLIENT_ID";
    const client = new Ably.Rest(env.ABLY_API_KEY);
    const tokenRequestData = await client.auth.createTokenRequest({
        clientId: session?.user.id,
    });

    return new Response(JSON.stringify(tokenRequestData), {
        headers: {
            'content-type': 'application/json'
        }
    })

    // return res.status(200).json(tokenRequestData)
}
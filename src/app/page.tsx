import Head from "next/head";
import { prisma } from "~/server/db";
import { Map } from "@prisma/client"
import StrategyCard from "~/components/strategy-card";
import { GetRandomStrategy } from "~/api/getRandomStrategy";
import CreateLobby from "~/components/create-lobby";
import getServerSession from "~/utils/getServerSession";

export default async function Home() {
    const session = await getServerSession()
    const initialStrategy = await GetRandomStrategy();
    return (
        <>
            <Head>
                <title>cstrat</title>
                <meta name="description" content="Counter-Strike Stratroulette" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mt-8 container max-w-5xl">
                <StrategyCard initialStrategy={initialStrategy} getRandomStrategy={GetRandomStrategy} />
                {session && <CreateLobby />}
            </main>
        </>
    );
}

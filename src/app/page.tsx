import Head from "next/head";
import { prisma } from "~/server/db";
import { Map } from "@prisma/client"
import StrategyCard from "~/components/strategy-card";
import { GetRandomStrategy } from "~/api/getRandomStrategy";

export default async function Home() {
    const initialStrategy = await GetRandomStrategy();
    return (
        <>
            <Head>
                <title>cstrat</title>
                <meta name="description" content="Counter-Strike Stratroulette" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mt-8 container max-w-5xl">
                <StrategyCard initialStrategy={initialStrategy} getRandomStrategy={GetRandomStrategy}/>
            </main>
        </>
    );
}

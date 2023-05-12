import Head from "next/head";
import { prisma } from "~/server/db";
import { Map } from "@prisma/client"
import StrategyCard from "~/components/strategy-card";

async function GetRandomStrategy(map: Map) {
    "use server"
    const productsCount = (await prisma.strategy.findMany()).length
    const skip = Math.floor(Math.random() * productsCount);
    const strategy = await prisma.strategy.findFirst({
        where: {maps: {hasSome: map}},
        skip: skip,
        orderBy: {
            id: 'desc'
        },
    });
    return strategy;
    // ta hand om tomt svar
}

export default async function Home() {
    return (
        <>
            <Head>
                <title>cstrat</title>
                <meta name="description" content="Counter-Strike Stratroulette" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="mt-8 container max-w-lg">
                <StrategyCard getRandomStrategy={GetRandomStrategy}/>
            </main>
        </>
    );
}

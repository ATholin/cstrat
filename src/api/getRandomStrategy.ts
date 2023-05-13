import { Map, Side } from "@prisma/client";
import { prisma } from "~/server/db";

export type GetRandomStrategyOptions = {
    map?: Map,
    side?: Side
}

export async function GetRandomStrategy(options: GetRandomStrategyOptions) {
    "use server"

    const productsCount = (await prisma.strategy.count({
        where: {
            maps: options.map ? { hasSome: options.map }: undefined,
            side: options.side
        }
    }))
    const skip = Math.floor(Math.random() * productsCount);
    return await prisma.strategy.findFirst({
        where: {
            maps: options.map ? { hasSome: options.map }: undefined,
            side: options.side
        },
        skip: skip,
        orderBy: {
            id: 'desc'
        },
    });
}

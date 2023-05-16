import { Map, Side } from "@prisma/client";
import { prisma } from "~/server/db";

export type GetRandomStrategyOptions = {
    map?: Map,
    side?: Side,
    ignoreIds?: string[]
}

export async function GetRandomStrategy(options?: GetRandomStrategyOptions) {
    "use server"

    const productsCount = await prisma.strategy.count({
        where: {
            maps: options?.map ? { hasSome: options?.map } : { isEmpty: true },
            side: options?.side ?? null,
            id: { notIn: options?.ignoreIds }
        }
    })
    const skip = Math.floor(Math.random() * productsCount);
    return await prisma.strategy.findFirst({
        where: {
            maps: options?.map ? { hasSome: options.map } : undefined,
            side: options?.side,
            id: { notIn: options?.ignoreIds }
        },
        skip: skip,
        orderBy: {
            id: 'desc'
        },
    });
}

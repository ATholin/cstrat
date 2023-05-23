import { Map, Side } from "@prisma/client";
import { prisma } from "~/server/db";

export type GetRandomStrategyOptions = {
    map: Map | null,
    side: Side | null,
    ignoreIds?: string[]
}

export async function GetRandomStrategy(options?: GetRandomStrategyOptions) {
    "use server"

    console.log(options)

    const mapFilter = options?.map ? {
        OR: [
            { maps: { hasSome: options?.map } },
            { maps: { isEmpty: true } }
        ]
    } : { maps: { isEmpty: true } }

    const sideFilter = options?.side ? {
        OR: [
            { side: options?.side },
            { side: null }
        ]
    } : { side: null }

    const productsCount = await prisma.strategy.count({
        where: {
            AND: [
                { ...mapFilter },
                { ...sideFilter }
            ],
            id: { notIn: options?.ignoreIds }
        }
    })
    const skip = Math.floor(Math.random() * productsCount);

    return await prisma.strategy.findFirst({
        where: {
            AND: [
                { ...mapFilter },
                { ...sideFilter }
            ],
            id: { notIn: options?.ignoreIds }
        },
        skip: skip,
        orderBy: {
            id: 'desc'
        },
    });
}

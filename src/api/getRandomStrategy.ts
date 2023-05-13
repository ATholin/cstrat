import { Map } from "@prisma/client";
import { prisma } from "~/server/db";

export async function GetRandomStrategy(map: Map) {
    "use server"
    const productsCount = (await prisma.strategy.count({
        where: { maps: { hasSome: map } }
    }))
    const skip = Math.floor(Math.random() * productsCount);
    return await prisma.strategy.findFirst({
        where: { maps: { hasSome: map } },
        skip: skip,
        orderBy: {
            id: 'desc'
        },
    });
}

"use server"

import { createAuthOptions } from "~/server/auth";
import { prisma } from "~/server/db";

import { customAlphabet } from 'nanoid'
import { redirect } from "next/navigation";
import getServerSession from "~/utils/getServerSession";
import { revalidatePath } from "next/cache";
import { GetRandomStrategy } from "./getRandomStrategy";
import { ably } from "~/server/ably";
const nanoid = customAlphabet('1234567890abcdef', 5)

export async function getUserLobby() {
    const session = await getServerSession()
    return await prisma.lobby.findFirst({
        where: {
            users: {
                some: {
                    id: session?.user.id
                }
            }
        }
    })
}

export async function leaveLobby() {
    const session = await getServerSession()
    const lobby = await getUserLobby()

    if (!session?.user) {
        return redirect("/")
    }

    if (lobby?.ownerId === session?.user.id) {
        await prisma.lobby.delete({
            where: { id: lobby?.id }
        })
    } else {
        await prisma.user.update({
            where: { id: session?.user.id },
            data: {
                lobbyId: null
            }
        })
    }

    revalidatePath("/")
    return redirect("/")
}

export type leaveLobbyAction = typeof leaveLobby

export async function createLobby() {
    const session = await getServerSession()
    if (session?.user) {
        if (session.user.lobbyId) {
            const existingLobby = await getUserLobby()
            return redirect(`/lobby/${existingLobby?.shareId}`)
        }

        const lobby = await prisma.lobby.create({
            data: {
                shareId: nanoid(),
                ownerId: session?.user.id
            }
        })

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                lobbyId: lobby.id,
            }
        })

        revalidatePath("/")
        return redirect(`/lobby/${lobby.shareId}`)
    }

}

export type createLobbyAction = typeof createLobby

export async function newStrategy() {
    const userLobby = await getUserLobby()
    const session = await getServerSession()

    if (session?.user.id !== userLobby?.ownerId) return null

    if (userLobby) {
        const newStrat = await GetRandomStrategy({
            map: userLobby?.map ?? undefined,
            side: userLobby?.side ?? undefined,
            ignoreIds: userLobby.strategyId ? [userLobby.strategyId] : undefined
        })

        const res = await prisma.lobby.update({
            where: { id: userLobby.id },
            data: {
                strategyId: newStrat?.id
            },
            include: {
                strategy: true
            }
        })

        const channel = ably.channels.get(`lobby-${res.id}`)
        await channel.publish('new-strategy', res.strategy)

        return res.strategy
    }

    return null
}

export async function getStrategy() {
    const userLobby = await getUserLobby()
    if (userLobby) {
        const lobbyStrategy = await prisma.lobby.findFirst({
            where: {
                id: userLobby.id
            },
            select: {
                strategy: true
            }
        })
        return lobbyStrategy?.strategy
    }

    return null
}
"use server"

import { createAuthOptions } from "~/server/auth";
import { prisma } from "~/server/db";

import { customAlphabet } from 'nanoid'
import { redirect } from "next/navigation";
import getServerSession from "~/utils/getServerSession";
import { revalidatePath } from "next/cache";
import { GetRandomStrategy } from "./getRandomStrategy";
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
            return redirect("lobby")
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

        revalidatePath("/lobby")
        return redirect("/lobby")
    }

}

export type createLobbyAction = typeof createLobby

export async function newStrategy() {
    const userLobby = await getUserLobby()
    if (userLobby) {
        const newStrat = await GetRandomStrategy({
            map: userLobby?.map ?? undefined,
            side: userLobby?.side ?? undefined
        })

        await prisma.lobby.update({
            where: { id: userLobby.id },
            data: {
                strategyId: newStrat?.id
            }
        })
    }

    revalidatePath("/lobby")
}
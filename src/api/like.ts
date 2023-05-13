"use server"
import { UserRole } from "@prisma/client"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"
import { createAuthOptions } from "~/server/auth"
import { prisma } from "~/server/db"

export default async function like(id: string) {
    const session = await getServerSession(createAuthOptions())
    console.log(session?.user)
    return session?.user.role === UserRole.ADMIN ? await prisma.strategy.update({
        where: {
            id: id
        },
        data: {
            approved: true
        }
    }) : await prisma.strategy.update({
        where: {
            id: id
        },
        data: {
            likes: { increment: 1 }
        }
    })
}
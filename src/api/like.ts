"use server"
import { UserRole } from "@prisma/client"
import { prisma } from "~/server/db"
import getServerSession from "~/utils/getServerSession"

export default async function like(id: string) {
    const session = await getServerSession()
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
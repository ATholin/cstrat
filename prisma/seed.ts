import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const example = await prisma.example.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date()
        },
    })
    console.log({ example })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
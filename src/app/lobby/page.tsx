import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import LobbyCopyButton from "~/components/lobby-copy-button";
import { Button } from "~/components/ui/button";
import { TypographyH1, TypographyH3, TypographyHeading, TypographyMuted } from "~/components/ui/typography";
import { prisma } from "~/server/db";

export default async function Lobby() {
    const session = await getSession()
    const lobby = await prisma.lobby.findFirst({
        where: {
            users: {
                some: {
                    id: session?.user.id
                }
            }
        },
        include: {
            owner: true,
            strategy: true
        }
    })

    if (!lobby) return redirect('/lobby/join')

    return (
        <div className="container max-w-5xl flex-1">
            <div className="flex justify-between items-center">
                <div>
                    <TypographyHeading>Lobby</TypographyHeading>
                </div>
                <div className="flex justify-end shadow space-x-2">
                    {lobby && <LobbyCopyButton lobby={lobby} />}
                    <Button variant='outline'>
                        Leave lobby
                    </Button>
                </div>
            </div>
            <div className="mt-10 flex-1">
                <TypographyMuted>Current Strategy</TypographyMuted>
                <div className="mt-2">
                    <TypographyH1>{lobby?.strategy?.title}</TypographyH1>
                    <TypographyH3 className="mt-2">{lobby?.strategy?.description}</TypographyH3>
                </div>
            </div>
        </div>
    )
}
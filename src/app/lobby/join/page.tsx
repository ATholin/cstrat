import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TypographyHeading, TypographyMuted } from "~/components/ui/typography";
import { createAuthOptions } from "~/server/auth";
import { prisma } from "~/server/db";

async function joinLobby(formData: FormData) {
    "use server"

    const shareId = formData.get('shareId')?.toString()
    const lobby = await prisma.lobby.findFirst({
        where: {
            shareId: shareId
        }
    })

    if (lobby) {
        const session = await getServerSession(createAuthOptions())
        await prisma.user.update({
            where: { id: session?.user.id },
            data: {
                lobbyId: lobby.id
            }
        })

        return redirect("lobby")
    }

    return false
}

export default async function JoinLobby() {
    return (
        <div className="container max-w-5xl flex-1">
            <div>
                <TypographyHeading>Join Lobby</TypographyHeading>
            </div>
            {/* @ts-ignore Server Actions */}
            <form action={joinLobby}>
                <div className="mt-2">
                    <Label>Lobby code</Label>
                    <Input className="mt-2" name="shareId" />
                </div>

                <Button>Join lobby</Button>
            </form>
        </div>
    )
}
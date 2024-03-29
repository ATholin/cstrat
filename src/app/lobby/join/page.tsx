import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { TypographyHeading, TypographyMuted } from "~/components/ui/typography";
import { createAuthOptions } from "~/server/auth";
import { prisma } from "~/server/db";
import getServerSession from "~/utils/getServerSession";

async function joinLobby(formData: FormData) {
    "use server"

    const session = await getServerSession()
    if (!session?.user) {
        return redirect("/")
    }

    const shareId = formData.get('shareId')?.toString()
    const lobby = await prisma.lobby.findFirst({
        where: {
            shareId: shareId
        }
    })

    if (lobby) {
        await prisma.user.update({
            where: { id: session?.user.id },
            data: {
                lobbyId: lobby.id
            }
        })

        revalidatePath(`/lobby/${lobby.shareId}`)
        return redirect(`/lobby/${lobby.shareId}`)
    }

    return false
}

export default async function JoinLobby() {

    const session = await getServerSession()
    if (!session?.user) {
        return redirect("/")
    }

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
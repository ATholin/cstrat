import { PageProps } from ".next/types/app/page";
import { PROVIDER_ID as STEAM_PROVIDER_ID } from "next-auth-steam";
import { redirect } from "next/navigation";
import LeaveLobby from "~/components/leave-lobby";
import LobbyCopyButton from "~/components/lobby-copy-button";
import { TypographyHeading } from "~/components/ui/typography";
import { prisma } from "~/server/db";
import getServerSession from "~/utils/getServerSession";
import LobbyUserList from "./lobby-user-list";
import LobbyStrategyCard from "./lobby-strategy-card";
import SubmitButton from "~/components/submit-button";
import { newStrategy } from "~/api/lobby";

export default async function Lobby({ params }: PageProps) {
    const session = await getServerSession()
    const lobby = await prisma.lobby.findFirst({
        where: {
            shareId: params.shareId,
            users: {
                some: {
                    id: session?.user.id
                }
            }
        },
        include: {
            owner: true,
            strategy: true,
            users: {
                include: {
                    accounts: {
                        where: {
                            provider: STEAM_PROVIDER_ID
                        }
                    }
                }
            }
        }
    })

    if (!lobby) return redirect('/lobby/join')

    return (
        <div className="container max-w-5xl flex-1">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <TypographyHeading>Lobby</TypographyHeading>
                    <div className="flex p-2 -space-x-1 overflow-hidden">
                        <LobbyUserList lobbyId={lobby.id} />
                    </div>

                </div>
                <div className="flex justify-end space-x-2">
                    {lobby && <LobbyCopyButton lobby={lobby} />}
                    {/* @ts-ignore Server Actions */}
                    <LeaveLobby />
                    {lobby.ownerId === session?.user.id && (
                        <form action={newStrategy}>
                            <SubmitButton>New strategy</SubmitButton>
                        </form>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <LobbyStrategyCard lobbyId={lobby.id} initialStrategy={lobby.strategy} />
            </div>
            {/* <StrategyCard showNewStrategy={lobby.ownerId === session?.user.id} showSelects={false} getRandomStrategy={newStrategy} initialStrategy={lobby.strategy} /> */}
        </div>
    )
}
import { PageProps } from ".next/types/app/page";
import { PROVIDER_ID as STEAM_PROVIDER_ID } from "next-auth-steam";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { leaveLobby, newStrategy } from "~/api/lobby";
import LeaveLobby from "~/components/leave-lobby";
import LobbyCopyButton from "~/components/lobby-copy-button";
import StrategyCard from "~/components/strategy-card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";
import { TypographyHeading } from "~/components/ui/typography";
import { prisma } from "~/server/db";
import getServerSession from "~/utils/getServerSession";

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
                        {lobby.users.map((user) => (
                            <HoverCard openDelay={100} closeDelay={100}>
                                <HoverCardTrigger asChild>
                                    <div className="z-10 inline-block h-6 w-6 rounded-full ring-2 ring-indigo-500 dark:ring-white">
                                        <Avatar className="h-full w-full">
                                            <AvatarImage src={user.image ?? ""} />
                                            <AvatarFallback>{user.name?.substring(0, 1)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="mt-2">
                                    <div className="flex space-x-4">
                                        <Avatar>
                                            <AvatarImage src={user.image ?? ""} />
                                            <AvatarFallback>{user.name?.substring(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{user.name}</h4>
                                            <Link target="_blank" className={"underline-offset-4 hover:underline text-sm"} href={`https://steamcommunity.com/profiles/${user.accounts[0]?.providerAccountId}`}>Steam profile</Link>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        ))}
                    </div>

                </div>
                <div className="flex justify-end space-x-2">
                    {lobby && <LobbyCopyButton lobby={lobby} />}
                    {/* @ts-ignore Server Actions */}
                    <LeaveLobby />
                </div>
            </div>

            <StrategyCard showNewStrategy={lobby.ownerId === session?.user.id} showSelects={false} getRandomStrategy={newStrategy} initialStrategy={lobby.strategy} />
        </div>
    )
}
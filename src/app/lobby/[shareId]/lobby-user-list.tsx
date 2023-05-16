"use client"

import { assertConfiguration, configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";

export default function LobbyUserList({ lobbyId }: { lobbyId: string }) {
    const session = useSession()

    const [presenceData, updateStatus] = usePresence(`lobby-${lobbyId}`, {
        name: session.data?.user.name,
        image: session.data?.user.image
    });

    useEffect(() => {
        updateStatus({
            name: session.data?.user.name,
            image: session.data?.user.image
        })
    }, [session.data?.user])

    return (
        <>
            {presenceData.map((presence) => (
                <HoverCard key={presence.id} openDelay={100} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <div className="z-10 inline-block h-6 w-6 rounded-full ring-2 ring-indigo-500 dark:ring-white">
                            <Avatar className="h-full w-full">
                                <AvatarImage src={presence.data.image ?? ""} />
                                <AvatarFallback>{presence.data.name?.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="mt-2">
                        <div className="flex space-x-4">
                            <Avatar>
                                <AvatarImage src={presence.data.image ?? ""} />
                                <AvatarFallback>{presence.data.name?.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{presence.data.name}</h4>
                                {/* <Link target="_blank" className={"underline-offset-4 hover:underline text-sm"} href={`https://steamcommunity.com/profiles/${presence.accounts[0]?.providerAccountId}`}>Steam profile</Link> */}
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            ))}
        </>
    )
}
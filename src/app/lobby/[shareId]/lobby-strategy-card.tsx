"use client"

import { configureAbly, useChannel, usePresence } from "@ably-labs/react-hooks";
import { Strategy } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";
import { Button } from "~/components/ui/button";
import { TypographyH1, TypographyLead } from "~/components/ui/typography";

type Props = {
    initialStrategy: Strategy | null,
    lobbyId: string
}

export default function LobbyStrategyCard({ lobbyId, initialStrategy }: Props) {
    const [strategy, setStrategy] = useState(initialStrategy)

    useChannel(`lobby-${lobbyId}`, 'new-strategy', (data) => {
        setStrategy(data.data as Strategy)
    })

    return (
        <>
            <TypographyH1 className="text-center"><Balancer>{strategy?.title ?? 'No strategy found'}</Balancer></TypographyH1>
            <TypographyLead className="text-center mt-4"><Balancer>{strategy?.description}</Balancer></TypographyLead>
        </>
    )
}
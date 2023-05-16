"use client"

import { configureAbly } from "@ably-labs/react-hooks";
import { PropsWithChildren } from "react";

export default function AblyProvider({ children }: PropsWithChildren<{}>) {
    configureAbly({ authUrl: '/api/ably/token-auth' })
    return <>{children}</>
}